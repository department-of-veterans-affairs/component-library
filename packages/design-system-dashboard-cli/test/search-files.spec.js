const memfs = require('memfs');
const {
  readAllModules,
  readFile,
  readAllTemplates,
  search,
} = require('../src/search-files');

const env = {
  repos: {
    'vets-website': 'mock-vw/',
    'content-build': 'mock-cb/',
  },
};
const jsxFile = 'const phone = () => (<va-telephone contact={phoneContact} />)';

const json = {
  '../.env.json': JSON.stringify(env),
  'mock-vw/jsx-file.jsx': jsxFile,
  'mock-vw/js-file.js': 'some JS',
  // 'mock-vw/js-file.unit.js': 'Testing code',
  'mock-vw/txt-file.txt': 'Some text',
  'mock-cb/liquid-template.liquid': 'A template',
  'mock-cb/html-layout.html': 'HTML page',
};

jest.mock('fs');
memfs.vol.fromJSON(json, '.');

describe('readAllModules', () => {
  it('reads only js and jsx files', () => {
    const files = readAllModules(env.repos['vets-website']);

    expect(files.length).toEqual(2);
    expect(files[0].path).toEqual('mock-vw/js-file.js');
    expect(files[0].contents).toEqual('some JS');
    expect(files[1].path).toEqual('mock-vw/jsx-file.jsx');
    expect(files[1].contents).toEqual(jsxFile);
  });
});

describe('readAllTemplates', () => {
  it('reads only liquid and html files', () => {
    const files = readAllTemplates(env.repos['content-build']);

    expect(files.length).toEqual(2);
    expect(files[0].path).toEqual('mock-cb/html-layout.html');
    expect(files[0].contents).toEqual('HTML page');
    expect(files[1].path).toEqual('mock-cb/liquid-template.liquid');
    expect(files[1].contents).toEqual('A template');
  });
});

describe('readFile', () => {
  it('returns an array with a single file matching the structure in `readAllModules` and `readAllTemplates`', () => {
    const filepath = 'mock-vw/txt-file.txt';
    const files = readFile(filepath);

    expect(files.length).toEqual(1);
    expect(files[0].path).toEqual(filepath);
    expect(files[0].contents).toEqual('Some text');
  });
});

describe('search', () => {
  it('filters out files based on a search term', () => {
    const files = readAllModules(env.repos['vets-website']);
    const searchTerm = new RegExp('telephone', 'gms');
    const filteredFiles = search(files, searchTerm);

    console.log(filteredFiles);
    expect(filteredFiles.length).toEqual(1);
    expect(filteredFiles[0].path).toEqual('mock-vw/jsx-file.jsx');
    expect(filteredFiles[0].matches).toEqual([['telephone']]);
  });

  it('expects the second arg to be a regex', () => {
    expect(() => {
      search('some-file.txt', 'a string');
    }).toThrow('Must pass a RegExp term to search()');
  });
});
