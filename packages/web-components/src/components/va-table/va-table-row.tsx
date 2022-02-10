import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table-row',
  styleUrl: 'va-table-row.css',
  // scoped: true,
  // shadow: true,
})
export class VaTableRow {
  render() {
    return (
      <Host>
        <tr>
          <slot></slot>
        </tr>
      </Host>
    );
  }
}
