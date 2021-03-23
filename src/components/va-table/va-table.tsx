import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Prop() columns: Array<any>;
  @Prop() col1: string;
  @Prop() col2: string;
  @Prop() col3: string;
  @Prop() title: string;

  render() {
    const { title } = this;

    const columns = [this.col1, this.col2, this.col3];
    return (
      <Host>
        <table role="table">
          {title && <caption>{title}</caption>}
          <thead>
            <tr role="row">
              {columns.map(col => (
                <th role="columnheader" scope="col">
                  {col}
                </th>
              ))}
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
