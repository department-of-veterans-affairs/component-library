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

  /**
   * The description to render. If this prop exists, va-checkbox will render it
   * instead of the named slot.
   */
  @Prop() description?: string;

  render() {
    return (
      <Host>
        <div id="description">
          {this.description ? (
            <p>{this.description}</p>
          ) : (
            <slot name="description" />
          )}
        </div>
        <input type="checkbox" id="checkbox-element" />
        <label htmlFor="checkbox-element">{this.label}</label>
        {this.error && <span id="error-message">{this.error}</span>}
      </Host>
    );
  }
}
