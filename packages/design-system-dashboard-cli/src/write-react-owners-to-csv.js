const fs = require('fs');
const path = require('path');
const csv = require('csv');
const codeowners = require('./codeowners.json');
const today = require('./today');

const componentsToKeep = [
  'AdditionalInfo',
  'AlertBox',
  'Checkbox',
  'CheckboxGroup',
  'ExpandingGroup',
  'FileInput',
  'IconSearch',
  'IconUser',
  'LoadingIndicator',
  'Pagination',
  'ProgressButton',
  'Select',
  'Table',
  'TextInput',
];

const hasMigrationScript = ['AlertBox', 'AdditionalInfo', 'LoadingIndicator'];

function cleanPath(pathToClean) {
  const cwd = process.cwd();
  const relDir = path.relative(cwd, pathToClean).replace(/\.\.\//g, '');
  return relDir;
}

function writeCompPathOwnersToCSV(instancesByComponent) {
  /**
   * @typedef {string} Component
   * @typedef {string} Path
   * @typedef {string} Owner
   * @typedef {Array<Component, Path, Owner>} CompPathOwner
   */

  /** @type {CompPathOwner[]} */
  const compInstPathOwnersOutput = [];

  // Iterate over the list of components
  for (let component in instancesByComponent) {
    // First, determine if they should be added to the list (skip this component if not)
    if (componentsToKeep.includes(component)) {
      // Get all of the paths associated with the component
      const compPaths = instancesByComponent[component];

      // For each path, determine who's listed as it's owner in the ./codeowners.json file (not automatically kept up-to-date)
      compPaths.forEach(compPath => {
        // The 'keys' in the codeowners.json object are the path names; 'values' are the name(s) of the owners
        let ownerPath = Object.keys(codeowners).reduce(
          (matchedPath, ownerPath) => {
            // First, clean the path of the local user's info
            compPath = cleanPath(compPath);

            // Second, remove the reference to the vets-website if present
            compPath = compPath.replace('vets-website/', '');

            // Get rid of the last part of the path, including the filename, so all that's left is the app name
            compPath = compPath.replace(/\/\w+\/\w+\.\w+$/, '');
            /**
             * Check if the current "ownerPath" is included in the component's path;
             * e.g. "src/applications/auth" is included in "src/applications/auth/components/HelpdeskContact.jsx"
             */
            if (compPath.includes(ownerPath)) matchedPath = ownerPath;
            return matchedPath;
          },
          '*' // "*" is the catch-all, assigns all unmatched component paths to the cop-frontend team
        );

        /**
         * @type {string[]}
         * @description There can be more than one owner, so this should always be an array
         */
        let owners = codeowners[ownerPath];

        // In the event an owner is not listed or is not found, the 'default' is the cop-frontend team
        if (owners === undefined) {
          owners = ['va-platform-cop-frontend'];
        }

        // Create a new "CompPathOwner" array for each owner, for each path, and for each component
        owners.forEach(owner => {
          /** @type {CompPathOwner} */
          const item = [
            component,
            compPath,
            owner,
            1,
            hasMigrationScript.includes(component) ? 'Has script' : '',
          ];
          // Check if this is a duplicate, add it to collection if it isn't
          if (
            !compInstPathOwnersOutput.find(existingItem => {
              return (
                existingItem[0] === item[0] &&
                existingItem[1] === item[1] &&
                existingItem[2] === item[2]
              );
            })
          )
            compInstPathOwnersOutput.push(item);
        });
      });
    }
  }

  // Alphabetically sorts by [0], the component name
  compInstPathOwnersOutput.sort(([compA], [compB]) => {
    return compA > compB ? 1 : compA === compB ? 0 : -1;
  });

  // Add a "header" row for the CSV file
  compInstPathOwnersOutput.unshift([
    'Component',
    'App',
    'Owner',
    'Total',
    'Has Migration Script',
  ]);

  // Uses the 'csv' library to transmute the array of arrays into a CSV string, then write it to a file
  csv.stringify(compInstPathOwnersOutput, (_, output) => {
    fs.writeFileSync(
      path.resolve(
        __dirname,
        `../../../component-apps-and-owners-${today}.csv`
      ),
      output
    );
  });
}

module.exports = writeCompPathOwnersToCSV;
