import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'va-checkbox',
  styleUrl: 'va-checkbox.css',
  shadow: true,
})
export class VaCheckbox {
  @Prop() label: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  render() {
    return (
      <Host>
        <input type="checkbox" id="checkbox-element" />
        <label htmlFor="checkbox-element">{this.label}</label>
        {this.error && <span id="error-message">{this.error}</span>}
      </Host>
    );
  }
}
