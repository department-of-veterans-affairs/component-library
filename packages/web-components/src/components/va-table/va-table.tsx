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

    rows.forEach(row => {
      const cells = (row as HTMLElement).childNodes;

      cells.forEach((cell, index) => {
        (cell as Element).setAttribute('data-label', columns[index]);
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
