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
  State,
} from '@stencil/core';
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
  private fileInputRef!: HTMLInputElement;

  @Element() el: HTMLElement;
  @State() file?: File;
  @State() dragActive: boolean = false;
  @State() uploadStatus: 'idle' | 'uploading' | 'success' | 'failure' = 'idle';

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
  // @Prop() multiple?: boolean = false; NOTE: disabling temporarily

  /**
   * Emit component-library-analytics events on the file input change event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uploadPercentage?: number;

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
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('success')
      this.file = input.files[0];
      this.vaChange.emit({ files: [this.file] });
      this.uploadStatus = 'success';
    } else
      console.log('fail');

    input.value = '';

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

  private removeFile = () => {
    this.file = undefined;
    this.uploadStatus = 'idle';
  }

  private changeFile = () => {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  }

  /**
   * Makes sure the button text always has a value.
   * @returns string - Button text to render.
   */
  private getButtonText = (): string => {
    return this.buttonText ? this.buttonText : 'Upload file';
  };

  private formatFileSize = (filesSize): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (filesSize === 0)
      return '0 B';

    const unitIndex = Math.floor(Math.log(filesSize) / Math.log(1024));
    if (unitIndex === 0)
      return `${filesSize} ${units[unitIndex]}`;

    const sizeInUnit = (filesSize / Math.pow(1024, unitIndex));
    const formattedSize = sizeInUnit.toFixed(unitIndex < 2 ? 0 : 1);
    return `${formattedSize} ${units[unitIndex]}`;
  }

  componentDidLoad() {
    if (this.uswds) fileInput.init(this.el);
  }

  connectedCallback() {
    if (this.uswds) {
      this.el.addEventListener('change', this.handleChange);
    }
  }

  disconnectedCallback() {
    if (this.uswds) {
      this.el.removeEventListener('change', this.handleChange);
    }
  }

  render() {
    const { label, name, required, accept, error, hint, uswds, file, uploadStatus, uploadPercentage } = this;

    const text = this.getButtonText();

    if (uswds) {
      const ariaDescribedbyIds =
        `${hint ? 'input-hint-message' : ''} ${
          error ? 'input-error-message' : ''
        }`.trim() || null; // Null so we don't add the attribute if we have an empty string

      return (
        <Host>
          {label && (
            <div class="label-header">
              <label htmlFor="fileInputButton" part="label">
                {label}
                {required && (
                  <span>
                    {' '}
                    {i18next.t('required')}
                  </span>
                )}
              </label>
            </div>
          )}
          {hint && (
            <div id="input-hint-message">{hint}</div>
          )}
          <slot></slot>
          <div id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="sr-only">{i18next.t('error')}</span>
                <span>{error}</span>
              </Fragment>
            )}
          </div>
          <div class="file-input-wrapper">
            <input
              id="fileInputField"
              class="file-input"
              style={{ visibility: this.uploadStatus === 'success' || this.uploadStatus === 'uploading' ? 'hidden' : 'unset' }}
              type="file"
              ref={el => this.fileInputRef = el as HTMLInputElement}
              name={name}
              accept={accept}
              aria-describedby={ariaDescribedbyIds}
              onChange={this.handleChange}
            />
            {uploadStatus === 'idle' && (
              <div>
                <div class="sr-only">No files selected.</div>
                <div class="file-input-target">
                  <div class="file-input-box"></div>
                  <div class="file-input-instructions">
                    <span class="file-input-drag-text">Drag files here or </span>
                    <span class="file-input-choose-text">choose from folder</span>
                  </div>
                </div>
              </div>
            )}
            {uploadStatus !== 'idle' && (
              <div class="selected-files-wrapper">
                <div class="selected-files-label">Selected files</div>
                <va-card>
                  <div class="file-info-section">
                    <va-icon icon="file_present" size={5} class="file-icon"></va-icon>
                    <span class="file-label">{file.name}</span>
                    <span class="file-size-label">{this.formatFileSize(file.size)}</span>
                    {uploadStatus === 'uploading' && (
                      <span>(Uploading...)</span>
                    )}
                  </div>
                  {uploadStatus === 'uploading' && uploadPercentage && (
                    <div>
                      <va-progress-bar percent={uploadPercentage}></va-progress-bar>
                      <div>
                        <va-button-icon onClick={this.removeFile} buttonType="cancel" label="Cancel"
                        />
                      </div>
                    </div>
                  )}
                  {uploadStatus === 'success' && file && (
                    <div class="file-button-section">
                      <va-button-icon buttonType="change-file" onClick={this.changeFile} label="Change file"></va-button-icon>
                      <va-button-icon buttonType="delete" onClick={this.removeFile} label="Delete"></va-button-icon>
                    </div>
                  )}
                </va-card>
              </div>
            )}
          </div>
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
            class="uswds-false"
            uswds={false}
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
