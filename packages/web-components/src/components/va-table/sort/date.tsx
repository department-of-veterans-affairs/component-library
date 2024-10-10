import { months } from './constants';
import { CompareFuncReturn, difference } from "./utils";


// conventional date or month only
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

export function dateSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    const aTime = getDateValue(a);
    const bTime = getDateValue(b);
    return difference(aTime, bTime, sortdir);
  }
}