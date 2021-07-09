import { Component, Element, Host, Prop, h } from '@stencil/core';
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

  render() {
    const nodes = getSlottedNodes(this.el, 'label');
    console.log(nodes);
    return (
      <Host>
        <fieldset>
          <legend>
            {this.label}
            {this.required && (
              <span class="form-required-span">(*Required)</span>
            )}
          </legend>
          <slot></slot>
        </fieldset>
      </Host>
    );
  }
}
