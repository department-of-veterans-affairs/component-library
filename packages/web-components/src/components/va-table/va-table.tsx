import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { isNumeric } from '../../utils/utils';
import ascendingIcon from '../../assets/sort-arrow-up.svg?format=text';
import descendingIcon from '../../assets/sort-arrow-down.svg?format=text';
import { quicksort, reverseQuicksort } from '../../utils/dom-sort';

// For IE11 compatibility. `el.children` renders booleans instead of html elements,
// so instead we use `el.childNodes` and filter out nodes that aren't a proper tag
const elementChildren = (el: HTMLElement) =>
  Array.from(el.childNodes).filter(node => node.nodeName !== '#text');

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
  alignment: object = {};
  columns: string[] = [];
  headers: HTMLElement[] = null;

  @Element() el: HTMLElement;

  /**
   * The title of the table
   */
  @Prop() tableTitle: string;

  /**
   * The zero-based index of the column to sort by (Doesn't work in IE11). Optional.
   */
  @Prop() sortColumn: number;

  /**
   * Whether the initial sort state will be descending or not.
   */
  @Prop() descending: boolean = false;

  /**
   * The next direction to sort the rows
   */
  @State() sortAscending: boolean = !this.descending;

  componentDidLoad() {
    const headerRow = Array.from(
      this.el.querySelectorAll('va-table-row'),
    )[0];
    this.headers = elementChildren(headerRow) as Array<HTMLElement>;

    this.headers.forEach((item: HTMLVaTableRowElement, colNum) => {
      item.setAttribute('role', 'columnheader');
      item.setAttribute('scope', 'col');
      (item as HTMLElement).classList.add(this.alignment[colNum]);
    });

    if (this.sortColumn >= 0 && this.columns.length > this.sortColumn) {
      const icon = this.sortAscending ? ascendingIcon : descendingIcon;
      const button = document.createElement('button');
      button.setAttribute(
        'aria-label',
        `sort data by ${this.sortAscending ? 'descending' : 'ascending'}`,
      );
      button.classList.add(
        'vads-u-padding--0',
        'vads-u-margin--0',
        'vads-u-text-decoration--none',
        'vads-u-font-weight--bold',
        'vads-u-background-color--gray-lightest',
        'vads-u-color--base',
      );
      button.innerHTML = `${this.columns[this.sortColumn]}${icon}`;
      button.onclick = this.handleSort.bind(this);

      const sortableHeader = this.headers[this.sortColumn];
      sortableHeader.childNodes.forEach(child => child.remove());
      sortableHeader.appendChild(button);

      this.handleSort();
    }
  }

  componentDidUpdate() {
    // Update the sort icon
    if (this.sortColumn >= 0) {
      const icon = this.sortAscending ? descendingIcon : ascendingIcon;
      const button = this.el.querySelector('va-table-row[slot] button');
      const node = button.children[0];
      node.outerHTML = icon;
    }
  }

  private handleSort(): void {
    const sortableHeader = this.headers[this.sortColumn];
    const cellSelector = row => row.children[this.sortColumn].textContent;

    // Starting at index 1 to skip the header row
    const sortingFunc = this.sortAscending ? quicksort : reverseQuicksort;
    sortingFunc(this.el.children, 1, this.el.children.length - 1, cellSelector);
    sortableHeader.setAttribute(
      'aria-sort',
      this.sortAscending ? 'ascending' : 'descending',
    );
    this.sortAscending = !this.sortAscending;
  }

  private handleHeaderSlotChange(e): void {
    const headers = elementChildren(e.target.assignedElements()[0]);

    headers.forEach((header: HTMLSpanElement) => {
      this.columns.push(header.textContent);
    });
  }

  private handleSlotChange(e): void {
    const rows = e.target.assignedElements();

    rows.forEach((row: HTMLVaTableRowElement, index) => {
      const cells = elementChildren(row);

      cells.forEach((cell: HTMLSpanElement, colNum) => {
        // Look at the first row of data to determine type of data in column
        // Right align columns with numeric data
        if (index === 0 && isNumeric(cell.textContent)) {
          this.alignment[colNum] = 'medium-screen:vads-u-text-align--right';
        }
      
        if (this.alignment[colNum]) {
          cell.classList.add(this.alignment[colNum]);
        }

        // This allows the responsive table in mobile view to display
        // a column header
        cell.setAttribute('data-label', this.columns[colNum]);
        cell.setAttribute('role', 'cell');
      });
    });
  }

  render() {
    const { tableTitle } = this;

    return (
      <Host role="table">
        {tableTitle && <caption>{tableTitle}</caption>}
        <thead>
          <slot name="headers" onSlotchange={e => this.handleHeaderSlotChange(e)}></slot>
        </thead>

        <tbody>
          <slot onSlotchange={e => this.handleSlotChange(e)}></slot>
        </tbody>
      </Host>
    );
  }
}
