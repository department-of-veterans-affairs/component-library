import { isNumeric } from '../../../utils/utils'
import { CompareFuncReturn, difference } from "./utils";
import { ordinals } from '../../../utils/constants';

const dateRegex = /^(\d{1,2}\/){1,2}(\d{2}|\d{4})$/;

// check if a string is numeric
export function _isNumeric(string: string): boolean {
  const value = cleanString(string);
  // isNumeric will return true for a string like 04/02/2024 but we want to treat it like a date
  if (dateRegex.test(string)) {
    return false
  }
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

// this function returns a function that sorts numbers and which can be passed to Array.sort
// the "sordir" argument controls whether the function that is returned sorts ascending or descending
export function numSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    return difference(+cleanString(a), +cleanString(b), sortdir);
  }
}