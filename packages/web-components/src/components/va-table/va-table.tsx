import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  header!: HTMLSlotElement;
  body!: HTMLSlotElement;
  @Prop() caption: string;

  componentDidLoad() {
    const headers = this.header.assignedNodes()[0].childNodes;
    const rows = this.body.assignedNodes();


    const columns = [];

    headers.forEach(item => {
      columns.push((item as HTMLElement).textContent);
      (item as Element).setAttribute('role', 'columnheader');
      (item as Element).setAttribute('scope', 'col');
    });

    const alignment = {};
    rows.forEach((row, index) => {
      const cells = (row as HTMLElement).childNodes;

      cells.forEach((cell, colNum) => {
        // Look at the first row of data to determine type of data in column
        if (index === 0) {
          // Right align columns with numeric data
          if (!Number.isNaN(Number((cell as Element).textContent))) {
            alignment[colNum] = 'medium-screen:vads-u-text-align--right';
            (headers[colNum] as Element).classList.add(alignment[colNum]);
          }
        }
        if (alignment[colNum]) {
          (cell as Element).classList.add(alignment[colNum]);
        }

        (cell as Element).setAttribute('data-label', columns[colNum]);
        (cell as Element).setAttribute('role', 'cell');
      });
    });
  }

  render() {
    const { caption } = this;

    return (
      <Host>
        <table role="table">
          {caption && <caption>{caption}</caption>}
          <thead>
            <slot
              ref={el => (this.header = el as HTMLSlotElement)}
              name="headers"
            ></slot>
          </thead>

          <tbody>
            <slot ref={el => (this.body = el as HTMLSlotElement)}></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
