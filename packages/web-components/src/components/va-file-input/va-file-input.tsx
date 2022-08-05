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
   * The text displayed on the button.
   */
  @Prop() buttontext?: string = i18next.t('Upload a document or file');

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
   * The event emitted when the input value changes.
   */
   @Event() vaChange: EventEmitter;

  private handleChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.vaChange.emit(target.files);
    /**
     * clear the original input, otherwise events will be triggered
     * with empty file arrays and sometimes uploading a file twice will
     * not work.
     * TODO: this is from the React version. Try to repro the issue it's 
     * solving for.
     */
    target.value = null;
    // TODO: For testing only.
    // eslint-disable-next-line i18next/no-literal-string
    console.log('target.files', target.files);
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.el.shadowRoot.getElementById('fileInputField').click();
    }
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
      name, 
      buttontext, 
      required, 
      multiple,
      accept,
      error 
    } = this;
    return (
      <Host>
        {label && (
          <label htmlFor="fileInputField" part="label">
            {label}{' '}
            {required && <span class="required">{i18next.t('required')}</span>}
          </label>
        )}
        {/* TODO: Check positioning of the slot for displaying progress bar & file name */}
        <slot></slot>
          {/* TODO: Error style */}
        <span id="error-message" role="alert">
          {error && (
            <Fragment>
              <span class="sr-only">{i18next.t('error')}</span> 
              {error}
            </Fragment>
          )}
        </span>
        {/* TODO: Progress bar? */}
        <label
          role="button"
          tabIndex={0}
          htmlFor="fileInputField"
          onKeyPress={this.handleKeyPress}
          aria-describedby={error ? 'error-message' : undefined}
          class="file-input-button"
        >
          {buttontext}
        </label>
        <input
            multiple={multiple}
            style={{ display: 'none' }}
            type="file"
            accept={accept}
            id="fileInputField"
            name={name}
            onChange={this.handleChange}
          />
      </Host>
    );
  }

}
