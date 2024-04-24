import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table-row',
  styleUrl: 'va-table-row.css',
  shadow: true,
})
export class VaTableRow {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
