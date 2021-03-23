import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Prop() columns: Array<any>;
  @Prop() data: Array<any>;
  @Prop() title: string;

  render() {
    const { columns, data, title } = this;

    return (
      <Host>
        <table role="table">
          {title && <caption>{title}</caption>}
          <thead>
            <tr role="row">
              {columns.map(col => (
                <th role="columnheader" scope="col">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="row">
            {data?.map(item => (
              <tr>
                {columns.map(c => (
                  <td data-label={c.label} role="cell">
                    {item[c.value] === null ? '---' : item[c.value]}
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
