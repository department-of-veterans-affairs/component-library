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

        // Indicate missing cell content with "---"
        if (cell.innerText === '') {
          cell.innerText = '---';
        }

        // This allows the responsive table in mobile view to display
        // a column header
        cell.setAttribute('data-label', columns[colNum]);
        cell.setAttribute('role', 'cell');
      });
    });
  }

  private partition(rows: Element[], lo: number, hi: number): number {
    const pivot = rows[hi];
    const parent = rows[0].parentNode;

    let i = lo - 1;
    let smaller;
    let larger;
    for (const j = lo; j < hi; ) {
      if (rows[j] <= pivot) {
        debugger;
        i = i + 1;
        //swap rows[i] and rows[j]
        smaller = rows[j];
        larger = rows[i];
        console.log(larger);
        const oldPosition = larger.nextSibling;
        parent.insertBefore(smaller, larger);
        parent.insertBefore(larger, oldPosition);
      }
    }

    i = i + 1;
    // swap rows[i] with rows[hi]
    return i;
  }

  private quicksort(rows: Element[], lo: number, hi: number): void {
    if (lo >= hi || lo < 0) return;

    const p = this.partition(rows, lo, hi);

    this.quicksort(rows, lo, p - 1); // Left side
    this.quicksort(rows, p + 1, hi); // Right side
  }

  render() {
    const { tableTitle } = this;

    const handleSort = e => {
      console.log(e);
      console.log(this.rows);
      this.quicksort(this.rows, 0, this.rows.length - 1);
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
