import { Component, Element, Host, h } from '@stencil/core';

@Component({
  tag: 'va-table-row',
  styleUrl: 'va-table-row.css',
  shadow: true,
})
export class VaTableRow {
  @Element() el: HTMLElement;

  valueOf() {
    // Hardcode the value of the object to its third column content
    // This is obviously not final
    return this.el.children[2].textContent;
  }

  render() {
    return (
      <Host role="row">
        <slot></slot>
      </Host>
    );
  }
}
