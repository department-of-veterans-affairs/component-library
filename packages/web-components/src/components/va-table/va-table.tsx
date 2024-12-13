/* eslint-disable i18next/no-literal-string */
import {
  Component,
  Host,
  Element,
  h,
  State,
  Prop,
  Listen
} from '@stencil/core';

import { getCompareFunc } from './sort/utils';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.scss',
  shadow: true,
})
export class VaTable {
  /**
  * This is a wrapper component whose job is to marshal the cells in slotted va-table-rows
  * through DOM manipulation for projection into the slots of the va-table-inner component for rendering
  */
  @Element() el: HTMLElement;

  /**
   * The title of the table
   */
  @Prop() tableTitle?: string;

  /**
   * The type of table
   */
  @Prop() tableType?: 'borderless' = 'borderless';

  /**
   * Convert to a stacked table when screen size is small
   * True by default, must specify if false if this is unwanted
   */
  @Prop() stacked?: boolean = true;


  /**
   * Is the table sortable
   */
  @Prop() sortable: boolean = false;

  // The number of va-table-rows
  @State() rows: number;

  // The number of spans in each va-table-row
  @State() cols: number;

  // An array containing all the cells (i.e. spans) that will be inserted into
  // the slots in the generated va-table-inner
  @State() cells: HTMLSpanElement[] = null;

  private observer: MutationObserver;

  /**
   * Generate an array of span elements that are inside
   * a particular va-table-row element
   */
  getCellsInRow(row: Element): HTMLSpanElement[] {
    const children = row.querySelectorAll('span');
    const cells = Array.from(children);
    if (!this.cols) {
      this.cols = cells.length;
    }
    return cells;
  }

  /**
   * Generate an array holding the va-table-rows from the component's slot
   */
  getRows(): Element[] {
    const rows = Array.from(this.el.querySelectorAll('va-table-row'));
    // remove the role attr for each va-table-row; this line can be deleted when V1 is removed
    rows.forEach(row => row.removeAttribute('role'));
    if (!this.rows) {
      this.rows = rows.length;
    }
    return rows;
  }

  /**
   * Generate an array of all the spans in all the va-table-rows
   * in the slot in order starting with row 0, column 0.
   */
  getAllCells(rows: Element[] = this.getRows()): void {
    const cells: HTMLSpanElement[] = [];
    let count = 0;
    for (const row of rows) {
      const cellsInRow = this.getCellsInRow(row);
      cellsInRow.forEach((cell) => {
        cell.setAttribute('slot', `va-table-slot-${count}`);
        count++;
      });

      cells.push(...cellsInRow);
    }
    this.cells = cells;
  }


  /**
   * Generate a DocumentFragment that holds the cells
   * to be slotted into a va-table-inner component
   */
  makeFragment(): DocumentFragment {
    const frag = document.createDocumentFragment();
    this.cells.forEach(cell => {
      frag.appendChild(cell.cloneNode(true));
    });
    return frag;
  }

  /**
   * Generate a va-table-inner to add to the DOM
   */
  makeVATable(sortdir: string, sortindex: number): HTMLVaTableInnerElement {
    const vaTable = document.createElement('va-table-inner');
    // add attributes
    vaTable.setAttribute('rows', `${this.rows}`);
    vaTable.setAttribute('cols', `${this.cols}`);
    // a sortable table should never stack
    vaTable.setAttribute('stacked', (this.stacked && !this.sortable) ? "true" : "false");
    vaTable.setAttribute('sortable', `${this.sortable}`);
    // we rebuild the inner table after a sort
    if (this.sortable && sortdir && sortindex) {
      vaTable.dataset.sortdir = sortdir;
      vaTable.dataset.sortindex = `${sortindex}`;
    }

    if (this.tableTitle) {
      vaTable.setAttribute('table-title', this.tableTitle);
    }

    if (this.tableType) {
      vaTable.setAttribute('table-type', this.tableType);
    }

    //make a fragment containing all the cells, one for each slot
    const frag = this.makeFragment();
    vaTable.appendChild(frag);
    return vaTable;
  }

  /**
   * remove previous va-table-inner before rendering with new or sorted data
   */
  resetVaTableInner() {
    const oldTable = this.el.querySelector('va-table-inner');
    if (oldTable) {
      oldTable.remove();
      this.rows = null;
      this.cols = null;
      this.cells = null;
    }
  }

  watchForDataChanges() {
    // Watch for changes to the slot.
    const row = this.el.querySelectorAll('va-table-row')[1] as HTMLVaTableRowElement;
    const callback = () => {
      this.resetVaTableInner()
      this.addVaTableInner();
    }
    this.observer = new MutationObserver(callback);
    this.observer.observe(row, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  // Add a va-table-inner instance to the DOM
  addVaTableInner(sortdir: string = null, sortindex: number = null) {
    // generate a list of all table cells
    this.getAllCells();
    // create a va-table-inner with the cells in the slots
    const vaTable = this.makeVATable(sortdir, sortindex);
    // add the table to the component
    this.el.appendChild(vaTable);
  }

  componentWillLoad() {
    // add a va-table-inner instance to the DOM
    this.addVaTableInner();
    // watch for changes to content
    this.watchForDataChanges();
  }

  // event only fires during a sort
  @Listen('sortTable')
  doSort(e: CustomEvent) {
    e.stopPropagation();
    const { index, sortdir } = e.detail;
    const [header, ...rows] = this.getRows();
    // get function to use in sort
    const compareFunc = getCompareFunc.bind(this)(rows, index, sortdir);

    // only do sort if sortable data in column
    if (compareFunc !== null) {
      rows.sort((a: Element, b: Element) => {
        const _a = a.children[index].innerHTML.trim();
        const _b = b.children[index].innerHTML.trim();
        return compareFunc(_a, _b);
      });
      const sortedDataRows = [header, ...rows];
      // clear the inner table
      this.resetVaTableInner();
      // replace children with the newly sorted va-table-row elements
      this.el.replaceChildren(...sortedDataRows);
      // render the table with details for next possible sort
      this.addVaTableInner(sortdir === 'ascending' ? 'descending' : 'ascending', index);
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    )
  }
}
