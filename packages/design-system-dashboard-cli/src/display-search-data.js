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
 * Displays the data in a human-injestable way.
 *
 * @param data {Object} - The data to display.
 */
function displaySearchData(data) {
  const stringified = {};
  Object.keys(data).forEach(componentName => {
    stringified[componentName] = Object.keys(data[componentName])
      // We're displaying the total by the app name, so don't display it twice
      .filter(cn => cn !== 'total')
      .map(
        appName =>
          `    ${chalk.bold(appName)}: ${chalk.yellow(
            data[componentName][appName]
          )}`
      )
      .join('\n');
  });

  // Display the data
  Object.keys(stringified).forEach(componentName => {
    console.log(
      `${chalk.green.underline.bold(componentName)}: ${chalk.yellow.bold(
        data[componentName].total
      )}`
    );
    console.log(stringified[componentName] + '\n');
  });
}

module.exports = displaySearchData;
