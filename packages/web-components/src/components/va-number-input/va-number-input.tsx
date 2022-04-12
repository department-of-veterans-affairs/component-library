import {
  Component,
  Element,
  Prop,
  Host,
  h,
  Event,
  EventEmitter,
} from '@stencil/core';

@Component({
  tag: 'va-number-input',
  styleUrl: 'va-number-input.css',
  shadow: true,
})
export class VaNumberInput {
  @Element() el: HTMLElement;

  /**
   * The label for the text input.
   */
  @Prop() label?: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  /**
   * The inputmode attribute.
   */
  @Prop() inputmode?: 'decimal' | 'numeric';

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean;

  /**
   * The name to pass to the input element.
   */
  @Prop() name?: string;

  /**
   * The aria-describedby attribute for the `<input>` in the shadow DOM.
   */
  @Prop() ariaDescribedby?: string = '';

  /**
   * Minimum number value
   * The min attribute specifies the minimum value for an `<input>` element.
   */
  @Prop() min: number | string;

  /**
   * Maximum number value
   * The max attribute specifies the maximum value for an `<input>` element.
   */
  @Prop() max: number | string;

  /**
   * The value for the input.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * The event used to track usage of the component. This is emitted when the
   * input is blurred and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  private handleBlur = () => {
    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-number-input',
        action: 'blur',
        details: {
          label: this.label,
          value: this.value,
        },
      });
    }
  };

  render() {
    const describedBy =
      `${this.ariaDescribedby} ${this.error ? 'error-message' : ''}`.trim() ||
      null; // Null so we don't add the attribute if we have an empty string
    const inputMode = this.inputmode ? this.inputmode : null; // Null so we don't add the attribute if we have an empty string

    return (
      <Host>
        {this.label && (
          <label htmlFor="inputField">
            {this.label}{' '}
            {this.required && <span class="required">(*Required)</span>}
          </label>
        )}
        {this.error && <span id="error-message">{this.error}</span>}
        <input
          id="inputField"
          type="number"
          aria-describedby={describedBy}
          inputmode={inputMode}
          max={this.max}
          min={this.min}
          value={this.value}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
        />
      </Host>
    );
  }
}
