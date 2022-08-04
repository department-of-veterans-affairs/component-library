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
   * The text displayed on the button.
   */
  @Prop() buttontext?: string = i18next.t('Upload a document or file');

  /**
   * Set the input to required and render the (Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * The error message to render.
   */
  @Prop() error?: string;

  /**
   * The event emitted when the input value changes.
   */
   @Event() vaChange: EventEmitter;

  private handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    this.vaChange.emit(target.files);
    // eslint-disable-next-line i18next/no-literal-string
    console.log('target.files', target.files)
  };

  private handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      document.getElementById('fileInputField').click();
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
    const { label, buttontext, required, error } = this;
    return (
      <Host>
        {/* TODO:  additionalClass? */}
        <div class="hello-world">
          {label && (
            <label htmlFor="fileInputField" part="label">
              {label}{' '}
              {required && <span class="required">{i18next.t('required')}</span>}
            </label>
          )}
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
          {/* TODO: Add props */}
          <input
              multiple={false}
              style={{ display: 'none' }}
              type="file"
              accept="jpg,jpeg"
              id="fileInputField"
              name="my-input"
              onInput={this.handleInput}
            />
        </div>
      </Host>
    );
  }

}
