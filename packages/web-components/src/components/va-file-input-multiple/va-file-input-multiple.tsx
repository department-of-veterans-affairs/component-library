/* eslint-disable i18next/no-literal-string */
import { Component, Prop, State, Element, h, Host, Event, EventEmitter } from '@stencil/core';
// todo i think we need the react-bindings to pass the children prop along but getting an error currently
//import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import i18next from 'i18next';

interface FileIndex {
  file: File | null;
  key: number;
}

/**
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
   * The label for the file input.
   */
  @Prop() label?: string;

  /**
   * The name for the input element.
   */
  @Prop() name?: string;

  /**
   * Sets the input to required and renders the (*Required) text.
   */
  @Prop() required?: boolean = false;

  /**
   * A comma-separated list of unique file type specifiers.
   */
  @Prop() accept?: string;

  /**
   * The error messages to render. Corresponds to each file in the array.
   */
  @Prop() errors: string[] = [];

  /**
   * Optional hint text.
   */
  @Prop() hint?: string;

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
   * The event emitted when the file input value changes.
   */
  @Event() vaMultipleChange: EventEmitter;
  @State() files: FileIndex[] = [ {key: 0, file: null} ];

  private fileKeyCounter: number = 0;

  private findFileByKey(fileKey: number) {
    return this.files.find(file => file.key === fileKey);
  }

  private isEmpty(): boolean {
    return this.files[0].file === null;
  }

  private handleChange(event: any, fileKey: number, pageIndex: number) {
    const newFile = event.detail.files[0];
    console.log('Pre handleChange', JSON.stringify(this.files));

    if (newFile) {
      // Add/change file
      const fileObject = this.findFileByKey(fileKey);
      if (fileObject.file) {
        // Change file
        fileObject.file = newFile;
        console.log('change', JSON.stringify(this.files));
      } else {
        // New file
        fileObject.file = newFile;

        this.fileKeyCounter++;
        this.files.push({ file: null, key: this.fileKeyCounter });
        console.log('new', JSON.stringify(this.files));
      }
    } else {
      // Deleted file
      this.files.splice(pageIndex, 1);
      console.log('delete', JSON.stringify(this.files));
    }

    this.vaMultipleChange.emit({ files: this.files.map(fileObj => fileObj.file) });
    console.log('Post handleChange', JSON.stringify(this.files));
    this.files = Array.of(...this.files);
  }

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
          </HeaderTag>
          {requiredSpan}
        </div>
      );
    } else {
      return (
        <div class="label-header">
          <span part="label">
            {label}
          </span>
          {requiredSpan}
        </div>
      );
    }
  };

  render() {
    const { label, required, headerSize, hint, files, accept, errors, name, enableAnalytics } = this;
    const outerWrapClass = this.isEmpty() ? "" : "outer-wrap";
    return (
      <Host>
        {label && this.renderLabelOrHeader(label, required, headerSize)}
        {hint && (
          <div class="usa-hint" id="input-hint-message">
            {hint}
          </div>
        )}
        <div class={outerWrapClass}>
          {!this.isEmpty() && <div class="selected-files-label">Selected files</div>}
          {files.map((fileEntry, pageIndex) => (
            <va-file-input
              key={fileEntry.key}
              uswds
              headless
              name={`${name}-${fileEntry.key}`}
              accept={accept}
              required={required}
              error={errors[pageIndex]}
              onVaChange={(event) => this.handleChange(event, fileEntry.key, pageIndex)}
              enable-analytics={enableAnalytics}
            >
              <slot></slot>
            </va-file-input>
          ))}
        </div>
      </Host>
    );
  }
}
