const fs = require('fs');
const jsonexport = require('jsonexport');
const chalk = require('chalk');

/**
 * Accepts an object table keyed with the following shape:
 * {
 *   componentName: {
 *     total: 3, // required
 *     appName: 3 // Number of times it's imported
 *   }
 * }
 *
 * Displays the data in an easily-injestable way.
 *
 * @param data {Object} - The data to display.
 * @param outputPath {string} - The file to write to
 */
async function toCSV(data, outputPath) {
  try {
    const csv = await jsonexport(data);
    fs.writeFileSync(outputPath, csv);
    console.log(`CSV written to ${outputPath}`);
  } catch (e) {
    console.error(chalk.red.bold(`Could not write CSV file at ${outputPath}`));
    console.error(e);
  }
}

module.exports = toCSV;
