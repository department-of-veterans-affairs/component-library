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

export const range = (start, end, increment) => {
  // if the end is not defined...
  const isEndDef = typeof end !== 'undefined';
  // ...the first argument should be the end of the range...
  end = isEndDef ? end : start;
  // ...and 0 should be the start
  start = isEndDef ? start : 0;

  // if the increment is not defined, we could need a +1 or -1
  // depending on whether we are going up or down
  if (typeof increment === 'undefined') {
    increment = Math.sign(end - start);
  }

  // calculating the lenght of the array, which has always to be positive
  const length = Math.abs((end - start) / (increment || 1));

  // In order to return the right result, we need to create a new array
  // with the calculated length and fill it with the items starting from
  // the start value + the value of increment.
  const { result } = Array.from({ length }).reduce(
    ({ result, current }) => ({
      // append the current value to the result array
      result: [...result, current],
      // adding the increment to the current item
      // to be used in the next iteration
      current: current + increment,
    }),
    { current: start, result: [] },
  );

  return result;
};
