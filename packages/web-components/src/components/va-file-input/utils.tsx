
import { h } from '@stencil/core';
import { extensionToMimeType } from './fileExtensionToMimeType';
import { i18next } from '../..';
import { UploadedFile } from './uploadedFile';

const chooseFileString: string ='choose from folder';
const dragFileString: string = 'Drag a file here or ';
const changeFileAriaLabelPrefix: string = 'change file.';
const deleteFileAriaLabelPrefix: string = 'delete file.';
const errorAriaLabelString: string = 'Error:';
const fileDeletedAriaLabelPrefix: string = 'File deleted. No file selected.';
const fileSelectedAriaLabelPrefix: string = 'You have selected the file:';

/**
 * Local generic helper function to focus on a nested element within a child
 * component, with multiple attempts to accommodate for delayed re-rendering
 * via state updates.
 * @param componentHostElement - A reference to the `va-file-input` component instance (`this.el` at component-level).
 * @param componentSelector - The name of the child component that contains the focus target; to be used in `querySelector()`.
 * @param focusTargetSelector - The HTML tag name of the focus target element to be used in `querySelector()`
 * @returns {void}
 */
function focusOnElementWithRetries(
  componentHostElement: HTMLElement,
  componentSelector: string,
  focusTargetSelector: string,
): void {
  let attempts = 0;
  const maxAttempts = 10;

  const tryFocus = () => {
    const componentTarget: HTMLElement = componentHostElement.shadowRoot.querySelector(componentSelector);
    const focusTarget: HTMLElement = componentTarget?.shadowRoot.querySelector(focusTargetSelector);

    if (focusTarget) {
      focusTarget.focus();
      return; // Successfully focused
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryFocus, 100); // Try every 100ms on subsequent attempts
    }
  };

  // Start with initial 250ms delay for first attempt
  setTimeout(tryFocus, 250);
}

/**
 * Focuses on the nested `<button>` element in the "Change File" `<va-button-icon>`
 * via the generic helper with retries. Currently used when there is an error
 * with a selected file.
 * @param componentHostElement - A reference to the `va-file-input` component instance (`this.el` at component-level).
 * @returns {void}
 */
export function focusOnChangeButton(componentHostElement: HTMLElement): void {
  focusOnElementWithRetries(componentHostElement, 'va-button-icon', 'button');
}

/**
 * Focuses on the file input element after a short delay to ensure that the aria-label has been updated in render.
 * This ensures that the screen reader will announce appropriate context about the file selection status.
 * @returns {void}
 */
export function focusOnInputAfterAriaLabelUpdate(
  fileInputEl: HTMLInputElement
): void {
  // Multiple requestAnimationFrame calls are needed to ensure that the:
  // First requestAnimationFrame: Queues for next frame (after Stencil render)
  // Second requestAnimationFrame: Ensures layout and paint have completed
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (fileInputEl) {
        fileInputEl.focus();
      }
    });
  });
}

/**
 * Focuses on the nested `<input>` element in the `<va-text-input>` via the
 * generic helper with retries. Used when a when an encrypted file is selected
 * and dynamic password input is rendered.
 * @param componentHostElement - A reference to the `va-file-input` component instance (`this.el` at component-level).
 * @returns {void}
 */
export function focusOnPasswordInput(componentHostElement: HTMLElement): void {
  focusOnElementWithRetries(componentHostElement, 'va-text-input', 'input');
}

/**
 * Converts the size of a file from bytes to a more human-readable format for
 * rendering the file size label. This function calculates the file size in
 * appropriate units (B, KB, MB, GB, TB) based on the size provided. It uses
 * logarithmic scaling to determine the unit, then formats the size to one
 * decimal place for units KB and above.
 *
 * @param {number} filesSize - The size of the file in bytes
 * @returns {string} - The formatted file size with appropriate unit
 */
export function formatFileSize(filesSize: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (filesSize === 0) return '0 B';

  const unitIndex = Math.floor(Math.log(filesSize) / Math.log(1024));
  if (unitIndex === 0) return `${filesSize} ${units[unitIndex]}`;

  const sizeInUnit = filesSize / Math.pow(1024, unitIndex);
  const formattedSize = sizeInUnit.toFixed(unitIndex < 2 ? 0 : 1);
  return `${formattedSize}\xa0${units[unitIndex]}`;
};

/**
 * Establish aria-labels for <input> element, "change file" button, and "delete"
 * buttons based on the state of the component.
 *
 * Label values for the buttons are straightforward - setting priority to errors
 * first, then selected either the current file or the uploaded file.
 *
 * Update aria-label for <input> element with the priority:
 *  1. If there is an error, announce the error first.
 *  2. If a file has been selected and there is no error, announce the selected
 *     file name.
 *  3. If there has been no attempt to upload a file but a value has been passed
 *     to the `uploadedFile` prop, announce the uploaded file name.
 *  4. If an attempt has been made to upload a file but no file is selected,
 *     announce that the file has been deleted.
 *
 * @param label - The passed label prop.
 * @param required - The passed required prop.
 * @param displayError - Either the value passed to the error prop or the internal fileError state, with the prop taking precedence.
 * @param initialUploadAttemptHasTakenPlace - Indicates if an initial upload attempt has been made.
 * @param file - The currently selected file.
 * @param uploadedFile - The value passed to the uploadedFile prop.
 * @returns {string}
 */
export function getAriaLabelsForInputAndButtons(
  label: string,
  required: boolean,
  displayError: string | null,
  initialUploadAttemptHasTakenPlace: boolean,
  file: File | null,
  uploadedFile: UploadedFile | null,
): Record<string, string> {
  let inputAriaLabel: string =
    `${label}${required ? ' ' + i18next.t('required') : ''}. ${dragFileString}${chooseFileString}`;

  // There is an error with the selected file, which takes precedence
  if (displayError) {
    return {
      inputAriaLabel: `${errorAriaLabelString} ${displayError} ${inputAriaLabel}`,
      deleteFileAriaLabel: `${deleteFileAriaLabelPrefix} ${errorAriaLabelString} ${displayError}`,
      changeFileAriaLabel: `${changeFileAriaLabelPrefix} ${errorAriaLabelString} ${displayError}`,
    }
  }

  // A file has been uploaded successfully
  if (initialUploadAttemptHasTakenPlace && file) {
    inputAriaLabel = `${fileSelectedAriaLabelPrefix} ${file.name}.`;
  }
  // Initial upload attempt has not yet taken place, but there is an uploaded file
  else if (!initialUploadAttemptHasTakenPlace && uploadedFile) {
    inputAriaLabel = `${fileSelectedAriaLabelPrefix} ${uploadedFile.name}.`;
  }
  // Initial upload attempt has taken place, but there is no file selected or
  // uploaded file (file has been deleted)
  else if (initialUploadAttemptHasTakenPlace && !file && !uploadedFile) {
    inputAriaLabel = `${fileDeletedAriaLabelPrefix} ${inputAriaLabel}`;
  }

  let changeFileAriaLabel: string | undefined = undefined;
  let deleteFileAriaLabel: string | undefined = undefined;

  if (file) {
    changeFileAriaLabel = `${changeFileAriaLabelPrefix} ${file.name}`;
    deleteFileAriaLabel = `${deleteFileAriaLabelPrefix} ${file.name}`;
  }
  else if (uploadedFile) {
    changeFileAriaLabel = `${changeFileAriaLabelPrefix} ${uploadedFile.name}`;
    deleteFileAriaLabel = `${deleteFileAriaLabelPrefix} ${uploadedFile.name}`;
  }

  return {
    inputAriaLabel,
    deleteFileAriaLabel,
    changeFileAriaLabel,
  }
}

export function isAcceptedFileType(
  fileType: string,
  acceptedTypes: string[],
): boolean {
  for (const type of acceptedTypes) {
    if (type === fileType) {
      return true;
    }
    if (type.endsWith('/*') && fileType.startsWith(type.slice(0, -1))) {
      return true;
    }
  }
  return false;
}

function getExtension(file: File) {
  const noLeadingDot = file.name.replace(/^\./, '');
  const fileType = noLeadingDot.includes('.') ? `.${noLeadingDot.split('.').pop()}` : null;
  return fileType || file.type;
}

export function getFileTypeErrorMessage(file: File) {
  const extension = getExtension(file);
  const fileWarning = extension ? `${extension} files` : 'this file type';
  return `We do not accept ${fileWarning}. Choose a new file.`;
}

export function normalizeAcceptProp(accept: string): string[] {
  return accept.split(',').map(item => {
    item = item.trim();
    return item.startsWith('.') ? extensionToMimeType[item] : item;
  });
}

/**
 * Renderer for the displayed error alert.
 * @returns {HTMLSpanElement | void}
 */
export function renderErrorAlert(displayError: string): HTMLSpanElement | void {
  if (!displayError) return;

  // Note that we are not using `aria-live` or `role="alert"` here because the
  // error is announced via updating `aria-label` values and focus management
  // instead.
  return (
    <span id="input-error-message" class="usa-error-message">
      {displayError}
    </span>
  );
}

/**
 * Renders a thumbnail preview when a file is selected, or an error icon if
 * there is an error. For image files, it displays a small image preview.
 *
 * @param {string} displayError
 * @param {string} fileContents
 * @param {string | undefined} fileType
 * @returns {HTMLElement | undefined}
 */
export function renderFileThumbnail(
  displayError: string | null,
  fileContents: string | null,
  fileType: string | undefined,
): HTMLElement | undefined {
  if (displayError) {
    return (
      <div class="thumbnail-container">
        <va-icon
          icon="error"
          size={3}
          class="thumbnail-preview thumbnail-error"
        />
      </div>
    )
  }
  else if (fileContents && fileType?.startsWith('image/')) {
    return (
      <div class="thumbnail-container" aria-hidden="true">
        <img class="thumbnail-preview" src={fileContents} alt="image" />
      </div>
    )
  }
  else {
    return (
      <div class="thumbnail-container" aria-hidden="true">
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
    )
  }
}

export function renderLabelOrHeader(
  label: string,
  required: boolean,
  headerSize?: number,
) {
  const requiredSpan = required ? (
    <span class="required"> {i18next.t('required')}</span>
  ) : null;

  if (headerSize && headerSize >= 1 && headerSize <= 6) {
    const HeaderTag = `h${headerSize}`;
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
        <label htmlFor="fileInputField" part="label" class="usa-label">
          {label}
          {requiredSpan}
        </label>
      </div>
    );
  }
}

/**
 * Renders the upload message element, which serves as the displayed prompt
 * within the file input area when it's empty.
 * @param {HTMLElement} uploadMessage - The custom upload message element, if provided.
 * @returns {HTMLElement}
 */
export function renderUploadMessage(
  uploadMessage: HTMLElement | null,
): HTMLElement {

  if (uploadMessage) return uploadMessage;

  return (
    <span>
      {dragFileString}
      <span class="file-input-choose-text">{chooseFileString}</span>
    </span>
  );
}
