import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-text-input',
  // styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  /**
   * The label for the text input.
   */
  @Prop() label: string | HTMLElement;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  /**
   * Set the input to required and render the (Required) text
   */
  @Prop() required?: boolean;

  /**
   * Placeholder text to show in the input field
   */
  @Prop() placeholder?: string;

  render() {
    const atts = assembleAttributes(this.el.attributes);
    if (this.error) {
      atts['aria-describedby'] = (
        (atts['aria-describedby'] || '') + ' error-message'
      ).trim();
    }
    return (
      <Host>
        {this.label && (
          <label htmlFor="inputField">
            {this.label}{' '}
            {this.required && <span class="required">(Required)</span>}
          </label>
        )}
        {this.error && <span id="error-message">{this.error}</span>}
        <input id="inputField" type="text" {...atts} />
      </Host>
    );
  }
}

// The props passed to the web component which we don't want to pass to the
// input element. Note: The following attributes are deliberately left out so
// they get passed to the input:
//   - required
//   - placeholder
const wcPropNames = ['label', 'error'];

const assembleAttributes = (atts: NamedNodeMap) =>
  Array.from(atts)
    .filter(a => !wcPropNames.some(p => a.nodeName === p))
    .reduce(
      // Transform the NamedNodeMap into an object we can spread on <input>
      // a.nodeValue will be an empty string when the attribute value isn't
      // specified such as when using a boolean true like for the required prop.
      (all, a) => ({ ...all, [a.nodeName]: a.nodeValue || a.nodeValue === '' }),
      {},
    );
