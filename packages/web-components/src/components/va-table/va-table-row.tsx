import { Component, Host, Prop, State, JSX, h } from '@stencil/core';

@Component({
  tag: 'va-table-row',
  styleUrl: 'va-table-row.css',
  shadow: true,
})
export class VaTableRow {

  @Prop() uswds?: boolean = false;

  @Prop() isHeader?: boolean = false;

  @Prop() rowData?: string | string[];

  @State() formattedRowData?: string[];

  componentWillLoad() {
    if (this.uswds) {
      const data = typeof this.rowData === 'string'
        ? JSON.parse(this.rowData)
        : this.rowData;
      this.formattedRowData = data;
    }
  }

  getHeaderRow(): JSX.Element {
    return (this.formattedRowData.map(cell =>
        <th scope="col">{cell}</th>))
  }

  getRow(): JSX.Element {
    return (this.formattedRowData.map((item, index) => {
      const cell = index === 0
        ? <th scope="row">{item}</th>
        : <td>{item}</td>;
      return cell;
    }));
  }

  render() {
    const { uswds, isHeader } = this;
    if (uswds) {
      return (
        <tr>
          {isHeader ? this.getHeaderRow() : this.getRow()}
        </tr>
      )
    } else {
      return (
        <Host role="row">
          <slot></slot>
        </Host>
      );
    }

  }
}
