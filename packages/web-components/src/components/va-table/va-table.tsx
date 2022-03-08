import { Component, Element, Host, Prop, h } from '@stencil/core';
import { isNumeric } from '../../utils/utils';

/**
 * This component expects `<va-table-row>` elements as children.
 * Children of each row element should be `<span>` elements. Table
 * semantics will be added and numeric columns will be right aligned.
 */
@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Element() el: HTMLElement;

  rows: HTMLElement[] = null;

  /**
   * The title of the table
   */
  @Prop() tableTitle: string;

  @Prop() sortColumn: number;

  componentDidLoad() {
    // For IE11 compatibility. `el.children` renders booleans instead of html elements,
    // so instead we use `el.childNodes` and filter out nodes that aren't a proper tag
    const elementChildren = (el: HTMLElement) =>
      Array.from(el.childNodes).filter(node => node.nodeName !== '#text');

    const [headerRow, ...rows] = Array.from(
      this.el.querySelectorAll('va-table-row'),
    );
    const headers = elementChildren(headerRow);
    const columns = [];

    this.rows = rows;
    headers.forEach((item: HTMLVaTableRowElement) => {
      columns.push(item.textContent);
      item.setAttribute('role', 'columnheader');
      item.setAttribute('scope', 'col');
    });

    if (this.sortColumn) {
      const button = document.createElement('button');
      button.textContent = headers[this.sortColumn].textContent;

      headers[this.sortColumn].childNodes.forEach(child => child.remove());
      headers[this.sortColumn].appendChild(button);
      button.classList.add(
        'vads-u-padding--0',
        'vads-u-text-decoration--none',
        'vads-u-font-weight--bold',
        'vads-u-background-color--gray-lightest',
        'vads-u-color--base',
      );
    }

    // Store alignment classes by column index.
    const alignment = {};
    Array.from(rows).forEach((row, index) => {
      const cells = elementChildren(row);

      cells.forEach((cell: HTMLSpanElement, colNum) => {
        // Look at the first row of data to determine type of data in column
        // Right align columns with numeric data
        if (index === 0 && isNumeric(cell.textContent)) {
          alignment[colNum] = 'medium-screen:vads-u-text-align--right';
          (headers[colNum] as HTMLElement).classList.add(alignment[colNum]);
        }
        if (alignment[colNum]) {
          cell.classList.add(alignment[colNum]);
        }

        // This allows the responsive table in mobile view to display
        // a column header
        cell.setAttribute('data-label', columns[colNum]);
        cell.setAttribute('role', 'cell');
      });
    });
  }

  /**
   * Swap the DOM elements at each index
   */
  private swap(rows: Element[], i: number, j: number): void {
    const parent = rows[0].parentNode;
    const one = rows[j];
    const two = rows[i];
    const temp = one.nextSibling;
    parent.insertBefore(one, two);
    parent.insertBefore(two, temp);
  }

  private partition(rows: Element[], lo: number, hi: number, selector): number {
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
        this.swap(rows, i, j);
        i++;
        j--;
      }
    }

    return i;
  }

  private quicksort(
    rows: Element[],
    lo: number,
    hi: number,
    selector = row => row,
  ): void {
    if (lo >= hi || lo < 0) return;

    const p = this.partition(rows, lo, hi, selector);

    this.quicksort(rows, lo, p - 1, selector); // Left side
    this.quicksort(rows, p + 1, hi, selector); // Right side
  }

  render() {
    const { tableTitle } = this;

    const handleSort = () => {
      const yearCell = row => row.children[2].textContent;
      this.quicksort(this.rows, 0, this.rows.length - 1, yearCell);
      this.rows = Array.from(
        this.el.querySelectorAll('va-table-row:not([slot])'),
      );
    };

    return (
      <Host role="table" onClick={handleSort}>
        {tableTitle && <caption>{tableTitle}</caption>}
        <thead>
          <slot name="headers"></slot>
        </thead>

        <tbody>
          <slot></slot>
        </tbody>
      </Host>
    );
  }
}
