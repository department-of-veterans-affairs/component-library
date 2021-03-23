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
  @Prop() data: Array<any>;
  @Prop() title: string;

  render() {
    const { data, title } = this;

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
            {data?.map(item => (
              <tr>
                {columns.map((c, colIndex) => (
                  <td data-label={c} role="cell">
                    {item[colIndex] === null ? '---' : item[colIndex]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Host>
    );
  }
}
