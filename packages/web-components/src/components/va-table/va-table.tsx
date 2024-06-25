/* eslint-disable i18next/no-literal-string */
import { 
  Component,
  Host, 
  Element,
  h,
  State,
  Prop
} from '@stencil/core';


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
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;
  
  /**
   * The title of the table
   */
  @Prop() tableTitle?: string;

  /**
   * If uswds is true, the type of table
   */
  @Prop() tableType?: 'borderless' = 'borderless';

  /**
   * If true convert to a stacked table when screen size is small
   */
  @Prop() stacked?: boolean = false;
  
  
  /// DELETE below props once V1 table removed ///

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

  /// END props to delete ///
  
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
  getAllCells(): void {
    const cells: HTMLSpanElement[] = [];
    let count = 0;
    for (const row of this.getRows()) {
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
  makeVATable(): HTMLVaTableInnerElement {
    const vaTable = document.createElement('va-table-inner');
    // add attributes
    vaTable.setAttribute('rows', `${this.rows}`);
    vaTable.setAttribute('cols', `${this.cols}`);
    vaTable.setAttribute('uswds', this.uswds ? "true" : "false");
    vaTable.setAttribute('stacked', this.stacked ? "true" : "false");
    
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

  watchForDataChanges() {
    // Watch for changes to the slot.
    const row = this.el.querySelectorAll('va-table-row')[1] as HTMLVaTableRowElement;
    const callback = () => {
      const oldTable = this.el.querySelector('va-table-inner');
      if (oldTable) {
        oldTable.remove();
        this.rows = null;
        this.cols = null;
        this.cells = null;
      }
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
  addVaTableInner() {
    // generate a list of all table cells
    this.getAllCells();
    // create a va-table-inner with the cells in the slots
    const vaTable = this.makeVATable();
    // add the table to the component
    this.el.appendChild(vaTable);
  }

  componentDidLoad() {
    if (this.uswds) {
      // add a va-table-inner instance to the DOM
      this.addVaTableInner();
      // watch for changes to content
      this.watchForDataChanges();
    }
  }

  render() {
    if (this.uswds) {
      return (
        <Host>
          <slot></slot>
        </Host>
      )
    } else {
      return (  
        <va-table-inner
          uswds={this.uswds}
          table-title={this.tableTitle}
          sort-column={this.sortColumn}
          descending={this.descending}
          vaTableRowRefs={this.el.children}
        >
          <slot name="headers"></slot>
          <slot></slot>
        </va-table-inner>
      ) 
    }
      
  }
}
