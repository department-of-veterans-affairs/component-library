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

/**
 * A helper for quicksort. This function:
 *  1. Chooses a pivot in the middle of the list
 *  2. Moves the lower index higher until an item is greater than the pivot
 *  3. Moves the higher index lower until an item is less than the pivot
 *  4. Swaps those two items
 *  5. Continues until the lower and the higher indices have met/crossed
 * At the end of the funciton, all items from indices `lo` to the pivot index
 * will be smaller than the pivot item, and all items from the pivot index to
 * `hi` will be greater than the pivot position
 *
 * @param {NodeList} rows - A live NodeList of elements to sort
 * @param {number} lo - The lower bound index to use for the partition
 * @param {number} hi - The upper bound index to use for the partition
 * @param {Function} selector - An optional selector to use for selecting values for comparison
 * @param {Function} comparator - An optional comparator to use for comparing elements
 */
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
 * @param {Function} selector - An optional selector to use for selecting values for comparison
 * @param {Function} comparator - An optional comparator to use for comparing elements
 */
export function quicksort(
  rows: NodeList,
  lo: number,
  hi: number,
  selector = row => row.textContent,
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
  selector = row => row.textContent,
): void {
  quicksort(rows, lo, hi, selector, (a, b) => a > b);
}
