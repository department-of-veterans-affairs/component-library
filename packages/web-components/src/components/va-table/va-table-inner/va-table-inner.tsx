import { Component, Element, Prop, h } from '@stencil/core';
import classnames from 'classnames';

/**
 * This component expects <span> elements as children where each span corresponds to a cell
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
  /*
   * The number of rows in the table
   */
  @Prop() rows?: number;

  /**
   * The number of columns in the table
   */
  @Prop() cols?: number;

  /**
   * The type of table to be used
   */
  @Prop() tableType?: 'borderless' = 'borderless';

  /**
   * If true convert to a stacked table when screen size is small
   */
  @Prop() stacked?: boolean = false;

  private observer: MutationObserver;

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  /**
   * Generate the markup for a table row where row is the zero-indexed row number
   */
  makeRow(row: number): HTMLTableRowElement {
    return (
      <tr>
        {Array.from({ length: this.cols }).map((_, i) => {
          const slotName = `va-table-slot-${row * this.cols + i}`;
          const slot = <slot name={slotName}></slot>;

          if (row === 0) {
            return <th scope="col">{slot}</th>;
          }

          if (i === 0) {
            return <th scope="row">{slot}</th>;
          }

          return <td>{slot}</td>;
        })}
      </tr>
    );
  }

  /**
   * Generate the table body rows
   */
  getBodyRows(): HTMLTableRowElement[] {
    const rows = [];
    for (let i = 1; i < this.rows; i++) {
      rows.push(this.makeRow(i));
    }
    return rows;
  }

  render() {
    const { tableTitle, tableType, stacked } = this;
    const classes = classnames({
      'usa-table': true,
      'usa-table--stacked': stacked,
      'usa-table--borderless': tableType === 'borderless',
    });
    return (
      <table class={classes}>
        {tableTitle && <caption>{tableTitle}</caption>}
        <thead>{this.makeRow(0)}</thead>
        <tbody id="va-table-body">{this.getBodyRows()}</tbody>
      </table>
    );
  }
}
