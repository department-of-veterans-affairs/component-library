import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'va-process-list',
  styleUrl: 'va-process-list.css',
  shadow: true,
})
export class VaProcessList {
  render() {
    return (
      <Host>
        <ol role="list">
          <slot></slot>
        </ol>
      </Host>
    );
  }
}
