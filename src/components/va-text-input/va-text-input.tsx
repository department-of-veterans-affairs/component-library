import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-text-input',
  // styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  render() {
    return (
      <Host>
        <input type="text" />
      </Host>
    );
  }
}
