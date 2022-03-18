import { quicksort, reverseQuicksort } from './dom';

describe('quicksort', () => {
  it('sorts DOM elements by their value', () => {
    // Set up our document body
    document.body.innerHTML =
      '<span>Charlie</span>' +
      '<span>Alpha</span>' +
      '<span>Bravo</span>' +
      '<span>Delta</span>';

    const rows = document.body.childNodes;
    quicksort(rows, 0, rows.length - 1);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0]).toEqualText('Alpha');
    expect(sortedRows[1]).toEqualText('Bravo');
    expect(sortedRows[2]).toEqualText('Charlie');
    expect(sortedRows[3]).toEqualText('Delta');
  });

  it('sorts DOM elements with numbers by their unicode value', () => {
    // Set up our document body
    document.body.innerHTML =
      '<span>12</span>' +
      '<span>34</span>' +
      '<span>18</span>' +
      '<span>2</span>';

    const rows = document.body.childNodes;
    quicksort(rows, 0, rows.length - 1);

    const sortedRows = Array.from(document.querySelectorAll('span'));

    // The default is to compare the values as strings, not numbers.
    // Strings that _start_ with a lower unicode character are considered lower
    expect(sortedRows[0]).toEqualText('12');
    expect(sortedRows[1]).toEqualText('18');
    expect(sortedRows[2]).toEqualText('2');
    expect(sortedRows[3]).toEqualText('34');
  });

  it('sorts DOM elements with letters mixed with numbers by their value', () => {
    // Set up our document body
    document.body.innerHTML =
      '<span>Apple</span>' +
      '<span>64</span>' +
      '<span>65</span>' +
      '<span>Bear</span>' +
      '<span>Zebra</span>' +
      '<span>148</span>' +
      '<span>2000</span>';

    const rows = document.body.childNodes;
    quicksort(rows, 0, rows.length - 1);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0]).toEqualText('148');
    expect(sortedRows[1]).toEqualText('2000');
    expect(sortedRows[2]).toEqualText('64');
    expect(sortedRows[3]).toEqualText('65');
    expect(sortedRows[4]).toEqualText('Apple');
    expect(sortedRows[5]).toEqualText('Bear');
    expect(sortedRows[6]).toEqualText('Zebra');
  });

  it('allows a specific selector to be used for comparing nodes', () => {
    // This is very confusing at the moment
    document.body.innerHTML =
      '<span id="1">Charlie</span>' +
      '<span id="3">Alpha</span>' +
      '<span id="4">Bravo</span>' +
      '<span id="2">Delta</span>';

    const rows = document.body.childNodes;
    const idSelector = el => el.id;
    quicksort(rows, 0, rows.length - 1, idSelector);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0].id).toEqual('1');
    expect(sortedRows[0]).toEqualText('Charlie');

    expect(sortedRows[1].id).toEqual('2');
    expect(sortedRows[1]).toEqualText('Delta');

    expect(sortedRows[2].id).toEqual('3');
    expect(sortedRows[2]).toEqualText('Alpha');

    expect(sortedRows[3].id).toEqual('4');
    expect(sortedRows[3]).toEqualText('Bravo');
  });
});

describe('reverseQuicksort', () => {
  it('sorts DOM elements by their value', () => {
    // Set up our document body
    document.body.innerHTML =
      '<span>Charlie</span>' +
      '<span>Alpha</span>' +
      '<span>Bravo</span>' +
      '<span>Delta</span>';

    const rows = document.body.childNodes;
    reverseQuicksort(rows, 0, rows.length - 1);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0]).toEqualText('Delta');
    expect(sortedRows[1]).toEqualText('Charlie');
    expect(sortedRows[2]).toEqualText('Bravo');
    expect(sortedRows[3]).toEqualText('Alpha');
  });

  it('allows a specific selector to be used for comparing nodes', () => {
    // This is very confusing at the moment
    document.body.innerHTML =
      '<span id="1">Charlie</span>' +
      '<span id="3">Alpha</span>' +
      '<span id="4">Bravo</span>' +
      '<span id="2">Delta</span>';

    const rows = document.body.childNodes;
    const idSelector = el => el.id;
    reverseQuicksort(rows, 0, rows.length - 1, idSelector);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0].id).toEqual('4');
    expect(sortedRows[0]).toEqualText('Bravo');

    expect(sortedRows[1].id).toEqual('3');
    expect(sortedRows[1]).toEqualText('Alpha');

    expect(sortedRows[2].id).toEqual('2');
    expect(sortedRows[2]).toEqualText('Delta');

    expect(sortedRows[3].id).toEqual('1');
    expect(sortedRows[3]).toEqualText('Charlie');
  });
});
