/**
 * Search through vets-website and content-build for instance of DST components, tally them up, and write the results to separate CSV files, one for each type of component (React, V1, V3)
 */

const writeCompPathsToCSV = require('./write-comp-usage-to-csv');
const {
  readAllModules,
  readFile,
  readAllTemplates,
  search,
} = require('./search-files');
const { repos } = require('./env');

/**
 * @typedef {{componentName: string, app: string, owner: string, total: number}} componentTotal
 * @typedef {{path: string, component: string}} componentPath
 */

/**
 * Match component-library React component uses in individual files
 *
 * It's possible a file imports more than one component at the same time
 * using syntax like:
 * import { VaTextInput, VaModal } from ....
 * or:
 * import {
 *  VaTextInput,
 *  VaModal,
 * } from ...
 *
 * When this is the case, match.matches[1] (componentName = m[1] below),
 * will look something like 'VaTextInput,\n VaModal,\n'. With this,
 * componentName needs to become an array of component names, and each of those need
 * to be iterated over using componentRegex to retrieve an accurate count.
 * @return {Object[]} - The result of multiple searches
 */
function findReactComponents(modulesOrTemplates, regexPattern) {
  // Get a list of files which import components from the component library
  const componentLibraryImports = search(modulesOrTemplates, regexPattern);
  return componentLibraryImports.reduce((allFilesCompUses, match) => {
    // For each import in each file, find the component that's being imported
    // and search that file for how many times that component is _used_.
    const fileComponentUses = match.matches.reduce((singleFileUses, m) => {
      // First item will be the import match, second will be a string of component names
      const componentNames = m[1];
      // componentNames looks like 'VaAlert,\n VaModal,\n' so first we split it on \n
      const lines = componentNames.split('\n').map(line => line.trim());
      // then we get rid of commas
      const componentNamesArray = lines.map(item => item.replace(/,+$/, ''));
      // For each component in componentNamesArray, search the file that imports it for
      // all usages and push it into singleFileUses (gets rid of 'contacts' and 'dist' imports)
      componentNamesArray.map(c => {
        const regEx = new RegExp(`<(${c})`, 'g');
        singleFileUses.push(...search(readFile(match.path), regEx));
      });
      return singleFileUses;
    }, []);
    return allFilesCompUses.concat(fileComponentUses);
  }, []);
}

/**
 * @description This is a reduce function which 'flattens' match arrays so that there's one object per occurrence of each component.
 * @param {{path: string, matches: [tag: string, component: string] }} compPathObj
 * @returns {componentPath[]}
 */
const flattenMatches = (flattened, compPathObj) => {
  const path = compPathObj.path;
  // Ignores the tag, just need the component's name
  const newFlat = compPathObj.matches.map(([, component]) => {
    // Some component name matches include the ending '>', so we remove that here
    component = component.replace('>', '');
    return { path, component };
  });
  return flattened.concat(newFlat);
};

/**
 * Search vets-website and the content build for design system components.
 */
function findComponents() {
  const vwModules = readAllModules(`${repos['vets-website']}/src`);
  const cbTemplates = readAllTemplates(`${repos['content-build']}/src`);

  // First thing we do is find all of the React components
  // This regex finds all of the non-react-binding imports
  const usedReactComponentsRegex =
    /import [^;]+ from '@department-of-veterans-affairs\/component-library\/(\w+)/gms;
  // Find all of the React components from vets-website
  const vwReactComponents = findReactComponents(
    vwModules,
    usedReactComponentsRegex
  ).reduce(flattenMatches, []);
  // Find all of the React components from content-build
  const cbReactComponents = findReactComponents(
    cbTemplates,
    usedReactComponentsRegex
  ).reduce(flattenMatches, []);
  // Combine the results
  const allReactComponents = [...vwReactComponents, ...cbReactComponents];

  // Next we find all of the web components from vets-website
  // Finds all of the web components, whether react-binding or not, V1 and V3
  const allWCTagRegex = /<(Va[^\s]+|va-[^\s]+)(\s|\n)[^>]*?/gms;
  // Finds all of the V3 web components, excludes uswds="false" (explicit opt-out)
  const v3WCTagRegex =
    /<(Va[^\s]+|va-[^\s]+)(\s|\n)[^>]*?uswds(?!=?"?'?false)/gms;

  // Start by getting all of the vets-website web components
  // Even though the variable says "V1", this initially holds ALL of the components
  /** @type {componentPath[]} */
  const vwV1WC = [...search(vwModules, allWCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next, search again but this time get only V3 components
  /** @type {componentPath[]} */
  const vwV3WC = [...search(vwModules, v3WCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next, remove all V3 components from the V1 collection, leaving only V1 components
  vwV3WC.forEach(compPath => {
    const foundIndex = vwV1WC.findIndex(
      allCompPath =>
        compPath.path === allCompPath.path &&
        compPath.component === allCompPath.component
    );
    if (foundIndex) {
      vwV1WC.splice(foundIndex, 1);
    }
  });

  // Now we can move onto searching the content-build repo
  // We again start by getting ALL of the web components (filter comes later)
  const cbV1WC = [...search(cbTemplates, allWCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next we get all of the V3 web components
  const cbV3WC = [...search(cbTemplates, v3WCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Finally we filter out the V3 components from the V1 collection
  cbV3WC.forEach(compPath => {
    const foundIndex = cbV1WC.findIndex(
      allCompPath =>
        compPath.path === allCompPath.path &&
        compPath.component === allCompPath.component
    );
    if (foundIndex) {
      cbV1WC.splice(foundIndex, 1);
    }
  });

  // Last but not least, combine the vw and cb collections
  const v1WebComponents = [...vwV1WC, ...cbV1WC];
  const v3WebComponents = [...vwV3WC, ...cbV3WC];

  return {
    react: allReactComponents,
    v1: v1WebComponents,
    v3: v3WebComponents,
  };
}

function writeCountsToCSVs(data) {
  Object.entries(data).forEach(([breakoutType, components]) => {
    // write stuff out for each breakoutType
    writeCompPathsToCSV({ breakoutType, components });
  });
}

if (require.main === module) {
  const data = findComponents();

  console.log('react total instances:', data.react.length);
  console.log('v1 total instances:', data.v1.length);
  console.log('v3 total instances:', data.v3.length);

  writeCountsToCSVs(data);
}
