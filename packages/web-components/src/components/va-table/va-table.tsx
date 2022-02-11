import { Component, Prop, Host, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  header!: HTMLTableRowElement;
  body!: HTMLTableSectionElement;
  @Prop() title: string;

  componentDidLoad() {
    const headers = (
      this.header.children[0] as HTMLSlotElement
    ).assignedNodes();
    const rows = (this.body.children[0] as HTMLSlotElement).assignedNodes();

    console.log('ROWS', rows);

    const columns = [];

    headers.forEach(item => {
      columns.push((item as HTMLElement).textContent);
      (item as Element).setAttribute('role', 'columnheader');
      (item as Element).setAttribute('scope', 'col');
    });

    rows.forEach(row => {
      const slotted = getSlottedNodes(row as HTMLElement, 'tr')[0];
      console.log('SLOTTED', slotted);
      const cells = (row as HTMLElement).childNodes;
      console.log(cells);

      cells.forEach((cell, index) => {
        (cell as Element).setAttribute('data-label', columns[index]);
      });
    });
  }

  render() {
    const { title } = this;

    return (
      <Host>
        <table role="table">
          {title && <caption>{title}</caption>}
          <thead>
            <tr ref={el => (this.header = el as HTMLTableRowElement)}>
              <slot name="headers"></slot>
            </tr>
          </thead>

          <tbody ref={el => (this.body = el as HTMLTableSectionElement)}>
            <slot></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
