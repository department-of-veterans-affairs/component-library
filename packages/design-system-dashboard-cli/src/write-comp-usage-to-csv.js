const fs = require('fs');
const path = require('path');
const csv = require('csv');
const codeowners = require('./codeowners.json');
const today = require('./today');

/**
 * @typedef {string} Component
 * @typedef {string} Path
 * @typedef {string} Owner
 * @typedef {number} Total
 * @typedef {[Component, Path, Owner, Total]} CompPathOwner
 * @typedef {[Path, Owner, Total]} IconPathOwner
 */

function cleanPath(pathToClean) {
  const cwd = process.cwd();
  const relDir = path.relative(cwd, pathToClean).replace(/\.\.\//g, '');
  return relDir;
}

/**
 * @description Should "return" a CSV file where each 'line' has "component, app, owner, total in app"
 * @param {{breakoutType: string, components: Array<{path: string, component: string}>}} param0
 */
function writeCompPathsToCSV({ breakoutType, components }) {
  // Big reducer takes a component name and path and determines which app and owner they belong to
  /** @type {CompPathOwner[]} */
  const compInstPathOwnersOutput = components.reduce(
    (/** @type {CompPathOwner[]} */ acc, { path, component }) => {
      let app = '';
      let owner = '';
      let total = 1;
      // First, clean the path of the local user's info
      let compPath = cleanPath(path);

      // Second, remove the reference to the vets-website if present
      compPath = compPath.replace('vets-website/', '');

      // Get rid of the last part of the path, including the filename, so all that's left is the app name
      compPath = compPath.replace(/\/\w+\.\w+$/, '');

      // Assign app and owner directly if belongs in content-build repo
      if (compPath.startsWith('content-build')) {
        app = compPath;
        owner = 'va-platform-cop-frontend';
      }

      // If no owner yet, find a matching owner path if possible
      Object.entries(codeowners).forEach(([appPath, appOwner]) => {
        if (compPath.includes(appPath)) {
          app = appPath;
          owner = appOwner;
        }
      });
      // If still no app or owner, assign to COP frontend
      if (app === '') app = compPath;
      if (owner === '') owner = 'va-platform-cop-frontend';

      // For each component, need to determine how many times it gets used per app, so we look to find the item (if it exists) that exactly matches the component, app, and owner and increase the total value by 1
      // If no item found, add the current item to the collection
      if (acc.length > 0) {
        const foundIndex = acc.findIndex(
          ([accComponent, accApp, accOwner]) =>
            accComponent === component && accApp === app && accOwner === owner
        );
        if (foundIndex > -1) {
          acc[foundIndex][3] += 1;
        } else {
          acc.push([component, app, owner, total]);
        }
      } else {
        // Very first time, just add the CompPathOwner array
        acc.push([component, app, owner, total]);
      }

      return acc;
    },
    []
  );

  // Alphabetically sorts by [0], the component name
  compInstPathOwnersOutput.sort(([compA], [compB]) => {
    return compA > compB ? 1 : compA === compB ? 0 : -1;
  });

  // Add a "header" row for the CSV file
  compInstPathOwnersOutput.unshift([
    'Component',
    'App',
    'Owner',
    // @ts-ignore
    `Total - ${components.length}`,
  ]);

  // Finally, we write to csv, one file per breakout type
  // Uses the 'csv' library to transmute the array of arrays into a CSV string, then write it to a file
  csv.stringify(compInstPathOwnersOutput, (_, output) => {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../../componentUsage-${breakoutType}-${today}.csv`
      ),
      output
    );
  });
}

function writeIconPathsToCSV(icons) {
  // Big reducer takes a component name and path and determines which owner they belong to
  /** @type {IconPathOwner[]} */
  const iconInstPathOwnersOutput = icons.reduce(
    (/** @type {IconPathOwner[]} */ acc, { path }) => {
      let pagePath = '';
      let owner = '';
      let total = 1;
      // First, clean the path of the local user's info
      let compPath = cleanPath(path);

      // Second, replace the reference to the vets-website if present
      compPath = compPath.replace('vets-website/', '');

      // Assign path and owner directly if belongs in content-build repo
      if (compPath.startsWith('content-build')) {
        pagePath = compPath;
        owner = 'va-platform-cop-frontend';
      } else {
        // If no owner yet, find a matching owner path if possible
        Object.entries(codeowners).forEach(([appPath, appOwner]) => {
          if (compPath.includes(appPath)) {
            owner = appOwner;
          }
        });
      }

      // If still no path or owner, assign to COP frontend
      if (pagePath === '') pagePath = compPath;
      if (owner === '') owner = 'va-platform-cop-frontend';

      // For each icon, need to determine how many times it gets used per path, so we look to find the item (if it exists) that exactly matches the app, and owner and increase the total value by 1
      if (acc.length > 0) {
        const foundIndex = acc.findIndex(
          ([accPath, accOwner]) => accPath === pagePath && accOwner === owner
        );

        if (foundIndex > -1) {
          // Previous path found, so increment total by 1
          acc[foundIndex][2] += 1;
        } else {
          // If no item found, add the current item to the collection
          acc.push([pagePath, owner, total]);
        }
      } else {
        // Very first time, just add the iconPathOwner array as is
        acc.push([pagePath, owner, total]);
      }

      return acc;
    },
    []
  );

  // Alphabetically sorts by [0], the path name
  iconInstPathOwnersOutput.sort(([compA], [compB]) => {
    return compA > compB ? 1 : compA === compB ? 0 : -1;
  });

  // Add a "header" row for the CSV file
  iconInstPathOwnersOutput.unshift([
    'Page Path',
    'Owner',
    // @ts-ignore
    `Total Icons - ${icons.length}`,
  ]);

  // Finally, we write to csv, one file per breakout type
  // Uses the 'csv' library to transmute the array of arrays into a CSV string, then write it to a file
  csv.stringify(iconInstPathOwnersOutput, (_, output) => {
    fs.writeFileSync(
      path.resolve(__dirname, `../../../componentUsage-icons-${today}.csv`),
      output
    );
  });
}

module.exports = {
  writeCompPathsToCSV,
  writeIconPathsToCSV,
};
