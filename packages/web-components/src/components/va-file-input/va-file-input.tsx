import { 
  Component, 
  Element, 
  Host, 
  h, 
  Prop, 
  Build, 
  forceUpdate,
  Fragment,
  Event,
  EventEmitter
} from '@stencil/core';
import i18next from 'i18next';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

@Component({
  tag: 'va-file-input',
  styleUrl: 'va-file-input.css',
  shadow: true,
})

export class VaFileInput {
  @Element() el: HTMLElement;

  /**
   * The label for the button input.
   */
  @Prop() label?: string;

  /**
   * The name for the input element.
   */
  @Prop() name?: string;

  /**
   * The text displayed on the button
   */
  @Prop() buttonText!: string;

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * Allow the input to accept multiple files.
   */
  @Prop() multiple?: boolean = false;

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
   * Unable to set a default text value when the prop is marked
   * as required so generating the default text with this utility.
   * @returns 
   */
  private getButtonText = (): string => {
    // eslint-disable-next-line i18next/no-literal-string
    return this.buttonText ? this.buttonText : 'Upload file';
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
      name, 
      required, 
      multiple,
      accept,
      error,
    } = this;
    
    const text = this.getButtonText();

    return (
      <Host>
        {label && (
          <label htmlFor="fileInputButton">
            {label}
            {required && <span class="required">{i18next.t('required')}</span>}
          </label>
        )}
        <slot></slot>
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">{i18next.t('error')}</span> 
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
          aria-describedby={error ? 'error-message' : undefined}
        />
        <input
            id="fileInputField"
            class="hidden"
            multiple={multiple}
            type="file"
            accept={accept}
            name={name}
            onChange={this.handleChange}
          />
      </Host>
    );
  }

}
