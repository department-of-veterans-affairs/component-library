import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table',
  styleUrl: 'va-table.css',
  shadow: true,
})
export class VaTable {
  @Prop() columns: Array<any>;
  @Prop() data: Array<any>;

  render() {
    const { columns, data } = this;

    return (
      <Host>
        <table>
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
                  <td>{item[c.value] === null ? '---' : item[c.value]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Host>
    );
  }
}
