/* eslint-disable i18next/no-literal-string */
import { 
  Component, 
  Element, 
  Host, 
  h, 
  Prop, 
  Fragment,
  Event,
  EventEmitter
} from '@stencil/core';

/**
 * @componentName File input
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref form/file-input
 */

@Component({
  tag: 'va-file-input',
  styleUrl: 'va-file-input.css',
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
   * Emit component-library-analytics events on the file input change event.
   */
   @Prop() enableAnalytics?: boolean = false;

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
    this.vaChange.emit({files: target.files});
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
          label: this.label
        },
      });
    }
  };

  private handleButtonClick = () => { 
    this.el.shadowRoot.getElementById('fileInputField').click();
  }

  /**
   * Makes sure the button text always has a value.
   * @returns string - Button text to render.
   */
  private getButtonText = (): string => {
    return this.buttonText ? this.buttonText : 'Upload file';
  };

  render() {
    const { 
      label,
      name, 
      required, 
      accept,
      error,
    } = this;
    
    const text = this.getButtonText();

    return (
      <Host>
        {label && (
          <label htmlFor="fileInputButton">
            {label}
            {required && <span class="required">(*Required)</span>}
          </label>
        )}
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
          onClick={this.handleButtonClick}
          secondary
          text={text}
          label={label}
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
