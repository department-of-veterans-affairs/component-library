import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-textarea',
  styleUrl: 'va-textarea.css',
  shadow: true,
})
export class VaTextarea {

  /**
   * The label for the textarea.
   */
  @Prop() label?: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * The placeholder string.
   */
  @Prop() placeholder?: string;

  /**
   * The name for the input.
   */
  @Prop() name?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  /**
   * The maximum number of characters allowed in the input.
   */
  @Prop() maxlength?: number;

  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean;

  render() {
    const {label, error, placeholder, maxlength, name, required, value} = this;

    return (
      <Host>
        <label
          id="textarea-label"
          class={labelErrorClass}
          htmlFor="textarea"
        >
          {label}
          {required && <span class="required">(*Required)</span>}
        </label>
        {errorSpan}
        {error && <span id="error-message" role="alert">
          <span class="sr-only">Error</span> {this.error}
          </span>
        }
        <textarea
          class={classes}
          aria-describedby={error ? 'error-message' : undefined}
          aria-labelledby="textarea-label"
          id="textarea"
          placeholder={placeholder}
          name={name}
          maxLength={maxlength}
          value={value}
        />
        {maxlength && value?.length >= maxlength && (
          <small aria-live="polite" part="validation">
            (Max. {maxlength} characters)
          </small>
        )}

      </Host>
    );
  }
}
