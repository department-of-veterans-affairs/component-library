const path = require('path');
const commandLineArgs = require('command-line-args');
const chalk = require('chalk');

const { readAllModules, search } = require('./search-files');
const today = require('./today');
const getManifest = require('./get-manifest');
const toCSV = require('./to-csv');
const { repos } = require('./env');

/**
 * Extract form number from appName, entryName, or rootUrl
 * @param {Object} manifest - The manifest object
 * @return {string} - The form number or empty string
 */
function extractFormNumber(manifest) {
  const appName = manifest.appName || '';
  const entryName = manifest.entryName || '';
  const rootUrl = manifest.rootUrl || '';

  // Define patterns for matching VA form numbers
  // Order matters - more specific patterns should come first
  const patterns = [
    /\((\d{2}[A-Z]?-\d{4,5})\)/i,                       // In parentheses: (21P-0537)
    /\b(\d{2}-\d{4,5}[A-Z0-9]*)\b/i,                    // Full format: 22-1995, 40-10007, 21-10210
    /\b(\d{2}[A-Z]-\d{4,5}[A-Z0-9]*)\b/i,               // With letter: 21P-0537, 21P-0847
    /\b(\d{2,3}-\d{2,3}[A-Z]{2,})\b/i,                  // 10-10EZ format
    /\bform[- ]?(\d{1,3}[A-Z]?-\d{1,5}[A-Z0-9]*)\b/i,  // "form-21-4142" or "form 20-0995"
    /\b(\d{4,5}[A-Z]{2,})\b/,                           // Compact: 1010EZ, 527EZ
    /\b(\d{4,5}[Mm]\d?)\b/,                             // Medallion forms: 1330M, 1330M2
    /\bform[- ]?(\d{4,5})\b/i,                          // "form-5655" or "form 10182"
    /\b(\d{2}[a-z])\b/,                                 // Letter suffix: 21a
    /\b(686[A-Z](?:-\d{3})?)\b/i,                       // Special 686 forms
  ];

  // Try to find form number in appName first (most reliable source)
  for (const pattern of patterns) {
    const match = appName.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }

  // If not found in appName, try entryName
  for (const pattern of patterns) {
    const match = entryName.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }

  // Finally, try rootUrl as last resort
  for (const pattern of patterns) {
    const match = rootUrl.match(pattern);
    if (match) {
      return match[1].toUpperCase();
    }
  }

  return '';
}

/**
 * @param allModules - From readAllModules
 * @return {Object[]} Array of objects with formNumber, formTitle, and appUrl
 */
function findFormApps(allModules) {
  const importResults = search(
    allModules,
    // For now, all form apps use RoutedSavableApp whether or not they use SiP
    /import RoutedSavableApp from '.*platform\/forms\/save-in-progress\/RoutedSavableApp/g
  );

  const manifests = importResults
    .map(i => getManifest(i.path))
    .filter(manifest => manifest !== null)
    .filter(manifest => {
      const appName = (manifest.appName || '').toLowerCase();
      return !appName.includes('testing') && !appName.includes('mock') && !appName.includes('demo');
    });

  // Remove duplicates based on appName
  const uniqueManifests = Array.from(
    new Map(manifests.map(m => [m.appName, m])).values()
  );

  // Transform to desired output format (formTitle first, then formNumber, then appUrl)
  const formApps = uniqueManifests
    .map(manifest => ({
      formTitle: manifest.appName || '',
      formNumber: extractFormNumber(manifest),
      appUrl: manifest.rootUrl || ''
    }))
    .sort((a, b) => {
      // Sort by form title alphabetically
      return a.formTitle.localeCompare(b.formTitle);
    });

  return formApps;
}

module.exports = findFormApps;

if (require.main === module) {
  const optionDefinitions = [
    { name: 'csv', type: Boolean },
    {
      name: 'output',
      alias: 'o',
      type: filePath => path.resolve(filePath),
      defaultValue: path.resolve(__dirname, `../form-apps-${today}.csv`),
    },
    {
      name: 'list',
      type: Boolean,
    },
    {
      name: 'table',
      type: Boolean,
    },
  ];
  const options = commandLineArgs(optionDefinitions);

  const allModules = readAllModules(
    `${repos['vets-website']}/src/applications`
  );
  const apps = findFormApps(allModules);
  if (options.csv) {
    // Write to file
    toCSV(apps, options.output);
  } else {
    // Output to the terminal
    console.log(
      `${chalk.cyanBright.bold('Total form apps:')} ${chalk.yellow.bold(
        apps.length
      )}\n`
    );

    if (options.list) {
      apps.forEach((app, index) => {
        const color = index % 2 === 0 ? chalk.bold : chalk.dim;
        console.log(color(`${app.formNumber || 'N/A'} - ${app.formTitle}`));
      });
    } else if (options.table) {
      console.table(apps);
    }
  }
}
