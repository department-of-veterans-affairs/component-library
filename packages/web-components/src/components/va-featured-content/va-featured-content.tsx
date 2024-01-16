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

  /**
   *  In styleUrl,  import/prep pertinent styles.
   *  Those are rules any that begin with:
   *  .usa-summary-box__heading,
   *  .usa-summary-box__text 
   *  Please note any styles that rely on ancesters
   *  of the above will not be applied
   **/

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
    // Here I move the content of each of 
    // the targeted slot elements into the shadow DOM
    headline.append(...headline.assignedElements());
    content.append(...content.assignedElements());

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
