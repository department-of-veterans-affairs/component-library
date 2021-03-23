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
        <table>
          {title && <caption>{title}</caption>}
          <thead>
            <tr>
              {columns.map(col => (
                <th>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map(item => (
              <tr>
                {columns.map(c => (
                  <td data-label={c.label}>
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
