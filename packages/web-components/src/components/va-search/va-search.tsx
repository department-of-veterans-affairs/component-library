import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-search',
  styleUrl: 'va-search.css',
  shadow: true,
})
export class VaSearch {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
