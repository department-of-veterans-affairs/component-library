import { Component, Host, h, Element, State } from '@stencil/core';

/**
 * @componentName Summary box
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-summary-box',
  styleUrl: 'va-summary-box.scss',
  shadow: true,
})
export class VaSummaryBox {
  
  /**
   * Local state for slot=headline's text.
   * Used to place an aria-label for role="region" with the same text as the heading.
   */
  @State() headlineText: string = null;

  @Element() el: HTMLElement;

  private getHeadlineText(): string {
    const headline = this.el?.querySelector('[slot="headline"]');
    return headline?.textContent?.trim() || null;
  }

  componentWillLoad() {
    this.headlineText = this.getHeadlineText();
  }

  componentDidLoad() {
       // add uswds classes
    const nodes = this.el.shadowRoot
      .querySelectorAll('slot')
    const headline = nodes[0];
    const content = nodes[1];
    
    headline.classList.add('usa-summary-box__heading');
    content.classList.add('usa-summary-box__text');

    this.headlineText = this.getHeadlineText();
  }

  render() {
    const headlineText = this.headlineText || this.getHeadlineText();

    return (
      <Host>
        <div class="usa-summary-box" role="region" aria-label={headlineText}>
          <div class="usa-summary-box__body">
            <slot name="headline"></slot>
            <slot />
          </div>
        </div>
      </Host>
    );
  } 
}
