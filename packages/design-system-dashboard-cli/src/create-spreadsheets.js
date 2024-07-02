/**
 * Search through vets-website and content-build for instance of DST components, tally them up, and write the results to separate CSV files, one for each type of component (React, V1, V3)
 */

const {
  writeCompPathsToCSV,
  writeIconPathsToCSV,
} = require('./write-comp-usage-to-csv');
const {
  readAllModules,
  readAllStylesheets,
  readAllTemplates,
  readAllTests,
  readFile,
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
    // For icons, sometimes the first component match is empty, so assigning the second match if needed
    component = component?.replace('>', '');
    return { path, component };
  });
  return flattened.concat(newFlat);
};

/**
 * Search vets-website and the content build for design system components and instances of Font Awesome icons.
 */
function findComponentsAndIcons() {
  const vwModules = readAllModules(`${repos['vets-website']}/src`);
  const cbTemplates = readAllTemplates(`${repos['content-build']}/src`);
  const vwStylesheets = readAllStylesheets(`${repos['vets-website']}/src`);
  const vwTests = readAllTests(`${repos['vets-website']}/src`);

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
  const v1WCTagRegex = /<(Va[^\s]+|va-[^\s]+)(\s|\n)[^>]*?uswds="?'?{?false/gms;

  // Start by getting all of the vets-website web components
  // Even though the variable says "V3", this initially holds ALL of the components
  /** @type {componentPath[]} */
  const vwV3WC = [...search(vwModules, allWCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next, search again but this time get only V1 components
  /** @type {componentPath[]} */
  const vwV1WC = [...search(vwModules, v1WCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next, remove all V1 components from the V3 collection, leaving only V3 components
  vwV1WC.forEach(compPath => {
    const foundIndex = vwV3WC.findIndex(
      allCompPath =>
        compPath.path === allCompPath.path &&
        compPath.component === allCompPath.component
    );
    if (foundIndex) {
      vwV3WC.splice(foundIndex, 1);
    }
  });

  // Now we can move onto searching the content-build repo
  // We again start by getting ALL of the web components (filter comes later)
  const cbV3WC = [...search(cbTemplates, allWCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next we get all of the V1 web components
  const cbV1WC = [...search(cbTemplates, v1WCTagRegex)].reduce(
    flattenMatches,
    []
  );

  // Next we filter out the V3 components from the V1 collection
  cbV1WC.forEach(compPath => {
    const foundIndex = cbV3WC.findIndex(
      allCompPath =>
        compPath.path === allCompPath.path &&
        compPath.component === allCompPath.component
    );
    if (foundIndex) {
      cbV3WC.splice(foundIndex, 1);
    }
  });

  // Combine the vw and cb collections
  const v1WebComponents = [...vwV1WC, ...cbV1WC];
  const v3WebComponents = [...vwV3WC, ...cbV3WC];

  // Now, we look through the vw and cb modules and templates again, this time looking for potential Font Awesome icons
  const iconRegex = /<i[\s]/gm;
  const vwIcons = [...search(vwModules, iconRegex)].reduce(flattenMatches, []);
  const cbIcons = [...search(cbTemplates, iconRegex)].reduce(
    flattenMatches,
    []
  );

  // Also look into VW stylesheets for obvious mentions of Font Awesome
  const styleRegex = /("Font Awesome|\.fa-|\.fa[srb]?[\s.{,])/g;
  const vwStyleIcons = [...search(vwStylesheets, styleRegex)].reduce(
    flattenMatches,
    []
  );

  // Also look into VW tests for fa- classes (filtering out "mfa")
  const testRegex = /[^m](fa-)/g;
  const vwTestIcons = [...search(vwTests, testRegex)].reduce(
    flattenMatches,
    []
  );

  const iconMatches = [...vwIcons, ...cbIcons, ...vwStyleIcons, ...vwTestIcons];

  return {
    react: allReactComponents,
    v1: v1WebComponents,
    v3: v3WebComponents,
    icons: iconMatches,
  };
}

function writeCountsToCSVs(data) {
  Object.entries(data).forEach(([breakoutType, components]) => {
    if (breakoutType !== 'icons') {
      // write stuff out for each breakoutType
      writeCompPathsToCSV({ breakoutType, components });
    } else {
      // write icon stuff out
      writeIconPathsToCSV(components);
    }
  });
}

if (require.main === module) {
  const data = findComponentsAndIcons();

  console.log('react total instances:', data.react.length);
  console.log('v1 total instances:', data.v1.length);
  console.log('v3 total instances:', data.v3.length);
  console.log('icon total instances:', data.icons.length);

  writeCountsToCSVs(data);
}
