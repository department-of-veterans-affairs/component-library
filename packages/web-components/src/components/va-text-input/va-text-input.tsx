import {
  Component,
  Element,
  Prop,
  Host,
  h,
  Event,
  EventEmitter,
  forceUpdate,
} from '@stencil/core';
import i18next from 'i18next';
import { Build } from '@stencil/core';
import { consoleDevError } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @nativeHandler onInput
 * @nativeHandler onBlur
 */
@Component({
  tag: 'va-text-input',
  styleUrl: 'va-text-input.css',
  shadow: true,
})
export class VaTextInput {
  @Element() el: HTMLElement;

  /**
   * Input types we will allow to be specified with the "type" prop.
   */
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
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean;

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
   */
  @Prop() maxlength?: number;

  /**
   * The minimum number of characters allowed in the input.
   */
  @Prop() minlength?: number;

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
   * The regular expression that the input element's value is checked against on submission
   */
  @Prop() pattern?: string;

  /**
   * The value for the input.
   */
  @Prop({ mutable: true, reflect: true }) value?: string;
  // TODO: Make the value prop reflective. Currently, it isn't because it screws
  // up the input behavior. For now, the only "bug" is that the changed value
  // isn't reflected in the DOM on the web component. That seems to be how the
  // <input> is supposed to work, however:
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-value
  //
  // $('va-text-input').value will be correct
  // $('va-text-input').getAttribute('value') will be incorrect

  /**
   * Adds styling based on status value
   */
  @Prop() success?: boolean;

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
      return 'text';
    }

    return this.type;
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
    const describedBy = this.error ? 'error-message' : null; // Null so we don't add the attribute if we have an empty string
    const inputMode = this.inputmode ? this.inputmode : null; // Null so we don't add the attribute if we have an empty string
    const type = this.getInputType();

    return (
      <Host>
        {this.label && (
          <label htmlFor="inputField" part="label">
            {this.label}{' '}
            {this.required && (
              <span class="required">(*{i18next.t('required')})</span>
            )}
          </label>
        )}
        <slot></slot>
        {this.error && <span id="error-message">{this.error}</span>}
        <input
          id="inputField"
          type={type}
          value={this.value}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          aria-describedby={describedBy}
          inputmode={inputMode}
          maxlength={this.maxlength}
          minlength={this.minlength}
          pattern={this.pattern}
          name={this.name}
          required={this.required || null}
          part="input"
        />
        {this.maxlength && this.value?.length >= this.maxlength && (
          <small aria-live="polite" part="validation">
            ({i18next.t('max-chars', { length: this.maxlength })})
          </small>
        )}
        {this.minlength && this.value?.length < this.minlength && (
          <small aria-live="polite" part="validation">
            (Min. {this.minlength} characters)
          </small>
        )}
      </Host>
    );
  }
}
