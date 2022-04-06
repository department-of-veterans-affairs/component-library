import {
  Component,
  Element,
  Prop,
  Host,
  h,
  Event,
  EventEmitter
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
  @Prop({ mutable: true }) value?: string;
  // TODO: Make the value prop reflective. Currently, it isn't because it screws
  // up the input behavior. For now, the only "bug" is that the changed value
  // isn't reflected in the DOM on the web component. That seems to be how the
  // <input> is supposed to work, however:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-value
  //
  // $('va-number-input').value will be correct
  // $('va-number-input').getAttribute('value') will be incorrect

  /**
   * The event emitted when the input is blurred.
   */
  @Event() vaBlur: EventEmitter;

  /**
   * The event emitted when the input value changes
   */
  @Event() vaChange: EventEmitter;

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

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.vaChange.emit({ value: this.value });
  };

  private handleBlur = () => {
    this.vaBlur.emit();

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
          onInput={this.handleChange}
          onBlur={this.handleBlur}
        />
      </Host>
    );
  }
}
