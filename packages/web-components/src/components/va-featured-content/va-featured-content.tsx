import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @componentName Featured content
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-featured-content',
  styleUrl: 'va-featured-content.scss',
  shadow: true,
})
export class VaFeaturedContent {
  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  render() {
    const { uswds } = this;
    if (uswds) {
      return (
        <Host>
          <div class="usa-summary-box">
            <slot name="headline"></slot>
            <slot />
          </div>
        </Host>
      );
    } else {
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
}
