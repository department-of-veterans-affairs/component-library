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
import i18next from 'i18next';

/**
 * @nativeHandler onInput
 * @nativeHandler onBlur
 * @componentName Number input
 * @maturityCategory use
 * @maturityLevel deployed
 */
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
      handleBlur,
      handleInput,
    } = this;
    return (
      <Host>
        <label htmlFor="inputField">
          {label}{' '}
          {required && <span class="required">{i18next.t('required')}</span>}
        </label>
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">{i18next.t('error')}</span> {error}
            </Fragment>
          )}
        </span>
        <input
          aria-describedby={error ? 'error-message' : undefined}
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
        />
      </Host>
    );
  }
}
