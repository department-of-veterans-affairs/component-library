import {
  Component,
  Element,
  Prop,
  h,
  Event,
  EventEmitter,
  State,
} from '@stencil/core';
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

  /**
   * Is this a sortable table
   */
  @Prop() sortable?: boolean = false;

  /**
   * If sortable is true, the direction of next sort for the column that was just sorted
   */
  @State() sortdir?: string = null;

  /**
   * If sortable is true, the index of the column that was just sorted
   */
  @State() sortindex?: number = null;

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
        const icon_name =
          this.sortdir == 'descending' ? 'arrow_upward' : 'arrow_downward';
        icon = <va-icon icon={icon_name} size={3} />;
        // we did not just perform a sort on this column
      } else {
        icon = <va-icon icon="sort_arrow" size={3} />;
      }
      return (
        <button
          tabIndex={0}
          onClick={e => this.fireSort(e)}
          onKeyDown={e => this.handleKeyDown(e)}
        >
          {icon}
        </button>
      );
    } else {
      return null;
    }
  }

  /**
   * escapes html entities and returns a string
   * ex: 'Hall &amp; Oates' returns 'Hall & Oates'
   * @param innerHTML string of html
   * @returns parsed string escaped of html entities
   */
  parseHTMLToString (innerHTML:string) {
    let parser = new DOMParser();

    return parser.parseFromString(innerHTML, 'text/html').documentElement.textContent;
  }

  /**
   * Generate the markup for a table row where row is the zero-indexed row number
   */
  makeRow(row: number): HTMLTableRowElement {
    // Ensure first row <th> are col scoped for screen reader usability
    let scopeDimension = (row === 0 && 'col') || 'row';

    return (
      <tr>
        {Array.from({ length: this.cols }).map((_, i) => {
          const slotName = `va-table-slot-${row * this.cols + i}`;
          const slot = <slot name={slotName}></slot>;
          const header = this.parseHTMLToString(this.el.querySelector(
            `[slot="va-table-slot-${i}"]`,
          ).innerHTML);
          const dataSortActive = row > 0 && this.sortindex === i ? true : false;
          return i === 0 || row === 0 ? (
            <th
              scope={scopeDimension}
              data-sortable
              data-sort-active={dataSortActive}
              data-label={header}
              data-rowindex={i}
              data-sortdir={i === this.sortindex ? this.sortdir : 'ascending'}
            >
              {slot}
              {this.getSortIcon(i, row)}
            </th>
          ) : (
            <td data-label={header} data-sort-active={dataSortActive}>
              {slot}
            </td>
          );
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

  // only runs if sortable is true
  // get the text in a th of a sortable table
  getSortColumnText(slot: HTMLSlotElement): string {
    //get all nodes in the slot
    const assignedNodes = slot.assignedNodes({ flatten: true });
    //get the text in the nodes
    return assignedNodes
      .map(node => node.textContent?.trim())
      .filter(Boolean)
      .join(' ');
  }

  // only runs if sortable is true
  // update the aria-label for a th after a sort
  updateThAriaLabel(
    th: HTMLTableCellElement,
    thSorted: boolean,
    currentSortDirection: string,
    content: string,
  ) {
    let thSortInfo: string;
    if (thSorted) {
      thSortInfo = `currently sorted ${currentSortDirection}`;
      th.setAttribute('aria-sort', currentSortDirection);
    } else {
      thSortInfo = 'currently unsorted';
    }
    const ariaLabel = `${content}, sortable column, ${thSortInfo}`;
    th.setAttribute('aria-label', ariaLabel);
  }

  // only runs if sortable is true
  // update the title info on span clicked to sort and focus it
  updateSpan(
    th: HTMLTableCellElement,
    thSorted: boolean,
    nextSortDirection: string,
    content: string,
  ) {
    const button = th.querySelector('button');
    let spanSortInfo = thSorted ? `Click to sort by ${content} in ${nextSortDirection} order` : `Click to sort by ${content} in ascending order`;
    button.setAttribute('title', spanSortInfo);
    if (thSorted) {
      setTimeout(() => {
        button.focus();
      }, 0);
    }
  }

  // only runs if sortable is true
  // if a sort has occurred update the sr text to reflect this
  updateSRtext(
    thSorted: boolean,
    content: string,
    currentSortDirection: string,
  ) {
    if (thSorted) {
      const tableInfo = !!this.tableTitle
        ? `The table named "${this.tableTitle}"`
        : 'This table';
      this.el.shadowRoot.querySelector(
        'table + div',
      ).innerHTML = `${tableInfo} is now sorted by ${content} in ${currentSortDirection} order`;
    }
  }

  // only runs if sortable is true
  // for a given th, get the current and the next sort directions
  getSortDirections(): {
    currentSortDirection: string;
    nextSortDirection: string;
  } {
    const nextSortDirection = !!this.sortdir ? this.sortdir : 'ascending';
    const currentSortDirection =
      nextSortDirection === 'ascending' ? 'descending' : 'ascending';
    return { currentSortDirection, nextSortDirection };
  }

  // for a sortable table set the state to take into account previous sort
  componentWillLoad() {
    if (this.sortable) {
      this.sortindex = this.el.dataset.sortindex
        ? +this.el.dataset.sortindex
        : this.sortindex;
      this.sortdir = this.el.dataset.sortdir
        ? this.el.dataset.sortdir
        : this.sortdir;
    }
  }

  /**
   * we must update the table after render due to content being projected into slots
   * 1. add aria-labels to the th elements in the theader
   * 2. update title info and focus on span that was just clicked
   * 3. update screen reader text
   */
  componentDidRender() {
    if (this.sortable) {
      const slots = this.el.shadowRoot.querySelectorAll('slot');
      // loop through slots inside the table header ths
      Array.from(slots)
        .slice(0, this.cols)
        .forEach((slot, i) => {
          const th = slot.closest('th');

          // was this th just sorted
          const thSorted = this.sortindex !== null && this.sortindex === i;

          // text content of this th
          const content = this.getSortColumnText(slot);

          // get the sort directions of this th
          const { currentSortDirection, nextSortDirection } =
            this.getSortDirections();

          // update aria-label of th to reflect sort
          this.updateThAriaLabel(th, thSorted, currentSortDirection, content);

          // update title info of span inside th to reflect sort
          this.updateSpan(th, thSorted, nextSortDirection, content);

          // update sr text to reflect sort
          setTimeout(()=>{
            this.updateSRtext(thSorted, content, currentSortDirection);
          },100)
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
          {tableTitle && <caption>{tableTitle}</caption>}
          <thead>{this.makeRow(0)}</thead>
          <tbody id="va-table-body">{this.getBodyRows()}</tbody>
        </table>
        <div class="usa-sr-only" aria-live="polite"></div>
      </div>
    );
  }
}
