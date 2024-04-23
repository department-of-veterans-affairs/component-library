import { Component, Element, Host, Prop, State, h } from '@stencil/core';
import { isNumeric } from '../../../utils/utils';
import ascendingIcon from '../../../assets/sort-arrow-up.svg?format=text';
import descendingIcon from '../../../assets/sort-arrow-down.svg?format=text';
import { quicksort, reverseQuicksort } from '../../../utils/dom-sort';
import classnames from 'classnames';

/**
 * The V1 version of this component expects `<va-table-row>` elements as children.
 * Children of each row element should be `<span>` elements. Table
 * semantics will be added and numeric columns will be right aligned.
 * 
 * The V3 version expects <span> elements as children where each span corresponds to a cell
 * in a flattened 2D table.
 */

/**
 * @componentName Table
 * @maturityCategory use
 * @maturityLevel best_practice
 */

@Component({
  tag: 'va-table-inner',
  styleUrl: 'va-table-inner.scss',
  shadow: true,
})
export class VaTableInner {
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
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /*
  * If uswds is true, the number of rows in the table
  */
  @Prop() rows?: number;

  /**
   * If uswds is true, the number of columns in the table
   */
  @Prop() cols?: number;

  /**
   * UNCOMMENT when we add more variations
   * If uswds is true, the type of table to be used
   */
  // @Prop() tableType?:
  //   | 'borderless'
  //   | 'striped' = 'borderless';

  /**
   * The next direction to sort the rows
   */
  @State() sortAscending: boolean = !this.descending;

  private observer: MutationObserver;

  componentDidLoad() {
    if (!this.uswds) {
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
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            handleCellAdjustments();
          }
        }
      };

      this.observer = new MutationObserver(callback);
      this.observer.observe(slot, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  componentDidUpdate() {
    if (!this.uswds) {
      // Update the sort icon
      if (this.sortColumn >= 0) {
        const icon = this.sortAscending ? descendingIcon : ascendingIcon;
        const button = this.el.querySelector('va-table-row[slot] button');
        const node = button.children[0];
        node.outerHTML = icon;
      }
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

  /**
   * Generate the markup for a table row where row is the zero-indexed row number
   */
  makeRow(row: number): HTMLTableRowElement {
    return (
      <tr>
        {Array.from({ length: this.cols }).map((_, i) => {
          const slotName = `va-table-slot-${row * this.cols + i}`;
          const slot = <slot name={slotName}></slot>
          return (i === 0 || row === 0)
            ? <th scope="row">{slot}</th>
            : <td>{slot}</td>
        })}
      </tr>
    )
  }

  /**
   * Generate the table body rows
   */
  getBodyRows(): HTMLTableRowElement[] {
    const rows = [];
    for (let i = 1; i < this.rows; i++) {
      rows.push(this.makeRow(i))
    }
    return rows;
  }

  render() {
    const { tableTitle, uswds } = this;
    
    if (uswds) {
      const classes = classnames({
        'usa-table': true,
        'usa-table--borderless': true,
      });
      return (
        <table class={classes}>
          { tableTitle && <caption>{tableTitle}</caption> }
          <thead>{ this.makeRow(0) }</thead>
          <tbody>
            { this.getBodyRows() }
          </tbody>
        </table>
      )
    } else {
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
}
