import { Component, Host, h, Prop, Element } from '@stencil/core';
import { wrapAndAddClass, createNewBlankDiv} from '../../utils/shadow-wrapper';

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
      .querySelectorAll('slot');
    // instead of adding class to the slot
    // we assign a new blank div element to it, as a placeholder
    nodes.forEach(slot=>createNewBlankDiv(this, slot.name))
  
    const headline = nodes[0];
    const content = nodes[1];
    //here we take the placeholder element,
    // move the original content inside and apply the class
    // the styles should now apply from the light dom
    wrapAndAddClass(headline,'usa-summary-box__heading');
    wrapAndAddClass(content, 'usa-summary-box__text');
  }

  render() {
    const { uswds } = this;
    if (uswds) {
      return (
        <Host>
          <div class="usa-summary-box" role="region">
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
