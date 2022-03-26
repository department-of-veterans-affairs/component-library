const fs = require('fs');
const path = require('path');
const memoize = require('fast-memoize');

/**
 * Find the manifest file for the module at a given path. Return the contents.
 *
 * Look for manifest.json in the parent directory. Recurse until we find a
 * package.json.
 *
 * @param {string} modulePath - The file path to the module we're trying to find
 *        the manifest file for.
 * @returns {string} - The contents of the manifest file.
 * @returns {null} - No manifest file was found for the module.
 */
function _getManifest(pathString) {
  const ps = path.resolve(pathString);

  const stat = fs.lstatSync(ps, { throwIfNoEntry: false });
  // No such file or directory
  if (!stat) return null;
  // If it's a file, recurse with the dirname
  if (stat.isFile()) return getManifest(path.dirname(ps));
  // If we got a socket or something funky, just...don't...
  if (!stat.isDirectory()) return null;

  // If it's a directory, try to find the manifest file
  const dirContents = fs.readdirSync(ps);
  if (dirContents.includes('manifest.json')) {
    return JSON.parse(fs.readFileSync(path.join(ps, 'manifest.json'), 'utf8'));
  }

  // Check that we're not at the project root
  // NOTE: This will only work while each application doesn't have its own package.json file
  if (dirContents.includes('package.json')) return null;

  // Neither are found; move one directory up
  return getManifest(path.dirname(ps));
}

const getManifest = memoize(_getManifest);

module.exports = getManifest;
