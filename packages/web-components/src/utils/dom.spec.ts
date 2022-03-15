import { quicksort } from './dom';

describe('quicksort', () => {
  it('sorts DOM elements by their value', () => {
    // Set up our document body
    document.body.innerHTML =
      '<span>Charlie</span>' +
      '<span>Alpha</span>' +
      '<span>Bravo</span>' +
      '<span>Delta</span>';

    const rows = document.body.childNodes;
    quicksort(rows, 0, rows.length - 1, el => el.textContent);

    const sortedRows = Array.from(document.querySelectorAll('span'));
    expect(sortedRows[0]).toEqualText('Alpha');
    expect(sortedRows[1]).toEqualText('Bravo');
    expect(sortedRows[2]).toEqualText('Charlie');
    expect(sortedRows[3]).toEqualText('Delta');
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
