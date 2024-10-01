import { Component, Element, Prop, h, Event, EventEmitter } from '@stencil/core';
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

  @Prop() sortdir?: string = null;

  @Prop() sortindex?: number = null;

  @Prop() sortable?: boolean = false;

   /**
   * Fires when the component is closed by clicking on the close icon. This fires only
   * when closeable is true.
   */
   @Event({
    composed: true,
    bubbles: true,
  })
  sortTable: EventEmitter;

  private observer: MutationObserver;

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  fireSort(e: MouseEvent) {
    const column = e.currentTarget as HTMLElement;
    const sortdir = column.dataset.sortdir;
    const index = column.dataset.rowindex;
    this.sortTable.emit({ index, sortdir });    
  }

  getSortIcon(index: number, row: number): HTMLVaIconElement {
    let icon: HTMLVaIconElement = null;
    // th must be in header
    if (this.sortable && row === 0) {
      // we have performed a sort on this column
      if (this.sortindex && this.sortindex === index) {
        const icon_name = this.sortdir == 'asc' ? 'arrow_downward' : 'arrow_upward';
        icon = <va-icon icon={icon_name} />
      }
      // we have not performed a sort on this column
      icon = <va-icon icon="sort_arrow" />
    }
    return icon;
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
            ?
            <th
              scope="row"
              data-rowindex={i}
              data-sortdir={i === this.sortindex ? this.sortdir : 'asc'}
              onClick={(e) => this.fireSort(e)}
            >
              {slot}{this.getSortIcon(i, row)}
            </th>
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
    const { tableTitle, tableType, stacked } = this;
    const classes = classnames({
      'usa-table': true,
      'usa-table--stacked': stacked,
      'usa-table--borderless': tableType === 'borderless',
    });
    return (
      <div>
      <table class={classes}>
        { tableTitle && <caption>{tableTitle}</caption> }
        <thead>{ this.makeRow(0) }</thead>
        <tbody id="va-table-body">
          { this.getBodyRows() }
        </tbody>
        </table>
      </div>
    )
  }
}
