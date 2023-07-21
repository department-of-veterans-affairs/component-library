import {
  Build,
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
import { consoleDevError } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @nativeHandler onInput
 * @nativeHandler onBlur
 * @componentName Text input
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/text-input
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */

@Component({
  tag: 'va-text-input',
  styleUrl: 'va-text-input.scss',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  /**
   * Input types we will allow to be specified with the "type" prop.
   */
  /* eslint-disable-next-line i18next/no-literal-string */
  allowedInputTypes = ['email', 'number', 'search', 'tel', 'text', 'url'];

  /**
   * The label for the text input.
   */
  @Prop() label?: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * Whether or not to add usa-input--error as class if error message is outside of component
   */
  @Prop() reflectInputError?: boolean = false;

  /**
   * Whether or not `aria-invalid` will be set on the inner input. Useful when
   * composing the component into something larger, like a date component.
   */
  @Prop() invalid?: boolean = false;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * The inputmode attribute.
   */
  @Prop() inputmode?:
    | 'decimal'
    | 'email'
    | 'numeric'
    | 'search'
    | 'tel'
    | 'text'
    | 'url';

  /**
   * The type attribute.
   */
  @Prop() type?: 'email' | 'number' | 'search' | 'tel' | 'text' | 'url' =
    'text';

  /**
   * The maximum number of characters allowed in the input.
   * Negative and zero values will be ignored.
   */
  @Prop() maxlength?: number;

  /**
   * The minimum number of characters allowed in the input.
   */
  @Prop() minlength?: number;

  /**
   * Allows the browser to automatically complete the input.
   */
  @Prop() autocomplete?: string;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The name to pass to the input element.
   */
  @Prop() name?: string;

  /**
   * The regular expression that the input element's value is checked against on submission
   */
  @Prop() pattern?: string;

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
   * Adds styling based on status value
   */
  @Prop() success?: boolean = false;

  /**
   * Displays the input at a specific width. Accepts 2xs (4ex), xs (7ex), sm or small (10ex), md or medium (20ex), lg (30ex), xl (40ex), and 2xl (50ex).
   */
  @Prop() width?: string;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop({reflect: true}) uswds?: boolean = false;

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

  private getInputType() {
    if (!this.allowedInputTypes.includes(this.type)) {
      consoleDevError(
        `The input type "${this.type}" is invalid or unsupported!`,
      );
      /* eslint-disable-next-line i18next/no-literal-string */
      return 'text';
    }

    return this.type;
  }

  /**
   * This ensures that the `maxlength` property will be positive
   * or it won't be used at all
   */
  private getMaxlength() {
    if (this.maxlength <= 0) {
      consoleDevError('The maxlength prop must be positive!');
      return undefined;
    }

    return this.maxlength;
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  private handleBlur = () => {
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
      error,
      reflectInputError,
      invalid,
      inputmode,
      required,
      value,
      minlength,
      pattern,
      name,
      autocomplete,
      hint,
      handleInput,
      handleBlur,
      uswds,
      success,
      messageAriaDescribedby,
      width,
    } = this;
    const type = this.getInputType();
    const maxlength = this.getMaxlength();
    const ariaDescribedbyIds =
      `${messageAriaDescribedby ? 'input-message' : ''} ${
        error ? 'input-error-message' : ''
      }`.trim() || null; // Null so we don't add the attribute if we have an empty string

    if (uswds) {
      const labelClass = classnames({
        'usa-label': true,
        'usa-label--error': error,
      });
      const inputClass = classnames({
        'usa-input': true,
        'usa-input--success': success,
        'usa-input--error': error || reflectInputError,
        [`usa-input--${width}`]: width,
      });
      return (
        <Host>
          {label && (
            <label htmlFor="inputField" class={labelClass} part="label">
              {label}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
            </label>
          )}
          {hint && <span class="usa-hint">{hint}</span>}
          <slot></slot>
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span>
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <input
            class={inputClass}
            id="inputField"
            type={type}
            value={value}
            onInput={handleInput}
            onBlur={handleBlur}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={invalid || error ? 'true' : 'false'}
            inputmode={inputmode ? inputmode : undefined}
            maxlength={maxlength}
            minlength={minlength}
            pattern={pattern}
            name={name}
            autocomplete={autocomplete}
            required={required || null}
            part="input"
          />
          {messageAriaDescribedby && (
            <span id="input-message" class="sr-only">
              {messageAriaDescribedby}
            </span>
          )}
          {maxlength && value?.length >= maxlength && (
            <small part="validation">
              {i18next.t('max-chars', { length: maxlength })}
            </small>
          )}
          {minlength && value?.length < minlength && (
            <small part="validation">
              {i18next.t('min-chars', { length: minlength })}
            </small>
          )}
        </Host>
      );
    } else {
      const inputClass = classnames({
        [`usa-input--${width}`]: width,
      });
      return (
        <Host>
          {label && (
            <label htmlFor="inputField" part="label">
              {label}{' '}
              {required && (
                <span class="required">{i18next.t('required')}</span>
              )}
            </label>
          )}
          {hint && <span class="hint-text">{hint}</span>}
          <slot></slot>
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <input
            class={inputClass}
            id="inputField"
            type={type}
            value={value}
            onInput={handleInput}
            onBlur={handleBlur}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={invalid || error ? 'true' : 'false'}
            inputmode={inputmode ? inputmode : undefined}
            maxlength={maxlength}
            minlength={minlength}
            pattern={pattern}
            name={name}
            autocomplete={autocomplete}
            required={required || null}
            part="input"
          />
          {messageAriaDescribedby && (
            <span id="input-message" class="sr-only">
              {messageAriaDescribedby}
            </span>
          )}
          {maxlength && value?.length >= maxlength && (
            <small part="validation">
              {i18next.t('max-chars', { length: maxlength })}
            </small>
          )}
          {minlength && value?.length < minlength && (
            <small part="validation">
              {i18next.t('min-chars', { length: minlength })}
            </small>
          )}
        </Host>
      );
    }
  }
}
