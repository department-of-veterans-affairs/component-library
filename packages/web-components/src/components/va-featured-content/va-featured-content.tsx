import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Featured content
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-featured-content',
  styleUrl: 'va-featured-content.css',
  shadow: true,
})
export class VaFeaturedContent {
  render() {
    return (
      <Host>
        <div class="feature">
          <slot name="headline"></slot>
          <slot />
        </div>
      </Host>
    );
  }
}
