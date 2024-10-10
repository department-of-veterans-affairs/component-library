import { CompareFuncReturn } from "./utils";

export function alphaSort(sortdir: string): CompareFuncReturn {
  let locale = this.el.getAttribute('lang');
  locale = !!locale ? locale : 'en-US';
  return function (a: string, b: string): number {
    const isAsc = sortdir === 'ascending';
    const _a = isAsc ? a : b;
    const _b = isAsc ? b : a;
    return new Intl.Collator(locale, { sensitivity: 'base' }).compare(_a, _b);
  }
}