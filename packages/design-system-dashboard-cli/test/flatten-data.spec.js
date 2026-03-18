const memfs = require('memfs');
const flattenData = require('../src/flatten-data');

const dataMock = {
  AlertComponent: {
    total: 8,
    'App one': 2,
    'App two': 3,
    '100App': 3,
  },
  AccordionComponent: {
    total: 2,
    'App one': 2,
  },
  InputComponent: {
    total: 3,
    'App two': 3
  }
}
const date = '2000-01-01';

describe('flattenData', () => {
  it('returns an array of objects', () => {
    const flattened = flattenData(dataMock, date)

    expect(flattened).toBeInstanceOf(Array)
    flattened.forEach(item =>
      expect(item).toBeInstanceOf(Object)
    );
  })

  it('puts the second argument (date) into each item', () => {
    const flattened = flattenData(dataMock, date)

    flattened.forEach(item =>
      expect(item.date).toEqual(date)
    );
  });

  it('has a structure including component_name and each app', () => {
    const flattened = flattenData(dataMock, date)

    const accordionComponent = flattened.find(item => item.component_name === 'AccordionComponent')
    expect(accordionComponent.component_name).toEqual('AccordionComponent')
    expect(accordionComponent.app_one).toEqual(2)
    expect(accordionComponent.total).toEqual(2)
  });

  it('prepends an underscore before keys that start with a number', () => {
    const flattened = flattenData(dataMock, date)

    const numeric = flattened.find(item => Object.keys(item).some(key => key.includes('100')))
    expect(numeric._100app).toEqual(3)
  });

  it('puts date and component_name first, total last, app columns sorted alphabetically', () => {
    const flattened = flattenData(dataMock, date)

    const alert = flattened.find(item => item.component_name === 'AlertComponent')
    const keys = Object.keys(alert)

    expect(keys[0]).toEqual('date')
    expect(keys[1]).toEqual('component_name')
    expect(keys[keys.length - 1]).toEqual('total')

    // App columns between component_name and total should be sorted
    const appKeys = keys.slice(2, keys.length - 1)
    expect(appKeys).toEqual([...appKeys].sort())
  });

  it('places uswds immediately after component_name when present', () => {
    const dataWithUswds = {
      AlertComponent: {
        total: 5,
        'App one': 2,
        'App two': 3,
        uswds: 1,
      },
    }
    const flattened = flattenData(dataWithUswds, date)
    const keys = Object.keys(flattened[0])

    expect(keys[0]).toEqual('date')
    expect(keys[1]).toEqual('component_name')
    expect(keys[2]).toEqual('uswds')
    expect(keys[keys.length - 1]).toEqual('total')
  });

});

