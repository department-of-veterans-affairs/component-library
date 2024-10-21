import { months } from '../../../utils/constants';
import { CompareFuncReturn, difference } from "./utils";

// conventional date representation or month only will be valid
export function isValidDate(string: string): boolean {
  const date = new Date(string);
  return !isNaN(date.getTime()) || !!months[string.toLowerCase()];
}

// get a numerical representation for a date
function getDateValue(string: string): number {
  // treat empty string as earliest date
  if (string === '') {
    return -Infinity;
  }
  const month = months[string.toLowerCase()];
  return month ? month : new Date(string).getTime();
}

// this function returns a function that sorts date strings and which can be passed to Array.sort
// the "sordir" argument controls whether the function that is returned sorts ascending or descending
export function dateSort(sortdir: string): CompareFuncReturn {
  return function datesSort(a: string, b: string): number {
    const aTime = getDateValue(a);
    const bTime = getDateValue(b);
    return difference(aTime, bTime, sortdir);
  }
}