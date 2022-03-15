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

function partition(rows: NodeList, lo: number, hi: number, selector): number {
  const pivot = selector(rows[Math.floor((lo + hi) / 2)]);

  let i = lo;
  let j = hi;

  while (i <= j) {
    while (selector(rows[i]) < pivot) {
      i++;
    }
    while (selector(rows[j]) > pivot) {
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
): void {
  if (lo >= hi || lo < 0) return;

  const p = partition(rows, lo, hi, selector);

  quicksort(rows, lo, p - 1, selector); // Left side
  quicksort(rows, p, hi, selector); // Right side
}
