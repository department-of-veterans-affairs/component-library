import { Component, Element, Host, Listen, Prop, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-radio-button',
  styleUrl: 'va-radio-button.css',
  shadow: true,
})
export class VaRadioButton {
  @Element() el: any;

  @Prop() label: string;

  @Prop() required: boolean;

  @Listen('radioOptionSelected')
  radioOptionSelectedHandler(event: CustomEvent) {
    const clickedItem = event.target as Element;

    getSlottedNodes(this.el, 'va-radio-option')
      .filter(item => item !== clickedItem)
      .forEach(item => ((item as any).checked = false));

    (clickedItem as any).checked = true;
  }

  render() {
    return (
      <Host role="radiogroup">
        <legend>
          {this.label}
          {this.required && <span class="form-required-span">(*Required)</span>}
        </legend>
        <slot></slot>
      </Host>
    );
  }
}
