const path = require('path');
const commandLineArgs = require('command-line-args');
const chalk = require('chalk');

const { readAllModules, search } = require('./search-files');
const today = require('./today');
const getManifest = require('./get-manifest');
const toCSV = require('./to-csv');
const { repos } = require('./env');

/**
 * @param allModules - From readAllModules
 * @return {string[]}
 */
function findFormApps(allModules) {
  const importResults = search(
    allModules,
    // For now, all form apps use RoutedSavableApp whether or not they use SiP
    /import RoutedSavableApp from '.*platform\/forms\/save-in-progress\/RoutedSavableApp/g
  );

  const formAppNames = Array.from(
    new Set(importResults.map(i => getManifest(i.path).appName))
  );

  return formAppNames;
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
      apps.forEach((name, index) => {
        const color = index % 2 === 0 ? chalk.bold : chalk.dim;
        console.log(color(name));
      });
    } else if (options.table) {
      console.table(apps);
    }
  }
}
