const fs = require('fs');
const glob = require('glob');

// TODO: Read only the first few lines of a file since that's where the imports
// are going to be found. Reading is fast, though (4225 files in about 0.3
// seconds on my machine), so this is only worth it if searching the contents of
// that many files is slow.

/**
 * @typedef Module
 * @property path {string}
 * @property contents {string}
 */

/**
 * Find all .js and .jsx modules.
 *
 * @param rootDir {string} - The path to the root directory to search
 * @return {Module[]}
 */
function readAllModules(rootDir) {
  const jsFiles = glob.sync(`${rootDir}/**/*.@(js|jsx)`, {
    ignore: [
      `${rootDir}/**/tests/**`,
      // This mock-form directory exists in vets-website and we don't want to include it
      `${rootDir}/**/_mock-form/**`,
      `${rootDir}/**/*.unit.@(js|jsx)`,
      `${rootDir}/**/*.spec.@(js|jsx)`,
      `${rootDir}/**/ds-playground/**`,
      `${rootDir}/**/ds-v3-playground/**`,
    ],
  });

  return jsFiles.map(modulePath => ({
    path: modulePath,
    contents: fs.readFileSync(modulePath, 'utf8'),
  }));
}

/**
 * Find all .css and .scss files.
 *
 * @param rootDir {string} - The path to the root directory to search
 * @return {Module[]}
 */
function readAllStylesheets(rootDir) {
  const cssFiles = glob.sync(`${rootDir}/**/*.@(css|scss)`, {
    ignore: [
      `${rootDir}/**/tests/**`,
      // This mock-form directory exists in vets-website and we don't want to include it
      `${rootDir}/**/_mock-form/**`,
    ],
  });

  return cssFiles.map(filePath => ({
    path: filePath,
    contents: fs.readFileSync(filePath, 'utf8'),
  }));
}

/**
 * Find all .unit and .spec files.
 *
 * @param rootDir {string} - The path to the root directory to search
 * @return {Module[]}
 */
function readAllTests(rootDir) {
  const cssFiles = glob.sync(`${rootDir}/**/*.@(unit|spec).*`, {
    ignore: [
      // This mock-form directory exists in vets-website and we don't want to include it
      `${rootDir}/**/_mock-form/**`,
    ],
  });

  return cssFiles.map(filePath => ({
    path: filePath,
    contents: fs.readFileSync(filePath, 'utf8'),
  }));
}

/**
 * This reads a single file and exports it the same way
 * as `readAllModules` in order to keep the interface
 * the same across the script
 *
 * @param filepath {string} - The path to a single file
 * @return {Module[]} - An array with no more than one item
 */
function readFile(filepath) {
  return [
    {
      path: filepath,
      contents: fs.readFileSync(filepath, 'utf8'),
    },
  ];
}

/**
 * Read all the liquid and HTML templates.
 *
 * @param rootDir {string} - The path to the root directory to search
 * @return {Module[]}
 */
function readAllTemplates(rootDir) {
  const templateFiles = glob.sync(`${rootDir}/**/*.@(html|liquid)`);

  return templateFiles.map(modulePath => ({
    path: modulePath,
    contents: fs.readFileSync(modulePath, 'utf8'),
  }));
}

/**
 * Accepts the list of pre-read modules and search term.
 * Returns the filtered list of search results.
 *
 * @param allModules {Module[]} - The pre-read files to search
 * @param term {RegExp} - The regex search term
 * @return {Object[]} - { path: string, matches: String.prototype.matchAll result }
 */
function search(allModules, term) {
  if (!(term instanceof RegExp))
    throw new Error('Must pass a RegExp term to search().');

  return allModules
    .map(m => {
      const matches = m.contents.matchAll(term);
      return {
        path: m.path,
        // Because matches is an iterator, we have to Array.from() it. Because
        // each item in that array also includes the index and input, I'm
        // slicing the array to remove those properties. Just for output
        // cleanliness and potentially reduced memory usage. (Not using those
        // properties anyhow.)
        matches: matches && Array.from(matches).map(m => m.slice(0)),
      };
    })
    .filter(m => m.matches && m.matches.length);
}

module.exports = {
  readAllModules,
  readAllStylesheets,
  readAllTemplates,
  readAllTests,
  readFile,
  search,
};
