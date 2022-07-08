import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-link',
  styleUrl: 'va-link.css',
  shadow: true,
})
export class VaLink {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
