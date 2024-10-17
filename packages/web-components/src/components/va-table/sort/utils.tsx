import { numSort, _isNumeric as isNumeric } from './numerical';
import { dateSort, isValidDate } from './date';
import { alphaSort } from './alpha';

export type CompareFuncReturn = (a: string, b: string) => number;

// used in numerical or date sorts
export function difference(a: number, b: number, sortdir: string): number {
  return sortdir === 'ascending' ? a - b : b - a;
}

// return the sort function for the data type of the sort
function _getCompareFunc(a: string, sortdir: string) {
  let func: CompareFuncReturn;
  if (isValidDate(a)) {
    func = dateSort(sortdir);
  } else if (isNumeric(a)) {
    func = numSort(sortdir);
  } else {
    func = alphaSort.bind(this)(sortdir);
  }
  return func;
}

// for the first non empty piece of data in a column, find the appropriate sort function
// if all values are empty strings, return null to signify do not sort 
export function getCompareFunc(rows: Element[], index: number, sortdir: string): CompareFuncReturn | null {
  for (const row of rows) {
    const cellContents = row.children[index].innerHTML.trim();
    console.log('the cell contains...', cellContents);
    if (cellContents !== '') {
      return _getCompareFunc.bind(this)(cellContents, sortdir);
    }
  }
  return null;
}