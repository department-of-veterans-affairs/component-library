
import { h } from '@stencil/core';
import { extensionToMimeType } from './fileExtensionToMimeType';
import { i18next } from '../..';
import { UploadedFile } from './uploadedFile';

const chooseFileString: string ='choose from folder';
const dragFileString: string = 'Drag a file here or ';

/**
 * Attempts to focus on a nested input element within slotted content, if present.
 * This is useful for scenarios where the slotted content includes form inputs
 * that should receive focus after a file is selected.
 * @returns {void}
 */
export function attemptToFocusOnSlottedElement(
  slottedContent: HTMLElement[] | null,
  encrypted: boolean
): void {
  // Stop here if no slotted content or if encrypted (to avoid conflicting focus)
  if (slottedContent?.length === 0 || encrypted) {
    return;
  }

  // Find first instance of either `<va-select>` or `<va-text-input>` in slotted content
  let supportedNestedInputElements = [];
  for (const element of slottedContent) {
    const found = element.querySelectorAll('va-select, va-text-input');
    if (found.length > 0) {
      supportedNestedInputElements.push(...Array.from(found));
      break; // Stop at the first element that contains supported input elements
    }
  }

  // Determine the first supported nested input element to focus on
  let nestedElementForFocus = null;
  if (supportedNestedInputElements.length > 0) {
    const firstEl = supportedNestedInputElements[0] as HTMLElement;

    if (firstEl.tagName === 'VA-TEXT-INPUT') {
      nestedElementForFocus = firstEl.shadowRoot.querySelector('input');
    } else if (firstEl.tagName === 'VA-SELECT') {
      nestedElementForFocus = firstEl.shadowRoot.querySelector('select');
    }
  }

  // Focus on the nested element after a short delay to help with screen reader announcement
  if (nestedElementForFocus) {
    setTimeout(() => {
      nestedElementForFocus.focus();
    }, 250);
  }
}

/**
 * Focuses on the nested `<button>` element in the "Change File" `<va-button-icon>` after a short delay to help with screen reader announcement.
 * @returns {void}
 */
export function focusOnChangeButton(componentHostElement: HTMLElement): void {
  setTimeout(() => {
    const changeButton: HTMLElement = componentHostElement.shadowRoot.querySelector('va-button-icon');
    const innerButton: HTMLElement = changeButton?.shadowRoot.querySelector('button');

    if (innerButton) {
      innerButton.focus();
    }
  }, 250);
}

/**
 * Focuses on the file input element after a short delay to ensure that the aria-label has been updated in render.
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
 * Attempts to focus on the password input element within the va-text-input component.
 * Using a multi-attempt approach to handle cases where the input element may
 * not be immediately available in the DOM.
 * @returns {void}
 */
export function focusOnPasswordInput(componentHostElement: HTMLElement): void {
  let attempts = 0;
  const maxAttempts = 10;

  const tryFocus = () => {
    const passwordTextInput = componentHostElement.shadowRoot.querySelector('va-text-input');
    const inputElement = passwordTextInput?.shadowRoot?.querySelector('input');

    if (inputElement) {
      inputElement.focus();
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
 *  3. If there has been no attempt a file but a value has been passed to the
 *     `uploadedFile` prop, announce the uploaded file name.
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

  if (displayError) {
    return {
      inputAriaLabel: `Error: ${displayError}. ${inputAriaLabel}`,
      deleteFileAriaLabel: `delete file. Error. ${displayError}`,
      changeFileAriaLabel: `change file. Error. ${displayError}`,
    }
  }

  if (initialUploadAttemptHasTakenPlace && file) {
    inputAriaLabel = `You have selected the file: ${file.name}.`;
  }
  else if (!initialUploadAttemptHasTakenPlace && uploadedFile) {
    inputAriaLabel = `You have selected the file: ${uploadedFile.name}.`;
  }
  else if (initialUploadAttemptHasTakenPlace && !file && !uploadedFile) {
    inputAriaLabel = `File deleted. No file selected. ${inputAriaLabel}`;
  }

  let changeFileAriaLabel: string | undefined = undefined;
  let deleteFileAriaLabel: string | undefined = undefined;

  if (file) {
    changeFileAriaLabel = `change file ${file.name}`;
    deleteFileAriaLabel = `delete file ${file.name}`;
  }
  else if (uploadedFile) {
    changeFileAriaLabel = `change file ${uploadedFile.name}`;
    deleteFileAriaLabel = `delete file ${uploadedFile.name}`;
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
};

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
};

/**
 * Renderer for the displayed error alert.
 * @returns {HTMLSpanElement | void}
 */
export function renderErrorAlert(displayError: string): HTMLSpanElement | void {
  if (!displayError) return;

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
