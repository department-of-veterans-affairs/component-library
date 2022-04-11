const memfs = require('memfs');
const path = require('path');
const toCSV = require('../src/to-csv');

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

const flattenedData = [
  {
    date: '2022-04-08',
    component_name: 'alert',
    some_app: 2,
    total: 2,
  },
  {
    date: '2022-04-08',
    component_name: 'accordion',
    some_app: 2,
    another_app: 1,
    total: 3,
  },
];

describe('toCSV', () => {
  it('writes a CSV file', async () => {
    await toCSV(flattenedData, './output.csv');
    const csvPath = path.resolve(__dirname, '../output.csv');
    const csvFile = memfs.vol.toJSON()[csvPath];
    expect(csvFile).toMatchSnapshot();
  });
});
