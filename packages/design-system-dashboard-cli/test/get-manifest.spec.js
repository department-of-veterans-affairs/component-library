// const memfs = require('memfs');
// const getManifest = require('../src/get-manifest');

// const manifestContents = JSON.stringify({foo: 'bar'})

// const json = {
//   'mock-vw/src/apps/foo/manifest.json': manifestContents,
//   'mock-vw/src/apps/foo/components/my-cmp.jsx': 'File contents',
//   'mock-vw/src/apps/bar/package.json': 'File contents',
//   'mock-vw/src/apps/bar/components/my-cmp.jsx': 'File contents',
// };

// jest.mock('fs');
// memfs.vol.fromJSON(json, '.');

// describe('getManifest', () => {
//   it('searches parent directories for a manifest.json file', () => {
//     const manifest = getManifest('mock-vw/src/apps/foo/components/my-cmp.jsx');

//     expect(manifest).toEqual({foo: 'bar'})
//   });

//   // This is to act as a hard-stop to the recursion
//   it('returns null if it finds a package.json', () => {
//     const manifest = getManifest('mock-vw/src/apps/bar/components/my-cmp.jsx');

//     expect(manifest).toEqual(null)
//   });
// });
