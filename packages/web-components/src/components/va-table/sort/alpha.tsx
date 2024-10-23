import { CompareFuncReturn } from "./utils";

// this function returns a function that sorts strings alphabetically and which can be passed to Array.sort
// the "sordir" argument controls whether the function that is returned sorts ascending or descending
// strings will be sorted alphabetically using local language if "lang" attribute added to the va-table element, otherwise defaults to en-us
export function alphaSort(sortdir: string): CompareFuncReturn {
  let locale = this?.el?.getAttribute('lang');
  locale = !!locale ? locale : 'en-US';
  return function alphabeticalSort(a: string, b: string): number {
    const isAsc = sortdir === 'ascending';
    const _a = isAsc ? a : b;
    const _b = isAsc ? b : a;
    return new Intl.Collator(locale, { sensitivity: 'base' }).compare(_a, _b);
  }
}