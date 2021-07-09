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
  tag: 'va-text-input',
  styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  /**
   * The label for the text input.
   */
  @Prop() label: string | HTMLElement;

  /**
   * The error message to render.
   */
  @Prop() error?: string | HTMLElement;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

  /**
   * Placeholder text to show in the input field.
   */
  @Prop() placeholder?: string;

  /**
   * The maximum number of characters allowed in the input.
   */
  @Prop() maxlength?: number;

  /**
   * What to tell the browser to auto-complete the field with.
   */
  @Prop() autocomplete?: string;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean;

  /**
   * The name to pass to the input element.
   */
  @Prop() name?: string;

  /**
   * The aria-describedby attribute for the <intput> in the shadow DOM.
   */
  @Prop() ariaDescribedby?: string = '';

  /*
   * The value for the input.
   */
  @Prop({ mutable: true }) value?: string = '';
  // TODO: Make the value prop reflective. Currently, it isn't because it screws
  // up the input behavior. For now, the only "bug" is that the changed value
  // isn't reflected in the DOM on the web component. That seems to be how the
  // <input> is supposed to work, however:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-value
  //
  // $('va-text-input').value will be correct
  // $('va-text-input').getAttribute('value') will be incorrect

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
        componentName: 'va-text-input',
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
          type="text"
          value={this.value}
          onInput={this.handleChange}
          onBlur={this.handleBlur}
          aria-describedby={describedBy}
          placeholder={this.placeholder}
          maxlength={this.maxlength}
        />
        {this.maxlength && this.value.length >= this.maxlength && (
          <small>(Max. {this.maxlength} characters)</small>
        )}
      </Host>
    );
  }
}
