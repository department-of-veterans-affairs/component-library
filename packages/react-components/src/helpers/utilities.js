export const uniqueId = (
  counter =>
  (str = '') =>
    `${str}${++counter}`
)(0);

export const isUndefined = val => val === undefined;

export function isString(str) {
  return typeof str?.valueOf() === 'string';
}
