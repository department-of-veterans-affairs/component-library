export const uniqueId = (
  counter =>
  (str = '') =>
    `${str}${++counter}`
)(0);

export const isUndefined = val => val === undefined;

export function isString(str) {
  if (str != null && typeof str.valueOf() === 'string') {
    return true;
  }
  return false;
}