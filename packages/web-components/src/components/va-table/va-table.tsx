import { Component, Element, Host, Prop, h } from '@stencil/core';
import { isNumeric } from '../../utils/utils';

/**
 * This component expects `<va-table-row>` elements as children.
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
  @Prop() caption: string;

  componentDidLoad() {
    const [headerRow, ...rows] = Array.from(
      this.el.querySelectorAll('va-table-row'),
    );
    const headers = headerRow.children;
    const columns = [];

    Array.from(headers).forEach((item: HTMLVaTableRowElement) => {
      columns.push(item.textContent);
      item.setAttribute('role', 'columnheader');
      item.setAttribute('scope', 'col');
    });

    const alignment = {};
    Array.from(rows).forEach((row, index) => {
      const cells = (row as HTMLElement).children;

      Array.from(cells).forEach((cell: HTMLSpanElement, colNum) => {
        // Look at the first row of data to determine type of data in column
        if (index === 0) {
          // Right align columns with numeric data
          if (isNumeric(cell.textContent)) {
            alignment[colNum] = 'medium-screen:vads-u-text-align--right';
            headers[colNum].classList.add(alignment[colNum]);
          }
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

  render() {
    const { caption } = this;

    return (
      <Host role="table">
        {caption && <caption>{caption}</caption>}
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
