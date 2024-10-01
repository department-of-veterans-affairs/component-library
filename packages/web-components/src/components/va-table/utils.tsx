import { isNumeric, isValidDate } from '../../utils/utils'

type CompareFuncReturn = (a: string, b: string) => number

function alphaSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    if (a === b) return 0
    else if (sortdir === 'asc' ? a > b : a < b) return -1
    return 1
  }
}

function difference(a: number, b: number, sortdir: string): number {
  return sortdir === 'asc' ? a - b : b - a;
}

export function dateSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    const aTime = new Date(a).getTime();
    const bTime = new Date(b).getTime();
    return difference(aTime, bTime, sortdir);
  }
}

export function numSort(sortdir: string): CompareFuncReturn {
  return function (a: string, b: string): number {
    return difference(Number(a), Number(b), sortdir);
  }
}

export function getCompareFunc(a: string, sortdir: string) {
  let func: CompareFuncReturn;
  if (isNumeric(a)) {
    func = numSort(sortdir);
  } else if (isValidDate(a)) {
    func = dateSort(sortdir);
  } else {
    func = alphaSort(sortdir)
  }
  return func;
}
