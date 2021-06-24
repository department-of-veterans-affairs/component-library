import { Component, Element, Host, h, Prop } from '@stencil/core';

import { assembleAttributes } from '../../utils/utils';

// The props passed to the web component which we don't want to pass to the
// input element. Note: The following attributes are deliberately left out so
// they get passed to the input:
//   - required
//   - checked
const wcOnlyProps = ['label', 'error', 'disableAnalytics'];

@Component({
  tag: 'va-checkbox',
  styleUrl: 'va-checkbox.css',
  shadow: true,
})
export class VaCheckbox {
  @Element() el: HTMLElement;

  @Prop() label: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  /**
   * The description to render. If this prop exists, va-checkbox will render it
   * instead of the named slot.
   */
  @Prop() description?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  render() {
    const atts = assembleAttributes(this.el.attributes, wcOnlyProps);
    if (this.error) {
      atts['aria-describedby'] = (
        (atts['aria-describedby'] || '') + ' error-message'
      ).trim();
    }
    return (
      <Host>
        <div id="description">
          {this.description ? (
            <p>{this.description}</p>
          ) : (
            <slot name="description" />
          )}
        </div>
        <input type="checkbox" id="checkbox-element" {...atts} />
        <label htmlFor="checkbox-element">
          {this.label}
          {this.required && <span class="required">(Required)</span>}
        </label>
        {this.error && <span id="error-message">{this.error}</span>}
      </Host>
    );
  }
}
