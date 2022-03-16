/**
 * Swap the DOM elements at each index
 */
function swapChildren(rows: NodeList, i: number, j: number): void {
  const parent = rows[0].parentNode;
  const one = rows[j];
  const two = rows[i];
  const temp = one.nextSibling;
  parent.insertBefore(one, two);
  parent.insertBefore(two, temp);
}

function partition(
  rows: NodeList,
  lo: number,
  hi: number,
  selector: Function,
  comparator: Function,
): number {
  const pivot = selector(rows[Math.floor((lo + hi) / 2)]);

  let i = lo;
  let j = hi;

  while (i <= j) {
    // By default, selector(rows[i]) < pivot
    while (comparator(selector(rows[i]), pivot)) {
      i++;
    }
    // By default, selector(rows[j]) > pivot
    while (comparator(pivot, selector(rows[j]))) {
      j--;
    }

    if (i <= j) {
      swapChildren(rows, i, j);
      i++;
      j--;
    }
  }

  return i;
}

/**
 * Sorts a NodeList in place.
 * @param {NodeList} rows - A live NodeList of elements to sort
 * @param {number} lo - The lower bound index to use for the partition
 * @param {number} hi - The upper bound index to use for the partition
 * @param {Function} selector - An optional selector to use for comparing elements
 */
export function quicksort(
  rows: NodeList,
  lo: number,
  hi: number,
  selector = row => row,
  comparator = (a, b) => a < b,
): void {
  if (lo >= hi || lo < 0) return;

  const p = partition(rows, lo, hi, selector, comparator);

  quicksort(rows, lo, p - 1, selector, comparator); // Left side
  quicksort(rows, p, hi, selector, comparator); // Right side
}

/**
 * Run quicksort with the `comparator` argument using a greater than operator
 * instead of the default less than
 */
export function reverseQuicksort(
  rows: NodeList,
  lo: number,
  hi: number,
  selector = row => row,
): void {
  quicksort(rows, lo, hi, selector, (a, b) => a > b);
}
