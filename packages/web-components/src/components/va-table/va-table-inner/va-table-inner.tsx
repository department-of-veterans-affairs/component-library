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

  fireSort(e: Event) {
    const target = e.currentTarget as HTMLElement;
    const th = target.closest('th');
    const sortdir = th.dataset.sortdir;
    const index = th.dataset.rowindex;
    this.sortTable.emit({ index, sortdir });    
  }

  handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.fireSort(e);
    }
  }

  getSortIcon(index: number, row: number): HTMLVaIconElement {
    let icon: HTMLVaIconElement = null;
    // th is in header
    if (this.sortable && row === 0) {
      // we just performed a sort on this column
      if (this.sortindex !== null && this.sortindex === index) {
        const icon_name = this.sortdir == 'ascending' ? 'arrow_upward' : 'arrow_downward';
        icon = <va-icon icon={icon_name} size={3} />
      // we did not just perform a sort on this column
      } else {
        icon = <va-icon icon="sort_arrow" size={3} />
      }
      return (
        <span
          tabIndex={0}
          onClick={(e) => this.fireSort(e)}
          onKeyDown={(e) => this.handleKeyDown(e)}
        >
          {icon}
        </span>
      )
    } else {
      return null;
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
          const thClass = classnames({
            'th-sort-header': row === 0 && this.sortindex === i
          });
          const dataClass = classnames({
            'sorted-data': row > 0 && this.sortindex === i,
          });
          return (i === 0 || row === 0)
            ?
            <th
              scope="row"
              data-rowindex={i}
              data-sortdir={i === this.sortindex ? this.sortdir : 'ascending'}
              class={`${thClass} ${dataClass}`}
            >
              <div>{slot}{this.getSortIcon(i, row)}</div>
            </th>
            : <td class={dataClass}>{slot}</td>
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

  /**
   * we must update the table after render due to content being projected into slots
   * 1. add aria-labels to the th elements in the theader
   * 2. focus on the sort icon that was just clicked
   * 3. update screen reader text
   */
  componentDidRender() {
    if (this.sortable) {
      const slots = this.el.shadowRoot.querySelectorAll('slot');
      Array.from(slots).slice(0, this.cols).forEach((slot, i) => {
        //get all nodes in the slot
        const assignedNodes = slot.assignedNodes({ flatten: true });
        //get the text in the nodes
        const content = assignedNodes
          .map(node => node.textContent?.trim())
          .filter(Boolean)
          .join(' ');
        
        const th = slot.closest('th');
        const direction = th.dataset.sortdir;
        let sortInfo: string;

        // we just sorted by the column that corresponds to the index
        if (this.sortindex !== null && this.sortindex === i) {
          // focus on the sort icon that we just clicked
          setTimeout(() => {
            th.querySelector('span').focus();
          }, 0);
          sortInfo = `currently sorted ${direction}`;
          // update the aria-live section too
          const tableInfo = this.tableTitle ? `The table named "${this.tableTitle}"` : 'This table';
          this.el.shadowRoot.querySelector('table + div').innerHTML = `${tableInfo} is now sorted by ${content} in ${direction} order`;
        
        // we did not just sort by the column that corresponds to the index
        } else {
          sortInfo = 'currently unsorted';
        }

        const ariaLabel = `${content}, sortable column, ${sortInfo}`;
        th.setAttribute('aria-label', ariaLabel);
      });
    }
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
        <div class="usa-sr-only" aria-live="polite"></div>
      </div>
    )
  }
}
