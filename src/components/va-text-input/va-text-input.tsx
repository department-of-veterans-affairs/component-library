import { Component, Element, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'va-text-input',
  // styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  @Prop() label: string | HTMLElement;

  @Prop() error: string | HTMLElement;

  render() {
    const atts = assembleAttributes(this.el.attributes);
    if (this.error) {
      atts['aria-describedby'] = (
        (atts['aria-describedby'] || '') + ' error-message'
      ).trim();
    }
    return (
      <Host>
        {this.label && <label htmlFor="inputField">{this.label}</label>}
        {this.error && <span id="error-message">{this.error}</span>}
        <input id="inputField" type="text" {...atts} />
      </Host>
    );
  }
}

// This doesn't work in unit tests, but it does in the browser
// const wcPropNames = Object.keys(VaTextInput.prototype);
const wcPropNames = ['label', 'error'];

const assembleAttributes = (atts: NamedNodeMap) =>
  Array.from(atts)
    .filter(a => !wcPropNames.some(p => a.nodeName === p))
    .reduce((all, a) => ({ ...all, [a.nodeName]: a.nodeValue }), {});
