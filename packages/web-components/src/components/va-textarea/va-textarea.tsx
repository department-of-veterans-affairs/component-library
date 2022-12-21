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
import i18next from 'i18next';
import { consoleDevError } from '../../utils/utils';

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
  styleUrl: 'va-textarea.css',
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
    const { label, error, placeholder, name, required, value, hint } = this;
    const maxlength = this.getMaxlength();

    return (
      <Host>
        <label htmlFor="textarea">
          {label}
          {required && <span class="required">{i18next.t('required')}</span>}
        </label>
        {hint && <span class="hint-text">{hint}</span>}
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">{i18next.t('error')}</span> {error}
            </Fragment>
          )}
        </span>

        <textarea
          aria-describedby={error ? 'error-message' : undefined}
          aria-invalid={error ? 'true' : 'false'}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          id="textarea"
          placeholder={placeholder}
          name={name}
          maxLength={maxlength}
          value={value}
        />
        {maxlength && value?.length >= maxlength && (
          <small>{i18next.t('max-chars', { length: maxlength })}</small>
        )}
      </Host>
    );
  }
}
