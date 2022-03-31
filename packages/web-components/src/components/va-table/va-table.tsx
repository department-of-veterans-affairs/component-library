import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { isNumeric } from '../../utils/utils';
import ascendingIcon from '../../assets/sort-arrow-up.svg?format=text';
import descendingIcon from '../../assets/sort-arrow-down.svg?format=text';
import { quicksort, reverseQuicksort } from '../../utils/dom-sort';

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

  /**
   * The title of the table
   */
  @Prop() tableTitle: string;

  /**
   * The zero-based index of the column to sort by. Optional.
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
    // For IE11 compatibility. `el.children` renders booleans instead of html elements,
    // so instead we use `el.childNodes` and filter out nodes that aren't a proper tag
    const elementChildren = (el: HTMLElement) =>
      Array.from(el.childNodes).filter(node => node.nodeName !== '#text');

    const [headerRow, ...rows] = Array.from(
      this.el.querySelectorAll('va-table-row'),
    );
    const headers = elementChildren(headerRow);
    const columns = [];

    headers.forEach((item: HTMLVaTableRowElement) => {
      columns.push(item.textContent);
      item.setAttribute('role', 'columnheader');
      item.setAttribute('scope', 'col');
    });

    if (this.sortColumn >= 0 && columns.length > this.sortColumn) {
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
      button.innerHTML = `${columns[this.sortColumn]}${icon}`;
      button.onclick = this.handleSort.bind(this);

      headers[this.sortColumn].childNodes.forEach(child => child.remove());
      headers[this.sortColumn].appendChild(button);

      this.handleSort();
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
    const cellSelector = row => row.children[this.sortColumn].textContent;
    // Starting at index 1 to skip the header row
    const sortingFunc = this.sortAscending ? quicksort : reverseQuicksort;
    sortingFunc(this.el.children, 1, this.el.children.length - 1, cellSelector);
    this.sortAscending = !this.sortAscending;
  }

  render() {
    const { tableTitle } = this;

    return (
      <Host role="table">
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
