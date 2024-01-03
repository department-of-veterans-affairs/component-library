/* eslint-disable i18next/no-literal-string */
import {
  Component,
  Element,
  Host,
  h,
  Prop,
  Fragment,
  Event,
  EventEmitter,
} from '@stencil/core';
import classnames from 'classnames';
import i18next from 'i18next';
import { fileInput } from './va-file-input-upgrader';

/**
 * @componentName File input
 * @maturityCategory caution
 * @maturityLevel available
 * @guidanceHref form/file-input
 */

@Component({
  tag: 'va-file-input',
  styleUrl: 'va-file-input.scss',
  shadow: true,
})
export class VaFileInput {
  @Element() el: HTMLElement;

  /**
   * The label for the file input.
   */
  @Prop() label?: string;

  /**
   * The name for the input element.
   */
  @Prop() name?: string;

  /**
   * The text displayed on the button.
   */
  @Prop() buttonText: string;

  /**
   * Sets the input to required and renders the (*Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * A comma-separated list of unique file type specifiers.
   */
  @Prop() accept?: string;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

  /**
   * Optionally allow multiple files (USWDS Only)
   */
  @Prop() multiple?: boolean = false;

  /**
   * Emit component-library-analytics events on the file input change event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop({ reflect: true }) uswds?: boolean = false;

  /**
   * The event emitted when the file input value changes.
   */
  @Event() vaChange: EventEmitter;

  /**
   * The event used to track usage of the component. This is emitted when the
   * file input changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.vaChange.emit({ files: target.files });
    /**
     * Clear the original input, otherwise events will be triggered
     * with empty file arrays and sometimes uploading a file twice will
     * not work.
     */
    target.value = null;

    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-file-input',
        action: 'change',
        details: {
          label: this.label,
        },
      });
    }
  };

  private handleButtonClick = () => {
    this.el.shadowRoot.getElementById('fileInputField').click();
  };

  /**
   * Makes sure the button text always has a value.
   * @returns string - Button text to render.
   */
  private getButtonText = (): string => {
    return this.buttonText ? this.buttonText : 'Upload file';
  };

  componentDidLoad() {
    if (this.uswds === true) fileInput.init(this.el);
  }

  render() {
    const { label, name, required, accept, error, hint, multiple, uswds } =
      this;

    const text = this.getButtonText();

    if (uswds) {
      const labelClass = classnames({
        'usa-label': true,
        'usa-label--error': error,
      });
      const inputClass = classnames({
        'usa-file-input': true,
        'usa-input--error': error,
      });
      const ariaDescribedbyIds =
        `${hint ? 'input-hint-message' : ''} ${
          error ? 'input-error-message' : ''
        }`.trim() || null; // Null so we don't add the attribute if we have an empty string

      return (
        <Host>
          {label && (
            <label htmlFor="fileInputButton" class={labelClass} part="label">
              {label}
              {required && (
                <span class="usa-label--required">
                  {' '}
                  {i18next.t('required')}
                </span>
              )}
            </label>
          )}
          {hint && (
            <span class="usa-hint" id="input-hint-message">
              {hint}
            </span>
          )}
          <slot></slot>
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span>
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <input
            id="fileInputField"
            class={inputClass}
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            aria-describedby={ariaDescribedbyIds}
          />
        </Host>
      );
    } else {
      return (
        <Host>
          {label && (
            <label htmlFor="fileInputButton">
              {label}
              {required && <span class="required">(*Required)</span>}
            </label>
          )}
          {hint && <span class="hint-text">{hint}</span>}
          <slot></slot>
          <span id="error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">Error</span>
                {error}
              </Fragment>
            )}
          </span>
          <va-button
            id="fileInputButton"
            aria-label={label}
            label={label}
            onClick={this.handleButtonClick}
            secondary
            text={text}
            aria-describedby={error ? 'error-message' : undefined}
          />
          <input
            id="fileInputField"
            hidden
            type="file"
            accept={accept}
            name={name}
            onChange={this.handleChange}
          />
        </Host>
      );
    }
  }
}
