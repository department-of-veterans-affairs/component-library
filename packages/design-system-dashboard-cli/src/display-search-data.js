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
  let total = 0;
  Object.keys(data).forEach(componentName => {
    total += data[componentName].total;
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

  // Only show the final "Total" if we have more than one component
  // in the data
  if (Object.keys(stringified).length > 1) {
    console.log(chalk.bold('Total:'), total);
  }
}

module.exports = displaySearchData;
