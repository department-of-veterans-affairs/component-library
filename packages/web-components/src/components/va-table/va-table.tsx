import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  header!: HTMLTableRowElement;
  @Prop() title: string;

  componentDidLoad() {
    const headers = (
      this.header.children[0] as HTMLSlotElement
    ).assignedNodes();

    headers.forEach(item => {
      (item as Element).setAttribute('role', 'columnheader');
      (item as Element).setAttribute('scope', 'col');
    });
  }

  render() {
    const { title } = this;

    return (
      <Host>
        <table role="table">
          {title && <caption>{title}</caption>}
          <thead>
            <tr
              role="row"
              ref={el => {
                this.header = el as HTMLTableRowElement;
              }}
            >
              <slot name="headers"></slot>
            </tr>
          </thead>
          <tbody>
            <slot></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
