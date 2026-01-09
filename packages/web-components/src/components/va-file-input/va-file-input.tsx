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
  Watch,
  forceUpdate,
  Listen
} from '@stencil/core';
import { fileInput } from './va-file-input-upgrader';
import { UploadedFile } from './uploadedFile';
import {
  focusOnChangeButton,
  focusOnInputAfterAriaLabelUpdate,
  focusOnPasswordInput,
  formatFileSize,
  getAriaLabelsForInputAndButtons,
  isAcceptedFileType,
  getFileTypeErrorMessage,
  normalizeAcceptProp,
  renderErrorAlert,
  renderFileThumbnail,
  renderLabelOrHeader,
  renderUploadMessage,
} from './utils';

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
  private fileType?: string;
  private delayPasswordInputFocusUntilWindowFocus: boolean = false;
  private delayChangeButtonFocusUntilWindowFocus: boolean = false;
  private slottedContent: HTMLElement[] = null;
  private windowHasFocus: boolean = true;
  private initialUploadAttemptHasTakenPlace: boolean = false;

  @Element() el: HTMLElement;

  @State() file?: File;
  @State() fileContents?: string;
  @State() internalError?: string;
  @State() showModal: boolean = false;
  @State() showSeparator: boolean = true;

  // don't generate previews for files bigger than limit because this can lock main thread
  FILE_PREVIEW_SIZE_LIMIT = 1024 * 1024 * 5;

  /**
   * The label for the file input.
   */
  @Prop() label?: string;

  /**
   * The name for the input element.
   */
  @Prop() name?: string;

  /**
   * The value attribute for the file view element.
   */
  @Prop() value?: File;

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
   * Optional file status, ex: "Uploading...", "Uploaded".
   */
  @Prop() statusText?: string;

  /**
   * Custom instructional message in the file input.
   */
  @Prop() uploadMessage?: HTMLElement = null;

  /**
   * Emit component-library-analytics events on the file input change event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Optionally specifies the size of the header element to use instead of the base label.
   * Accepts a number from 1 to 6, corresponding to HTML header elements h1 through h6.
   * If not provided, defaults to standard label styling.
   */
  @Prop() headerSize?: number;

  /**
   * DST only prop
   * removes extraneous display for multiple file input
   */
  @Prop() headless?: boolean = false;

  /**
   * Optionally displays the read-only view
   */
  @Prop() readOnly?: boolean = false;

  /**
   * When true, displays a password field.
   *
   * Note: This component does not check if a file is encrypted. For encryption checks, see: [Checking if an uploaded PDF is encrypted](https://depo-platform-documentation.scrollhelp.site/developer-docs/checking-if-an-uploaded-pdf-is-encrypted)
   */
  @Prop() encrypted?: boolean = false;

  /**
   * Object representing a previously uploaded file. Example: `{ name: string, type: string, size: number}`
   */
  @Prop({ mutable: true }) uploadedFile?: UploadedFile;

  /**
   * Maximum allowed file size in bytes.
   */
  @Prop() maxFileSize?: number = Infinity;

  /**
   * Minimum allowed file size in bytes.
   */
  @Prop() minFileSize?: number = 0;

  /**
   * Percent upload completed. For use with va-progress-bar component
   */
  @Prop({ mutable: true, reflect: true }) percentUploaded?: number = null;

  /**
   * Error message for the encrypted password input
   */
  @Prop() passwordError?: string;

  /**
   * The event emitted when the file input value changes.
   */
  @Event() vaChange: EventEmitter;

  /**
   * The event emitted when the file input password value changes.
   */
  @Event() vaPasswordChange: EventEmitter;

  /**
   * The event emitted when adding a file results in an error, e.g. exceeding max file size
   */
  @Event() vaFileInputError: EventEmitter

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

  @Watch('error')
  handleExternalErrorChange(newError: string, oldError: string) {
    // If component gets two consecutive errors make sure state resets both
    // times
    if (oldError && newError) {
      this.resetState();
    }
    else if (newError) {
      // When an external error is set, focus on the input after a short delay
      // to help with screen reader announcement and ensure that the aria label
      // has been updated.
      focusOnInputAfterAriaLabelUpdate(this.fileInputRef);
    }
  }

  @Watch('internalError')
  handleInternalErrorChange(value: string) {
    // Either focus on change button immediately or flip flag to delay focus based
    // on current window focus state.
    if (value && this.windowHasFocus) {
      focusOnChangeButton(this.el);
    } else if (value && !this.windowHasFocus) {
      this.delayChangeButtonFocusUntilWindowFocus = true;
    }
  }

  @Watch('percentUploaded')
  percentHandler(value: number) {
    if (value >= 100) {
      this.resetState();
    }
  }

  @Watch('showModal')
  handleShowModalChange(value: boolean) {
    // When modal is closed and there is no file selected, a file deletion has
    // taken place. Focus on the input to ensure screen reader announcement.
    if (!value && !this.file) {
      focusOnInputAfterAriaLabelUpdate(this.fileInputRef);
    }
  }

  @Watch('statusText')
  handleStatusTextChange(value: string) {
    if (value) {
      focusOnInputAfterAriaLabelUpdate(this.fileInputRef);
    }
  }

  @Watch('encrypted')
  handleEncryptedChange(newValue: boolean) {
    if (newValue && this.file) {
      this.windowHasFocus
        ? focusOnPasswordInput(this.el)
        : this.delayPasswordInputFocusUntilWindowFocus = true;
    }
  }

  @Watch('file')
  handleFileChange(newFile: File, oldFile: File) {
    // Additional check to ensure encryption focus takes place when a user changes
    // from one encrypted file to another encrypted file.
    if (newFile && newFile !== oldFile && this.encrypted) {
      this.windowHasFocus
        ? focusOnPasswordInput(this.el)
        : this.delayPasswordInputFocusUntilWindowFocus = true;
    }
  }

  @Watch('value')
  handleValueChange(newValue: File) {
    // Process new value if it's different from current file
    if (newValue && newValue !== this.file) {
      // Note that we skip focusing on input since this change is not triggered
      // by user interaction.
      this.handleFile(newValue, false, true);
    }
    // If new value is null/undefined, remove the current file and focus on input
    else if (!newValue) {
      this.removeFile(false);
    }
  }

  @Listen('blur', { target: 'window' })
  /**
   * Handles the window blur event to track when the browser window loses focus.
   * @returns {void}
   */
  handleWindowBlur(): void {
    this.windowHasFocus = false;
  }

  @Listen('focus', { target: 'window' })
  /**
   * Handles the window focus event to manage focus on interactive child elements.
   * This is necessary due to the way that browsers handle focus and screen reader
   * announcements differently after users interact with native file dialogs. For
   * example, Chrome will announce the focused element as soon as a file is input,
   * but Safari and Firefox will not make the announcement until the browser window
   * regains focus.
   * @returns {void}
   */
  handleWindowFocus(): void {
    this.windowHasFocus = true;

    // Stop if no focus delays are pending
    if (!this.delayChangeButtonFocusUntilWindowFocus &&
        !this.delayPasswordInputFocusUntilWindowFocus) {
      return;
    }

    //
    // If focus is returning from outside of the browser window we may need to
    // set focus on interactive child elements based on the current state. This
    // is determined by any delay*UntilWindowFocus flags being `true`.
    //
    // States to consider by priority:
    //   1. Internal error (target: "Change File" button)
    //   2. Encrypted file uploaded (target: <input> element in <va-text-input>)
    //
    // Change file button
    if (this.delayChangeButtonFocusUntilWindowFocus) {
      this.delayChangeButtonFocusUntilWindowFocus = false;
      focusOnChangeButton(this.el);
      return;
    }
    // Password input
    else if (this.delayPasswordInputFocusUntilWindowFocus && (this.encrypted || this.passwordError)) {
      this.delayPasswordInputFocusUntilWindowFocus = false;
      focusOnPasswordInput(this.el);
    }
  }

  /**
   * Called when file has been uploaded with an error or file upload has been
   * cancelled.
   */
  private resetState() {
    this.fileContents = null;
    this.percentUploaded = null;
    forceUpdate(this.el);
  }

  private handleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.fileContents = null;
    if (input.files && input.files.length > 0) {
      this.handleFile(input.files[0], true);
    }
  }

  /**
   * Handler for the drop event when a file is dragged and dropped onto the file input area.
   * Prevents default browser behavior for the event and calls handleFile method
   * to process the dropped file.
   * @param {DragEvent} event - The drag event object.
   * @returns {void}
   */
  private handleDrop = (event: DragEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      this.handleFile(files[0], true);
    }
  }

  /**
   * Function to process a file after it has been selected or dropped.
   * Validates the file type and size, updates component state, and emits events as needed.
   * @param {File} file - The file to be processed.
   * @param {boolean} emitChange - Whether to emit a change event.
   * @param {boolean} skipInputFocus - Whether to skip focusing on the input element after processing.
   * @returns {void}
   */
  private handleFile(
    file: File,
    emitChange: boolean = true,
    skipInputFocus: boolean = false
  ): void {
    // Ensure that the flag to track the first upload attempt is set to `true`
    // for conditional setting of `inputAriaLabel` in the render method.
    this.initialUploadAttemptHasTakenPlace = true;

    let fileError: string | null = null;

    // Validate file against accept types (i.e. if only PDF files are accepted)
    if (this.accept) {
      const normalizedAcceptTypes = normalizeAcceptProp(this.accept);
      if (!isAcceptedFileType(file.type, normalizedAcceptTypes)) {
        this.removeFile(false);
        fileError = getFileTypeErrorMessage(file);
      }
    }

    if (file.size === 0) {
      fileError = `The file you selected is empty. Files must be larger than 0B.`;
    }

    if (file.size > this.maxFileSize) {
      fileError = `
        We can't upload your file because it's too big. Files must be less than ${formatFileSize(this.maxFileSize)}.`;
    }

    if (file.size < this.minFileSize) {
      fileError = `We can't upload your file because it's too small. Files must be at least ${formatFileSize(this.minFileSize)}.`;
    }

    // we need the file if there is an error to display its properties
    this.uploadedFile = null;
    this.file = file;

    if (fileError) {
      this.internalError = fileError;
      this.vaFileInputError.emit({ error: fileError });
      this.resetState();
      return;
    }

    if (emitChange) {
      this.vaChange.emit({ files: [this.file] });
    }

    this.internalError = null;

    if (file.size < this.FILE_PREVIEW_SIZE_LIMIT) {
      this.generateFileContents(this.file);
    }

    // Focus on the input after a short delay to help with screen reader announcement.
    // Note that if a file is encrypted, focus will be handled in the encrypted
    // watcher and will take priority over this focus call.
    if (!skipInputFocus) {
      focusOnInputAfterAriaLabelUpdate(this.fileInputRef);
    }

    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-file-input',
        action: 'change',
        details: {
          label: this.label,
        },
      });
    }
  }

  private removeFile = (notifyParent: boolean = true) => {
    this.internalError = null;
    if (notifyParent) {
      this.vaChange.emit({ files: [] });
    }
    this.file = null;
    this.uploadedFile = null;
    // We need to ensure that the value attribute of the input element is cleared
    // so that subsequent uploads of the same file will trigger the change event.
    if (this.fileInputRef) {
      this.fileInputRef.value = '';
    }

    this.closeModal();
  };

  private openModal = () => {
    // set the status attribute here not in markup or it will have no effect
    const modal = this.el.shadowRoot.querySelector('va-modal');
    modal.setAttribute('status', 'warning');
    this.showModal = true;
  };

  private closeModal = () => {
    this.showModal = false;
  };

  private changeFile = () => {
    if (this.fileInputRef) {
      this.fileInputRef.click();
    }
  };

  private async generateFileContents(file: File) {
    if (!file) return;

    // check if file is a dummy file - e.g. from prefilling a form with already uploaded file
    // in this case we want to use the standard file icon
    const slice = file.slice(0, 20);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);
    const zeroCheck = bytes.every(byte => byte === 0);
    if (zeroCheck) return;

    const reader = new FileReader();
    this.fileType = file.type;

    reader.onloadend = () => {
      this.fileContents = reader.result as string;
    };

    if (
      this.fileType &&
      (this.fileType === 'application/pdf' ||
        this.fileType.startsWith('image/')) && ! this.fileType.includes('heic')
    ) {
      reader.readAsDataURL(file);
    }
  }

  private handlePasswordChange(e) {
    this.vaPasswordChange.emit( {password: e.target.value} );
  }

  /**
   * This method checks if there is "additional info" content in the default slot,
   * or if a file has been uploaded and the change/delete buttons need to show,
   * and shows or hides the "separator" horizontal rule as needed.
   */
  componentWillRender() {
    this.slottedContent = Array.from(this.el.querySelectorAll(':scope > *'));

    // If there is a passed uploaded file and the initial upload attempt has
    // not yet been made, process the uploaded file and flip the flag to indicate
    // that the first upload attempt has been made. This is particularly important
    // for instances in va-file-input-multiple that are not the first file input
    // in the list.
    if (this.value && !this.file && !this.initialUploadAttemptHasTakenPlace) {
      // Skip focusing on input since this is the initial upload attempt that is
      // not triggered by user interaction.
      this.handleFile(this.value, false, true);
      this.initialUploadAttemptHasTakenPlace = true;
    }

    const needsButtons = (!!this.value || !!this.file) && !this.readOnly;
    this.showSeparator =
      this.slottedContent.length > 0 || needsButtons;
  }

  componentDidLoad() {
    fileInput.init(this.el);
  }

  render() {
    const {
      label,
      name,
      required,
      accept,
      error,
      hint,
      initialUploadAttemptHasTakenPlace,
      uploadMessage,
      headerSize,
      fileContents,
      fileType,
      headless,
      readOnly,
      encrypted,
      statusText,
      uploadedFile,
      percentUploaded,
      passwordError,
      internalError,
    } = this;

    // these values may get updated after call to this.handleFile above
    const { file } = this;

    const displayError = error || internalError;

    const fileInputTargetClasses = `file-input-target ${
      displayError ? 'file-input-target-error' : ''
    }`.trim();

    let selectedFileClassName = headless
      ? 'headless-selected-files-wrapper'
      : 'selected-files-wrapper';

    const showProgBar = percentUploaded !== null && percentUploaded < 100;

    let statusClassNames = 'file-status-label'
    if (showProgBar) {
      statusClassNames = `${statusClassNames} uploading-status`;
    }

    const { inputAriaLabel, deleteFileAriaLabel, changeFileAriaLabel } =
      getAriaLabelsForInputAndButtons(
        label,
        required,
        displayError,
        initialUploadAttemptHasTakenPlace,
        file,
        uploadedFile,
      );

    return (
      <Host class={{ 'has-error': !!displayError }}>
        {!readOnly && !headless && (
          <span>
            {label && renderLabelOrHeader(label, required, headerSize)}
          </span>
        )}
        {hint && !readOnly && !headless && (
          <div class="usa-hint" id="input-hint-message">
            {hint}
          </div>
        )}

        {/*
          Note: ideally we would handle the drop event via Stencil's Listen() decorator,
          but that does not consistently work across browsers, likely due to
          the event not bubbling up through the Shadow DOM consistently (i.e. Chrome
          does not recognize the drop event for child elements).
        */}
        <div class="file-input-wrapper" onDrop={this.handleDrop}>
          <input
            id="fileInputField"
            class={`file-input ${file || uploadedFile ? 'with-file' : ''}`}
            aria-label={inputAriaLabel}
            type="file"
            ref={el => (this.fileInputRef = el as HTMLInputElement)}
            name={name}
            accept={accept}
            onChange={this.handleChange}
          />

          { !uploadedFile && !file  ?
            // Initial state - no file selected
            <div>
              <span id="file-input-error-alert">
                {renderErrorAlert(displayError)}
              </span>

              <div class={fileInputTargetClasses}>
                <div class="file-input-box"></div>
                <div class="file-input-instructions">
                  {renderUploadMessage(uploadMessage)}
                </div>
              </div>
            </div>
          : (
            // File selected state
          <div class={selectedFileClassName}>
            {!headless && (
              <div class="selected-files-label">
                {readOnly ? 'Files you uploaded' : 'Selected files'}
              </div>
            )}

            <va-card class="va-card">
              <div class="file-info-section">
                {renderFileThumbnail(displayError, fileContents, fileType)}
                <div class="file-info-group vads-u-line-height--2">
                  <span class="file-label">{file ? file.name : uploadedFile.name}</span>

                  {renderErrorAlert(displayError)}

                  {!showProgBar && <span class="file-size-label">
                    {formatFileSize(file ? file.size : uploadedFile.size)}
                  </span>}

                  {(showProgBar || statusText) &&
                    <span class={statusClassNames}>
                      {showProgBar ? 'Uploading...' : statusText}
                    </span>
                  }

                </div>
              </div>
                <div class={this.showSeparator ? 'with-separator' : undefined}>
                  {!readOnly && showProgBar &&
                    (
                      <div class="progress-bar-and-cancel-button">
                        <va-progress-bar percent={percentUploaded} noPercentScreenReader />
                        <va-button-icon buttonType="cancel" onClick={this.resetState.bind(this)} />
                      </div>
                    )
                  }

                  {!showProgBar && (
                    <Fragment>
                      {encrypted && (
                        <va-text-input
                          type="password"
                          onInput={(e) =>{this.handlePasswordChange(e)}}
                          label="File password"
                          required
                          error={passwordError}
                        />
                      )}
                      <div class="additional-info-slot">
                        <slot></slot>
                      </div>
                    </Fragment>
                  )}

                  {!readOnly && !showProgBar &&
                    (
                      <Fragment>
                        <div class="file-button-section">
                          <va-button-icon
                            buttonType="change-file"
                            onClick={this.changeFile}
                            label={changeFileAriaLabel}
                            ></va-button-icon>
                          <va-button-icon
                            buttonType="delete"
                            onClick={this.openModal}
                            label={deleteFileAriaLabel}
                          ></va-button-icon>
                        </div>

                        <va-modal
                          modalTitle="Delete this file?"
                          visible={this.showModal}
                          primaryButtonText="Yes, delete this"
                          secondaryButtonText="No, keep this"
                          onCloseEvent={this.closeModal}
                          onPrimaryButtonClick={() => this.removeFile(true)}
                          onSecondaryButtonClick={this.closeModal}
                        >
                          We'll delete the uploaded file{' '}
                          <span class="file-label">{file ? file.name : uploadedFile.name}</span>
                        </va-modal>
                      </Fragment>
                    )
                  }
                </div>
              </va-card>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
