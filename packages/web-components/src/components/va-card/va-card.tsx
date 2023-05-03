import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Card
 * @maturityCategory dont_use
 * @maturityLevel proposed
 */


@Component({
  tag: 'va-card',
  styleUrl: 'va-card.css',
  shadow: true,
})
export class VaCard {

  render() {
    return (
      <Host>
        <div class="va-card vads-u-background-color--white vads-u-padding--2 vads-u-margin-bottom--2p5">
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
