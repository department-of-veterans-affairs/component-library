import { isNumeric } from '../../../utils/utils'
import { CompareFuncReturn, difference } from "./utils";
import { ordinals } from './constants';

// check if a string is numeric
export function _isNumeric(string: string): boolean {
  const value = cleanString(string);
  if (typeof value === 'number') {
    return true;
  }
  return isNumeric(value);
}

// make sure that strings with commas/$ (e.g. $2,400) or percent signs 
// (e.g. 87 %) or ordinals are treated like numbers
function cleanString(string: string): string | number {
  // treat empty string as smallest
  if (string === '') {
    return -Infinity;
  }
  const _string = string.toLowerCase();
  if (_string in ordinals) {
    return ordinals[_string];
  }
  return string.replace(/[$%,]|(th)|(st)|(rd)|(nd)/g, '');
}

export function numSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    return difference(+cleanString(a), +cleanString(b), sortdir);
  }
}