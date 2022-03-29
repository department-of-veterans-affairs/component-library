const path = require('path');
const _ = require('lodash');
const commandLineArgs = require('command-line-args');
const chalk = require('chalk');

const findFormApps = require('./find-form-apps');
const { readAllModules, search } = require('./search-files');
const today = require('./today');
const getManifest = require('./get-manifest');
const toCSV = require('./to-csv');
const { repos } = require('./env');

/**
 * interface LibraryUses {
 *   appName: string;
 *   // The list of files importing from the forms library, keyed by application name
 *   files: string[];
 * }
 */

/**
 * Find the uses of the forms library outside of full form applications.
 * @param allModules - From readAllModules
 * @param formAppNames {string[]} - The names of all form applications
 * @return {LibraryUses[]}
 */
function findNonFormAppUses(allModules, formAppNames) {
  // Search for imports of the forms library
  const importResults = search(
    allModules,
    /import .* from '.*platform\/forms.*'/g
  );

  // Group the modules by app names
  const byApplication = {};
  importResults.forEach(i => {
    const appName = getManifest(i.path)?.appName || 'Platform(ish)';
    if (byApplication[appName])
      byApplication[appName].files.push(
        path.relative(repos['vets-website'], i.path)
      );
    else
      byApplication[appName] = {
        appName,
        files: [path.relative(repos['vets-website'], i.path)],
      };
  });

  // Return the filtered list
  return Object.values(_.omit(byApplication, formAppNames));
}

if (require.main === module) {
  const optionDefinitions = [
    { name: 'verbose', type: Boolean },
    { name: 'list', type: Boolean },
  ];

  const allModules = readAllModules(
    `${repos['vets-website']}/src/applications`
  );
  const formApps = findFormApps(allModules);
  const nonFormAppUses = findNonFormAppUses(allModules, formApps);

  const options = commandLineArgs(optionDefinitions);

  console.log(
    chalk.cyanBright.bold('Non-form applications using the forms library:'),
    chalk.yellow.bold(nonFormAppUses.length),
    '\n'
  );
  if (options.verbose) {
    console.log(nonFormAppUses);
  } else if (options.list) {
    console.table(
      nonFormAppUses.map(u => ({
        'Application Name': u.appName,
        'Files Using the Forms Library': u.files.length,
      }))
    );
  }
}
