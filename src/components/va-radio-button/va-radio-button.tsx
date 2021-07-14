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

  @Prop() error: string;

  @Listen('radioOptionSelected')
  radioOptionSelectedHandler(event: CustomEvent) {
    const clickedItem = event.target as HTMLVaRadioOptionElement;

    getSlottedNodes(this.el, 'va-radio-option')
      .filter(item => item !== clickedItem)
      .forEach(item => ((item as HTMLVaRadioOptionElement).checked = false));

    clickedItem.checked = true;

  }

  render() {
    return (
      <Host role="radiogroup">
        <legend>
          {this.label}
          {this.required && <span class="required-span">(*Required)</span>}
        </legend>
        {this.error && (
          <span class="error-message" role="alert">
            <span class="sr-only">Error</span> {this.error}
          </span>
        )}
        <slot></slot>
      </Host>
    );
  }
}
