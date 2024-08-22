import {
  Component,
  Prop,
  State,
  Element,
  h,
  Host,
  Event,
  EventEmitter,
} from '@stencil/core';
import { i18next } from '../..';
import { FileIndex } from "./FileIndex";

/**
 * A component that manages multiple file inputs, allowing users to upload several files.
 * It supports adding, changing, and removing files with dynamic error handling.
 *
 * @componentName File input multiple
 * @maturityCategory caution
 * @maturityLevel available
 * @guidanceHref form/file-input-multiple
 */
@Component({
  tag: 'va-file-input-multiple',
  styleUrl: 'va-file-input-multiple.scss',
  shadow: true,
})
export class VaFileInputMultiple {
  @Element() el: HTMLElement;

  /**
   * Label for the file input, displayed above the input.
   */
  @Prop() label?: string;

  /**
   * Name attribute for the file input element, used to identify the form data in the submission.
   */
  @Prop() name?: string;

  /**
   * If true, the file input is marked as required, and users must select a file.
   */
  @Prop() required?: boolean = false;

  /**
   * Defines acceptable file types the user can select; uses file type or extensions.
   */
  @Prop() accept?: string;

  /**
   * Array of error messages corresponding to each file input. The length and order match the files array.
   */
  @Prop() errors: string[] = [];

  /**
   * Hint text provided to guide users on the expected format or type of files.
   */
  @Prop() hint?: string;

  /**
   * If enabled, emits custom analytics events when file changes occur.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * Specifies the header size of the label element, from 1 (largest) to 6 (smallest).
   */
  @Prop() headerSize?: number;

  /**
   * Event emitted when any change to the file inputs occurs.
   */
  @Event() vaMultipleChange: EventEmitter;

  /**
   * Internal state to track files and their unique keys.
   */
  @State() files: FileIndex[] = [{ key: 0, file: null , content: null}];

  /**
   * Counter to assign unique keys to new file inputs.
   */
  private fileKeyCounter: number = 0;
  private additionalSlot = null;

  /**
   * Finds a file entry by its unique key.
   * @param {number} fileKey - The unique key of the file.
   * @returns {FileIndex | undefined} The matching file index object or undefined if not found.
   */
  private findFileByKey(fileKey: number) {
    return this.files.find(file => file.key === fileKey);
  }

  /**
   * Checks if the first file input is empty.
   * @returns {boolean} True if the first file input has no file, false otherwise.
   */
  private isEmpty(): boolean {
    return this.files[0].file === null;
  }

  /**
   * Sets the content for the slots by finding the first 'slot' within the shadow DOM of this component.
   * If there is no additionalSlot set, it fetches the assigned elements to this slot, ensuring that content
   * is managed only if the slot exists. This prevents the default slot content from rendering.
   */
  private setSlotContent() {
    const slot = this.el.shadowRoot.querySelector('slot');
    if (!this.additionalSlot) {
      this.additionalSlot = slot
                            ? slot.assignedElements({ flatten: true })
                            : [];
    }
    slot?.remove();
  }

  /**
   * Retrieves cloned nodes of the additional content that was originally assigned to the slot.
   * This allows for independent manipulation and reuse of the content in multiple instances
   * without altering the original nodes.
   *
   * @returns {Node[]} An array of cloned nodes from the additionalSlot.
   */
  private getAdditionalContent() {
    return this.additionalSlot.map(n => n.cloneNode(true));
  }

  /**
   * Handles file input changes by updating, adding, or removing files based on user interaction.
   * @param {any} event - The event object containing file details.
   * @param {number} fileKey - The key of the file being changed.
   * @param {number} pageIndex - The index of the file in the files array.
   */
  private handleChange(event: any, fileKey: number, pageIndex: number) {
    const newFile = event.detail.files[0];

    if (newFile) {
      const fileObject = this.findFileByKey(fileKey);

      if (fileObject.file) {
        // Change file
        fileObject.file = newFile;
      } else {
        // New file
        fileObject.file = newFile;
        fileObject.content = this.getAdditionalContent();
        this.fileKeyCounter++;
        this.files.push({
          file: null,
          key: this.fileKeyCounter,
          content: null,
        });
      }
    } else {
      // Deleted file
      this.files.splice(pageIndex, 1);
      const statusMessageDiv = this.el.shadowRoot.querySelector("#statusMessage");
      // empty status message so it is read when updated
      statusMessageDiv.textContent = ""
      setTimeout(() => {
        statusMessageDiv.textContent = "File removed."
      }, 1000);
    }

    this.vaMultipleChange.emit({ files: this.files.map(fileObj => fileObj.file).filter((file =>{ return !!file})) });
    this.files = Array.of(...this.files);
  }

  /**
   * Renders the label or header based on the provided configuration.
   * @param {string} label - The text of the label.
   * @param {boolean} required - Whether the input is required.
   * @param {number} headerSize - The size of the header element.
   * @returns {JSX.Element} A JSX element representing the label or header.
   */
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
          <span part="label" class="usa-label">{label}</span>
          {requiredSpan}
        </div>
      );
    }
  };

  /**
   * It first ensures that the slot content is correctly set up, then iterates over each file input in the component,
   * appending cloned additional content where applicable. This method ensures that additional content is
   * consistently rendered across multiple file inputs after updates to the DOM.
   */
  componentDidRender() {
    const theFileInputs = this.el.shadowRoot.querySelectorAll(`va-file-input`);
    this.setSlotContent();
    theFileInputs.forEach((fileEntry, index) => {
      if (this.files[index].content) {
        this.files[index].content.forEach(node => fileEntry.append(node));
      }
    });
  }

  /**
   * Checks if there are any errors in the errors array.
   * @returns {boolean} True if there are errors, false otherwise.
   */
  private hasErrors = () => {
    return this.errors.some(error => !!error);
  }

  /**
   * The render method to display the component structure.
   * @returns {JSX.Element} The rendered component.
   */
  render() {
    const {
      label,
      required,
      headerSize,
      hint,
      files,
      name,
      accept,
      errors,
      enableAnalytics,
    } = this;
    const outerWrapClass = this.isEmpty() ? '' : 'outer-wrap';
    const hasError = this.hasErrors() ? 'has-error': '';

    return (
      <Host class={hasError}>
        {label && this.renderLabelOrHeader(label, required, headerSize)}
        {hint && (
          <div class="usa-hint" id="input-hint-message">
            {hint}
          </div>
        )}
        <div class={outerWrapClass}>
          <div class='usa-sr-only' aria-live="polite" id="statusMessage"></div>
          {!this.isEmpty() && (
            <div class="selected-files-label">Selected files</div>
          )}
          {files.map((fileEntry, pageIndex) => {
            return (
              <va-file-input
                key={fileEntry.key}
                headless
                label={label}
                hint={hint}
                name={`${name}-${fileEntry.key}`}
                accept={accept}
                required={required}
                error={errors[pageIndex]}
                onVaChange={event =>
                  this.handleChange(event, fileEntry.key, pageIndex)
                }
                enable-analytics={enableAnalytics}
              />
            );
          })}
        </div>
        <slot></slot>
      </Host>
    );
  }
}
