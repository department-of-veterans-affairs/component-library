const writeCompPathOwnersToCSV = require('../src/write-react-owners-to-csv');

const SampleData = {
  AlertBox: [
    '/Users/name/Projects/vets-website/src/applications/coronavirus-vaccination-expansion/config/va-location/DynamicRadioWidget.jsx',
    '/Users/name/Projects/vets-website/src/applications/coronavirus-vaccination/components/Form.jsx',
  ],
  FakeComponent: [
    '/Users/name/Projects/vets-website/src/applications/disability-benefits/2346/components/Accessories.jsx',
    '/Users/name/Projects/vets-website/src/applications/disability-benefits/2346/components/Batteries.jsx',
  ],
};

describe('writeCompPathOwnersToCSV', () => {
  it('writes a CSV file', () => {
    expect(() => writeCompPathOwnersToCSV(SampleData)).not.toThrow();
  });
});
