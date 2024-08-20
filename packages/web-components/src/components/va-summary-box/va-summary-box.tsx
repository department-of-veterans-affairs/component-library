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

  componentWillLoad() {
    let childElements = Array.from(this.el.children);
    this.headlineText = childElements.find(element => element.slot === "headline").textContent.trim();
  }

  componentDidLoad() {
       // add uswds classes
    const nodes = this.el.shadowRoot
      .querySelectorAll('slot')
    const headline = nodes[0];
    const content = nodes[1];
    
    headline.classList.add('usa-summary-box__heading');
    content.classList.add('usa-summary-box__text');

    let childElements = Array.from(this.el.children);
    this.headlineText = childElements.find(element => element.slot === "headline").textContent.trim();
  }

  render() {
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
  } 
}
