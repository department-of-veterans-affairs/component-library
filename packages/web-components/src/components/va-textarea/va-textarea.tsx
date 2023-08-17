import {
  Build,
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  Element,
  forceUpdate,
  h,
  Fragment,
} from '@stencil/core';
import classnames from 'classnames';
import i18next from 'i18next';
import { consoleDevError, getCharacterMessage } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @nativeHandler onInput
 * @nativeHandler onBlur
 * @componentName Textarea
 * @maturityCategory use
 * @maturityLevel deployed
 * @guidanceHref form/textarea
 * @translations English
 * @translations Spanish
 */

@Component({
  tag: 'va-textarea',
  styleUrl: 'va-textarea.scss',
  shadow: true,
})
export class VaTextarea {
  @Element() el!: any;

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
  @Prop() required?: boolean = false;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * An optional message that will be read by screen readers when the input is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The maximum number of characters allowed in the input.
   * Negative and zero values will be ignored.
   */
  @Prop() maxlength?: number;

  /**
   * The value of the textarea
   */
  @Prop({ mutable: true, reflect: true }) value?: string;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Whether the component should show a character count message.
   * Has no effect without uswds and maxlength being set.
   */
  @Prop() charcount?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when
   * the textarea is blurred and `enableAnalytics` is true
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
  };

  private handleBlur = () => {
    // Only fire the analytics event if enabled and value is not null
    if (this.enableAnalytics && this.value) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-textarea',
        action: 'blur',
        details: {
          label: this.label,
          value: this.value,
        },
      });
    }
  };

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

  render() {
    const {
      label,
      error,
      placeholder,
      name,
      required,
      value,
      hint,
      uswds,
      charcount,
      messageAriaDescribedby
    } = this;

    const maxlength = this.getMaxlength();
    const ariaDescribedbyIds = `${error ? 'input-error-message' : ''} ${
      charcount && maxlength ? 'charcount-message' : ''} ${
      messageAriaDescribedby ? 'input-message' : ''}`.trim() || null;

    if (uswds) {
      const charCountTooHigh = charcount && (value?.length > maxlength);
      const labelClass = classnames({
        'usa-label': true,
        'usa-label--error': error,
      });
      const inputClass = classnames({
        'usa-textarea': true,
        'usa-input--error': error,
      });
      const messageClass = classnames({
        'usa-hint': true,
        'usa-character-count__status': charcount,
        'usa-character-count__status--invalid': charcount && maxlength && value?.length > maxlength
      });
      return (
        <Host>
          {label && (
            <label htmlFor="input-type-textarea" class={labelClass} part="label">
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
          <slot></slot>
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span>
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <textarea
            class={inputClass}
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={error || charCountTooHigh ? 'true' : 'false'}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            id="input-type-textarea"
            placeholder={placeholder}
            name={name}
            maxLength={charcount ? undefined : maxlength}
            value={value}
            part="input-type-textarea"
          />
          {!charcount && maxlength && value?.length >= maxlength && (
              <span class={messageClass} aria-live="polite">
              {i18next.t('max-chars', { length: maxlength })}
              </span>
          )}
          {charcount && maxlength && (
            <span id="charcount-message" class={messageClass} aria-live="polite">
              {getCharacterMessage(value, maxlength)}
            </span>
          )}
          {messageAriaDescribedby && (
            <span id="input-message" class="sr-only">
              {messageAriaDescribedby}
            </span>
          )}
        </Host>
      );
    } else {
      return (
        <Host>
          <label htmlFor="textarea">
            {label}
            {required && <span class="required">{i18next.t('required')}</span>}
            {hint && <span class="hint-text">{hint}</span>}
          </label>
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span> {error}
              </Fragment>
            )}
          </span>
          <textarea
            aria-describedby={ariaDescribedbyIds}
            aria-invalid={error ? 'true' : 'false'}
            onInput={this.handleInput}
            onBlur={this.handleBlur}
            id="textarea"
            placeholder={placeholder}
            name={name}
            maxLength={maxlength}
            value={value}
            part="textarea"
          />
          {maxlength && value?.length >= maxlength && (
            <small>{i18next.t('max-chars', { length: maxlength })}</small>
          )}
          {messageAriaDescribedby && (
            <span id="input-message" class="sr-only">
              {messageAriaDescribedby}
            </span>
          )}
        </Host>
      );
    }
  }
}
