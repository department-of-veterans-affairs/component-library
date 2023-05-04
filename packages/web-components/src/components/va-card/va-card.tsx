import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Card
 * @maturityCategory dont_use
 * @maturityLevel proposed
 */


@Component({
  tag: 'va-card',
  styleUrl: 'va-card.scss',
  shadow: true,
})
export class VaCard {

  render() {
    return (
      <Host>
        <div class="va-card">
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
