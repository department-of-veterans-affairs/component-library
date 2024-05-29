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
  private uploadStatus: 'idle' | 'success' | 'failure' = 'idle';
  private fileType?: string;

  @Element() el: HTMLElement;
  @State() file?: File;
  @State() fileContents?: string;

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
   * Emit component-library-analytics events on the file input change event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * Optionally specifies the size of the header element to use instead of the base label.
   * Accepts a number from 1 to 6, corresponding to HTML header elements h1 through h6.
   * If not provided, defaults to standard label styling.
   */
  @Prop() headerSize?: number;

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
      this.file = input.files[0];
      this.vaChange.emit({ files: [this.file] });
      this.uploadStatus = 'success';
      this.generateFileContents(this.file);
    } else {
      this.uploadStatus = 'failure';
    }

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
    this.file = null;
    this.uploadStatus = 'idle';
  };

  private changeFile = () => {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  };

  private handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.file = files[0];
      this.vaChange.emit({ files: [this.file] });
      this.uploadStatus = 'success';
    }
  };

  /**
   * Makes sure the button text always has a value.
   * @returns string - Button text to render.
   */
  private getButtonText = (): string => {
    return this.buttonText ? this.buttonText : 'Upload file';
  };

  /**
   * Converts the size of a file from bytes to a more human-readable format for
   * rendering the file size label. This function calculates the file size in
   * appropriate units (B, KB, MB, GB, TB) based on the size provided. It uses
   * logarithmic scaling to determine the unit, then formats the size to one
   * decimal place for units KB and above.
   *
   * @param {number} filesSize - The size of the file in bytes.
   * @returns {string} The file size formatted as a string with the appropriate unit.
   */
  private formatFileSize = (filesSize): string => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    if (filesSize === 0) return '0 B';

    const unitIndex = Math.floor(Math.log(filesSize) / Math.log(1024));
    if (unitIndex === 0) return `${filesSize} ${units[unitIndex]}`;

    const sizeInUnit = filesSize / Math.pow(1024, unitIndex);
    const formattedSize = sizeInUnit.toFixed(unitIndex < 2 ? 0 : 1);
    return `${formattedSize}\xa0${units[unitIndex]}`;
  };

  private renderLabelOrHeader = (
    label: string,
    required: boolean,
    headerSize?: number,
  ) => {
    const requiredSpan = required ? (
      <span class="required"> {i18next.t('required')}</span>
    ) : null;
    if (headerSize && headerSize >= 1 && headerSize <= 6) {
      const HeaderTag = `h${headerSize}` as keyof JSX.IntrinsicElements;
      return (
        <div class="label-header">
          <HeaderTag
            htmlFor="fileInputField"
            part="label"
            class="label-header-tag"
          >
            {label}
            {requiredSpan}
          </HeaderTag>
        </div>
      );
    } else {
      return (
        <div class="label-header">
          <label htmlFor="fileInputField" part="label">
            {label}
            {requiredSpan}
          </label>
        </div>
      );
    }
  };

  private generateFileContents(file: File) {
    if (!file) return;

    const reader = new FileReader();
    this.fileType = file.type;

    reader.onloadend = () => {
      this.fileContents = reader.result as string;
    };

    if (
      this.fileType &&
      (this.fileType === 'application/pdf' ||
        this.fileType.startsWith('image/'))
    ) {
      reader.readAsDataURL(file);
    }
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
    const {
      label,
      name,
      required,
      accept,
      error,
      hint,
      uswds,
      file,
      uploadStatus,
      headerSize,
      fileContents,
      fileType,
    } = this;

    const text = this.getButtonText();

    if (uswds) {
      const ariaDescribedbyIds =
        `${hint ? 'input-hint-message' : ''} ${
          error ? 'input-error-message' : ''
        }`.trim() || null; // Null so we don't add the attribute if we have an empty string
      const fileInputTargetClasses = `file-input-target ${
        this.error ? 'file-input-target-error' : ''
      }`.trim();

      let fileThumbnail = (
        <div class="thumbnail-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="#07648d"
            width="40px"
            height="40px"
          >
            <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm160-14.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z" />
          </svg>
        </div>
      );
      if (fileContents) {
        if (fileType.startsWith('image/')) {
          fileThumbnail = (
            <div class="thumbnail-container">
              <img class="thumbnail-preview" src={fileContents} alt="image" />
            </div>
          );
        } else if (fileType === 'application/pdf') {
          fileThumbnail = (
            <div class="thumbnail-container">
              <object
                class="thumbnail-preview"
                data={fileContents}
                type="application/pdf"
              />
            </div>
          );
        }
      }

      return (
        <Host>
          {label && this.renderLabelOrHeader(label, required, headerSize)}
          {hint && (
            <div class="usa-hint" id="input-hint-message">
              {hint}
            </div>
          )}
          <span id="input-error-message" role="alert">
            {error && (
              <Fragment>
                <span class="usa-sr-only">{i18next.t('error')}</span>
                <span class="usa-error-message">{error}</span>
              </Fragment>
            )}
          </span>
          <div class="file-input-wrapper" onDrop={this.handleDrop}>
            <input
              id="fileInputField"
              class="file-input"
              style={{
                visibility:
                  this.uploadStatus === 'success' ? 'hidden' : 'unset',
              }}
              type="file"
              ref={el => (this.fileInputRef = el as HTMLInputElement)}
              name={name}
              accept={accept}
              aria-describedby={ariaDescribedbyIds}
              onChange={this.handleChange}
            />
            {uploadStatus === 'idle' && (
              <div>
                <div class="sr-only">No files selected.</div>
                <div class={fileInputTargetClasses}>
                  <div class="file-input-box"></div>
                  <div class="file-input-instructions">
                    <span class="file-input-drag-text">
                      Drag files here or{' '}
                    </span>
                    <span class="file-input-choose-text">
                      choose from folder
                    </span>
                  </div>
                </div>
              </div>
            )}
            {uploadStatus !== 'idle' && (
              <div class="selected-files-wrapper">
                <div class="selected-files-label">Selected files</div>
                <va-card class="va-card">
                  <div class="file-info-section">
                    {fileThumbnail}
                    <div class="file-info-group vads-u-line-height--2">
                      <span class="file-label">{file.name}</span>
                      <span class="file-size-label">
                        {this.formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  {file && (
                    <div>
                      <div class="additional-info-slot">
                        <slot></slot>
                      </div>
                      <div class="file-button-section">
                        <va-button-icon
                          buttonType="change-file"
                          onClick={this.changeFile}
                          label="Change file"
                        ></va-button-icon>
                        <va-button-icon
                          buttonType="delete"
                          onClick={this.removeFile}
                          label="Delete"
                        ></va-button-icon>
                      </div>
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
