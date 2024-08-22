import {
  Component,
  Host,
  Prop,
  h,
  Element,
  Event,
  EventEmitter
} from '@stencil/core';

/**
 * @componentName Statement of truth
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-statement-of-truth',
  styleUrl: 'va-statement-of-truth.scss',
  shadow: true,
})
export class VaStatementOfTruth {
  /**
   * An optional custom header for the component
   */
  @Prop() heading: string = 'Statement of truth';

  /**
   * The value to pre-fill the va-text-input element
   */
  @Prop() inputValue: string = '';

  /**
   * The error to be applied to the va-text-input element
   */
  @Prop() inputError: string = '';

  /**
   * The error to be applied to the va-check-box element
   */
  @Prop() checkboxError: string = '';

  /**
   * An optional message that will be read by screen readers when the input in the va-text-input component is focused.
   */
  @Prop() inputMessageAriaDescribedby: string = '';

  /**
   *  The flag to prefill the checked state of the va-checkbox component
   */
  @Prop() checked: boolean;

  /**
   *  The label for the va-text-input component
   */
  @Prop() inputLabel: string = 'Your full name';

  /**
   *  The label for the va-checkbox-component
   */
  @Prop() checkboxLabel: string =
    'I certify the information above is correct and true to the best of my knowledge and belief.';

  /**
   * The event emitted when the value of the input changes
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaInputChange: EventEmitter;

  /**
   * The event emitted when the user tabs out of the input
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaInputBlur: EventEmitter;

  /**
   * The event emitted when the checked state of the va-checkbox changes
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaCheckboxChange: EventEmitter;

  /**
   * Reference to host element
   */
  @Element() el: HTMLElement;

  private handleInputChange = (event: InputEvent) => {
    const { value } = event.currentTarget as HTMLInputElement
    this.vaInputChange.emit({ value });
  };

  private handleInputBlur = (event: Event) => {
    this.vaInputBlur.emit(event);
  };

  private handleCheckboxChange = (event: Event) => {
    const { checked } = event.currentTarget as HTMLInputElement
    this.vaCheckboxChange.emit({ checked });
  };

  render() {
    const {
      heading,
      inputLabel,
      checkboxLabel,
      inputMessageAriaDescribedby,
      checked,
      inputValue,
      inputError,
      checkboxError,
    } = this;
    return (
      <Host>
        <p class="font-sans-6">
          <strong>Note:</strong> According to federal law, there are criminal
          penalties, including a fine and/or imprisonment for up to 5 years, for
          withholding information or for providing incorrect information
          (Reference: 18 U.S.C. 1001).
        </p>
        <article>
          <h3>{heading}</h3>
          <slot></slot>
          <p class="font-sans-6">
            I have read and accept the&nbsp;
            <va-link external text='privacy policy' href='/privacy-policy/' />
            .
          </p>
          <va-text-input
            id="veteran-signature"
            name="veteran-signature"
            label={inputLabel}
            value={inputValue}
            message-aria-describedby={inputMessageAriaDescribedby}
            required
            error={inputError}
            onInput={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
          <va-checkbox
            id="veteran-certify"
            name="veteran-certify"
            label={checkboxLabel}
            required
            checked={checked}
            error={checkboxError}
            onVaChange={this.handleCheckboxChange}
          />
        </article>
      </Host>
    );
  }
}
