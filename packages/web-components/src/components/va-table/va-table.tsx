import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Prop() title: string;

  render() {
    const { title } = this;

    return (
      <Host>
        <table role="table">
          {title && <caption>{title}</caption>}
          <thead>
            <tr role="row" slot="headers">
              <slot name="headers"></slot>
            </tr>
          </thead>
          <tbody role="row">
            <slot></slot>
          </tbody>
        </table>
      </Host>
    );
  }
}
