export const uniqueId = (
  counter =>
  (str = '') =>
    `${str}${++counter}`
)(0);

export function isString(str) {
  return typeof str?.valueOf() === 'string';
}
