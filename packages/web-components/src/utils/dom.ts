/**
 * Swap the DOM elements at each index
 */
function swapChildren(rows: Element[], i: number, j: number): void {
  const parent = rows[0].parentNode;
  const one = rows[j];
  const two = rows[i];
  const temp = one.nextSibling;
  parent.insertBefore(one, two);
  parent.insertBefore(two, temp);
}

function partition(rows: Element[], lo: number, hi: number, selector): number {
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

export function quicksort(
  rows: Element[],
  lo: number,
  hi: number,
  selector = row => row,
): void {
  if (lo >= hi || lo < 0) return;

  const p = partition(rows, lo, hi, selector);

  quicksort(rows, lo, p - 1, selector); // Left side
  quicksort(rows, p + 1, hi, selector); // Right side
}
