import { Component, Host, h, Prop, State, Element } from '@stencil/core';

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

  /**
   * Local state for slot=headline's text.
   * Used to place an aria-label for role="region" with the same text as the heading.
   */
  @State() headlineText: string = null;

  @Element() el: HTMLElement;

  componentWillLoad() {
    let childElements = Array.from(this.el.children);
    this.headlineText = childElements.find(element => element.slot === "headline").textContent.trim();
  }

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
          <div class="usa-summary-box" role="region" aria-label={this.headlineText}>
            <div class="usa-summary-box__body">
              <slot name="headline"></slot>
              <slot />
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
