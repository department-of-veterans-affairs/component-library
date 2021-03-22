import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Prop() columns: Array<any>;

  render() {
    console.log(this.columns);
    return (
      <Host>
        <table>
          <slot name="head"></slot>
          <slot name="body"></slot>
        </table>
      </Host>
    );
  }
}
