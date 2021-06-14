import { Component, Element, Prop, Host, h } from '@stencil/core';

const wcProps = ['label'];

const assembleAttributes = (atts: NamedNodeMap) => {
  return Array.from(atts)
    .filter(a => !wcProps.some(p => a.nodeName === p))
    .reduce((all, a) => ({ ...all, [a.nodeName]: a.nodeValue }), {});
};

@Component({
  tag: 'va-text-input',
  // styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  @Prop() label: string | HTMLElement; // TODO: Also accept DOM elements (React)

  render() {
    const atts = assembleAttributes(this.el.attributes);
    console.log(this.el.attributes);
    return (
      <Host>
        {this.label && <label htmlFor="inputField">{this.label}</label>}
        <input id="inputField" type="text" {...atts} />
      </Host>
    );
  }
}
