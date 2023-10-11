const writeCompPathOwnersToCSV = require('../src/write-react-owners-to-csv');

const SampleData = {
  FakeComponent: [
    '/Users/name/Projects/vets-website/src/applications/disability-benefits/2346/components/Accessories.jsx',
    '/Users/name/Projects/vets-website/src/applications/disability-benefits/2346/components/Batteries.jsx',
  ],
};

describe('writeCompPathOwnersToCSV', () => {
  it.skip('writes a CSV file', () => {
    expect(() => writeCompPathOwnersToCSV(SampleData)).not.toThrow();
  });
});
