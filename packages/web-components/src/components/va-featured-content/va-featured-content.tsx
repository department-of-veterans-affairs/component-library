import { Component, Host, h, Prop, Element } from '@stencil/core';

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

  @Element() el: HTMLElement;

  componentDidLoad() {
    if (!this.uswds) {
      return
    }
    // add uswds classes
    const nodes = this.el.shadowRoot
      .querySelectorAll('slot')
    const headline = nodes[0];
    const content = nodes[1];
    
    headline.classList.add('usa-summary-box__heading');
    content.classList.add('usa-summary-box__text');
  }

  render() {
    const { uswds } = this;
    if (uswds) {
      return (
        <Host>
          <div class="usa-summary-box" role="region">
            <div class="usa-summary-box__body">
              <slot name="headline"></slot>
              <div class="usa-summary-box__text">
                <slot></slot>
              </div>
            </div>
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
