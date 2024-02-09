/**
 * Search through `vets-website` for uses of the design system components and
 * display the result.
 */

const path = require('path');

const commandLineArgs = require('command-line-args');
// @ts-ignore
const _ = require('lodash');

const {
  readAllModules,
  readFile,
  readAllTemplates,
  search,
} = require('./search-files');
const getManifest = require('./get-manifest');
const displaySearchData = require('./display-search-data');
const flattenData = require('./flatten-data');
const toCSV = require('./to-csv');
const toSQL = require('./to-sql');
const today = require('./today');
const { repos } = require('./env');

/**
 * Filter the search results by the search string(s).
 *
 * @param data {Object} - The component-name-keyed object containing the usage count
 * @param searchStrings {string[]} - The components to display usage for
 */
function filterSearchedComponents(data, searchStrings = []) {
  // Filter out the non-matches
  const searchTerms = searchStrings.map(s => new RegExp(s));
  const matchedComponentNames = Object.keys(data).filter(componentName =>
    searchTerms.length
      ? searchTerms.reduce(
          (found, term) => found || term.test(componentName),
          false
        )
      : true
  );
  return _.pick(data, matchedComponentNames);
}

/**
 * For modules not belonging to an application, we'll just increment an
 * "Platform(ish)" pseudo-application.
 *
 * data = {
 *   componentName: {
 *     appName: 3 // Number of times it's imported
 *   }
 * }
 *
 * @return {Object} - The component-name-keyed object containing the usage count
 */
function tallyResults(vwComponents, contentBuildWC, uswdsComponents) {
  const data = {};
  /** @type {{[component: string]: string[]}} */
  const instancesByComponent = {};
  // if data[componentName].uswds isn't present then initialize it, otherwise increment it
  function incrementCount(componentName, appName) {
    if (!data[componentName]) data[componentName] = { total: 0 };
    if (!data[componentName][appName]) data[componentName][appName] = 0;
    data[componentName][appName]++;
    data[componentName].total++;
  }

  function incrementUswdsCount(componentName) {
    if (!data[componentName].uswds) {
      data[componentName].uswds = 0;
    }
    data[componentName].uswds++;
  }

  // Count the components in vets-website
  vwComponents.forEach(i => {
    const manifest = getManifest(i.path);
    const app = manifest ? manifest.appName : 'Platform(ish)';

    i.matches.forEach(m => {
      const componentName = m[1];
      if (componentName) {
        incrementCount(componentName, app);

        // If the component is not yet in the collection, initialize it as an empty array
        if (!instancesByComponent[componentName])
          instancesByComponent[componentName] = [];

        // Only include the app path if it hasn't already been included previously
        if (!instancesByComponent[componentName].includes(i.path))
          instancesByComponent[componentName].push(i.path);
      }
    });
  });

  // Count the components in the content build
  contentBuildWC.forEach(i => {
    i.matches.forEach(m => {
      const componentName = m[1];
      if (componentName) {
        incrementCount(componentName, 'Static content templates');

        // If the component is not yet in the collection, initialize it as an empty array
        if (!instancesByComponent[componentName])
          instancesByComponent[componentName] = [];

        // Only include the app path if it hasn't already been included previously
        if (!instancesByComponent[componentName].includes(i.path))
          instancesByComponent[componentName].push(i.path);
      }
    });
  });

  uswdsComponents.forEach(i => {
    i.matches.forEach(m => {
      const componentName = m[1];
      if (componentName) {
        incrementUswdsCount(componentName);

        // If the component is not yet in the collection, initialize it as an empty array
        if (!instancesByComponent[componentName])
          instancesByComponent[componentName] = [];

        // Only include the app path if it hasn't already been included previously
        if (!instancesByComponent[componentName].includes(i.path))
          instancesByComponent[componentName].push(i.path);
      }
    });
  });

  return data;
}

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
 *
 */
function findUsedReactComponents(vwModules, regexPattern) {
  // Get a list of files which import components from the component library
  const componentLibraryImports = search(vwModules, regexPattern);
  return componentLibraryImports.reduce((allFilesCompUses, match) => {
    // For each import in each file, find the component that's being imported
    // and search that file for how many times that component is _used_.
    const fileComponentUses = match.matches.reduce((singleFileUses, m) => {
      // First item will be the import match, second will be a string of component names
      const componentNames = m[1];
      // componentNames looks like 'VaAlert,\n VaModal,\n' so first we split it on \n
      const lines = componentNames.split('\n').map(line => line.trim());
      // then we get rid of commas and keep anything beginning with Va
      const componentNamesArray = lines
        .map(item => item.replace(/,+$/, ''))
        .filter(item => item.startsWith('Va'));
      // For each component in componentNamesArray, search the file that imports it for
      // all usages and push it into singleFileUses
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
 * Search vets-website and the content build for design system components.
 *
 * @param searchStrings {string[]} - The components to display usage for
 *
 * Passing in the string 'uswds' will output a list of all web components and
 * web component react bindings where the uswds prop is used and not set to false
 */
function findComponents(searchStrings) {
  const vwModules = readAllModules(`${repos['vets-website']}/src`);
  const contentTemplates = readAllTemplates(`${repos['content-build']}/src`);

  const usedReactComponentsRegex =
    /import [^;]+ from '@department-of-veterans-affairs\/component-library\/(\w+)/gms;
  const usedReactComponents = findUsedReactComponents(
    vwModules,
    usedReactComponentsRegex
  );

  const usedBindingsRegex =
    /import {\s*([^;]+)\s*}\s*from '@department-of-veterans-affairs\/component-library\/dist\/react-bindings'/gms;
  const usedReactBindings = findUsedReactComponents(
    vwModules,
    usedBindingsRegex
  );

  const wcTagRegex = /<(va-[^\s>]+)/gms;
  // Excludes uswds="false" (explicit opt-out) == only matches true if V3, else not V3
  const wcUswds3Regex =
    /<(Va[^\s]+|va-[^\s]+)(\s|\n)[^>]*?uswds(?!=?"?'?false)/gms;

  let vwWebComponents;
  let contentBuildWC;
  let vwComponents;
  const uswdsV3Components = [...search(vwModules, wcUswds3Regex)];

  if (searchStrings?.includes('uswds')) {
    vwWebComponents = search(vwModules, wcUswds3Regex);
    contentBuildWC = search(contentTemplates, wcUswds3Regex);
    vwComponents = [...vwWebComponents];
  } else {
    vwWebComponents = search(vwModules, wcTagRegex);
    contentBuildWC = search(contentTemplates, wcTagRegex);
    vwComponents = [
      ...usedReactComponents,
      ...vwWebComponents,
      ...usedReactBindings,
    ];
  }

  const data = tallyResults(vwComponents, contentBuildWC, uswdsV3Components);
  return searchStrings?.includes('uswds')
    ? data
    : filterSearchedComponents(data, searchStrings);
}

if (require.main === module) {
  const optionDefinitions = [
    { name: 'csv', type: Boolean },
    { name: 'sql', type: Boolean },
    { name: 'update', type: Boolean },
    {
      name: 'date',
      type: String,
      defaultValue: new Date().toISOString().substr(0, 'xxxx-xx-xx'.length),
    },
    {
      name: 'output',
      alias: 'o',
      type: filePath => path.resolve(filePath),
      defaultValue: path.resolve(__dirname, `../ds-components-${today}.csv`),
    },
    { name: 'searchTerms', multiple: true, defaultOption: true },
  ];

  const options = commandLineArgs(optionDefinitions);

  const data = findComponents(options.searchTerms);

  const date = options.date;
  if (options.csv) {
    toCSV(flattenData(data, date), options.output);
  } else if (options.update) {
    console.log(toSQL.update(flattenData(data, date)));
  } else if (options.sql) {
    console.log(toSQL.insert(flattenData(data, date)));
  } else {
    displaySearchData(data);
  }
}
