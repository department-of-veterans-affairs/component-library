import {
  Component,
  Element,
  Prop,
  Host,
  h,
  Event,
  EventEmitter,
  forceUpdate,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import i18next from 'i18next';

/**
 * @nativeHandler onInput
 * @nativeHandler onBlur
 * @nativeHandler onWheel
 * @componentName Number input
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/number-input
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */
@Component({
  tag: 'va-number-input',
  styleUrl: 'va-number-input.scss',
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
  @Prop() required?: boolean = false;

  /**
   * The inputmode attribute.
   */
  @Prop() inputmode?: 'decimal' | 'numeric';

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The name to pass to the input element.
   */
  @Prop() name?: string;

  /**
   * Minimum number value
   * The min attribute specifies the minimum value for an input element.
   */
  @Prop() min: number | string;

  /**
   * Maximum number value
   * The max attribute specifies the maximum value for an input element.
   */
  @Prop() max: number | string;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * An optional message that will be read by screen readers when the input is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The value for the input.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * Whether this component will be used to accept a currency value.
   */
  @Prop() currency?: boolean = false;

  /**
   * Displays the input at a specific width. Accepts 2xs (4ex), xs (7ex), sm or small (10ex), md or medium (20ex), lg (30ex), xl (40ex), and 2xl (50ex).
   */
  @Prop() width?: string;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

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
      const detail = {
        componentName: 'va-number-input',
        action: 'blur',
        details: {
          label: this.label,
          value: this.value,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  // prevent input value from changing if user accidentally scrolls while focused on input
  private handleWheel = (e: Event) => {
    e.preventDefault();
  }


  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  render() {
    const {
      label,
      required,
      error,
      inputmode,
      name,
      max,
      min,
      value,
      hint,
      currency,
      uswds,
      handleBlur,
      handleInput,
      handleWheel,
      width,
      messageAriaDescribedby,
    } = this;

    const ariaDescribedbyIds = `${messageAriaDescribedby ? 'input-message' : ''} ${error ? 'input-error-message' : ''}`
    .trim() || null; // Null so we don't add the attribute if we have an empty string
    
    if (uswds) {
      const labelClasses = classnames({
        'usa-label': true,
        'usa-label--error': error,
      });
      const inputClasses = classnames({
        'usa-input': true,
        'usa-input--error': error,
        [`usa-input--${width}`]: width,
      });
      return (
        <Host>
          {label && (
            <label htmlFor="inputField" class={labelClasses}>
              {label}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
              {hint && <span class="usa-hint">{hint}</span>}
            </label>
          )}
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span>
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <input
            class={inputClasses}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={error ? 'true' : 'false'}
            id="inputField"
            type="number"
            inputmode={inputmode ? inputmode : null}
            name={name}
            max={max}
            min={min}
            value={value}
            required={required || null}
            onInput={handleInput}
            onBlur={handleBlur}
            onWheel={handleWheel}
            />
            {messageAriaDescribedby && (
              <span id="input-message" class="sr-only">
                {messageAriaDescribedby}
              </span>
            )}
        </Host>
      );
    } else {
      const inputClass = classnames({
        [`usa-input--${width}`]: width,
        'currency-input': currency,
      });
      return (
        <Host>
          <label htmlFor="inputField">
            {label}{' '}
            {required && <span class="required">{i18next.t('required')}</span>}
            {hint && <span class="hint-text">{hint}</span>}
          </label>
          <span id="error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <div>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            {currency && <span id="symbol">$</span>}
            <input
              class={inputClass}
              aria-labelledby={currency ? 'inputField symbol' : undefined}
              aria-describedby={ariaDescribedbyIds}
              aria-invalid={error ? 'true' : 'false'}
              id="inputField"
              type="number"
              inputmode={inputmode ? inputmode : null}
              name={name}
              max={max}
              min={min}
              value={value}
              required={required || null}
              onInput={handleInput}
              onBlur={handleBlur}
              onWheel={handleWheel}
              />
              {messageAriaDescribedby && (
                <span id="input-message" class="sr-only">
                  {messageAriaDescribedby}
                </span>
              )}
            </div>
        </Host>
      );
    }
  }
}
