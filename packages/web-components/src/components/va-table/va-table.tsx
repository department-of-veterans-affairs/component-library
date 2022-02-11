import { Component, Prop, Host, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  header!: HTMLTableSectionElement;
  body!: HTMLTableSectionElement;
  @Prop() title: string;

  componentDidLoad() {
    const headers = (
      this.header.children[0] as HTMLSlotElement
    ).assignedNodes()[0].childNodes;
    const rows = (this.body.children[0] as HTMLSlotElement).assignedNodes();

    console.log('ROWS', rows);

    const columns = [];

    headers.forEach(item => {
      columns.push((item as HTMLElement).textContent);
      (item as Element).setAttribute('role', 'columnheader');
      (item as Element).setAttribute('scope', 'col');
    });

    rows.forEach(row => {
      const slotted = getSlottedNodes(row as HTMLElement, 'va-table-row')[0];
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
          <thead ref={el => (this.header = el as HTMLTableSectionElement)}>
            <slot name="headers"></slot>
          </thead>

          <tbody ref={el => (this.body = el as HTMLTableSectionElement)}>
            <slot></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
