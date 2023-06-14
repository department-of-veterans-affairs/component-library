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

/**
 * @componentName Table
 * @maturityCategory use
 * @maturityLevel best_practice
 */

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  headers: HTMLElement[] = null;

  @Element() el: HTMLElement;

  /**
   * The title of the table
   */
  @Prop() tableTitle: string;

  /**
   * The zero-based index of the column to sort by (Doesn't work in IE11). Optional.
   */
  @Prop() sortColumn?: number;

  /**
   * Whether the initial sort state will be descending or not.
   */
  @Prop() descending?: boolean = false;

  /**
   * The next direction to sort the rows
   */
  @State() sortAscending: boolean = !this.descending;

  private observer: MutationObserver;

  componentDidLoad() {
    // For IE11 compatibility. `el.children` renders booleans instead of html elements,
    // so instead we use `el.childNodes` and filter out nodes that aren't a proper tag
    const elementChildren = (el: HTMLElement) =>
      Array.from(el.childNodes).filter(node => node.nodeName !== '#text');

    const headerRow = Array.from(
      this.el.querySelectorAll('va-table-row'),
    )[0] as HTMLVaTableRowElement;

    this.headers = elementChildren(headerRow) as Array<HTMLElement>;
    const columns = [];

    /* eslint-disable i18next/no-literal-string */
    this.headers.forEach((item: HTMLVaTableRowElement) => {
      columns.push(item.textContent);
      item.setAttribute('role', 'columnheader');
      item.setAttribute('scope', 'col');
    });
    /* eslint-enable i18next/no-literal-string */

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

      const sortableHeader = this.headers[this.sortColumn];
      sortableHeader.childNodes.forEach(child => child.remove());
      sortableHeader.appendChild(button);

      this.handleSort();
    }

    // Store alignment classes by column index.
    const alignment = {};

    const handleCellAdjustments = () => {
      const rows = Array.from(this.el.querySelectorAll('va-table-row'))
        .filter((row) => row.slot !== 'headers') as Array<HTMLVaTableRowElement>;

      Array.from(rows).forEach((row, index) => {
        const cells = elementChildren(row);

        cells.forEach((cell: HTMLSpanElement, colNum) => {
          // Look at the first row of data to determine type of data in column
          // Right align columns with numeric data
          if (index === 0 && isNumeric(cell.textContent)) {
            // eslint-disable-next-line i18next/no-literal-string
            alignment[colNum] = 'text-align-right';
            (this.headers[colNum] as HTMLElement).classList.add(
              alignment[colNum],
            );
          }
          if (alignment[colNum]) {
            cell.classList.add(alignment[colNum]);
          }
  
          // This allows the responsive table in mobile view to display
          // a column header
          /* eslint-disable i18next/no-literal-string */
          cell.setAttribute('data-label', columns[colNum]);
          cell.setAttribute('role', 'cell');
        });
      });
    };

    handleCellAdjustments();

    // Watch for changes to the table body slot.
    const slot = this.el.shadowRoot.querySelectorAll('slot')[1].assignedElements()[0] as HTMLSlotElement;
    const callback = mutationList => {
      for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
          handleCellAdjustments();
        }
      }
    };

    this.observer = new MutationObserver(callback);
    this.observer.observe(slot, {
      childList: true,
      subtree: true,
    });
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
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
