/* eslint-disable i18next/no-literal-string */
import { Component, Prop, State, Element, h, Host, Event, EventEmitter } from '@stencil/core';
// todo i think we need the react-bindings to pass the children prop along but getting an error currently
//import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import i18next from 'i18next';

interface FileIndex {
  file: File | null;
  key: number;
}

@Component({
   tag: 'va-file-input-multiple',
   styleUrl: 'va-file-input-multiple.scss',
   shadow: true,
 })
export class VaFileInputMultiple {
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
   * Shows a va-progress-bar at this percentage when uploading
   * @Prop() uploadPercentage?: number;

   /**
   * Optionally specifies the size of the header element to use instead of the base label.
   * Accepts a number from 1 to 6, corresponding to HTML header elements h1 through h6.
   * If not provided, defaults to standard label styling.
   */
  @Prop() headerSize?: number;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;

  /**
   * The event emitted when the file input value changes.
   */
  @Event() vaChange: EventEmitter;

  @Element() el: HTMLElement;

  private fileListIndex: number = 0;
  @State() files: FileIndex[] = [ {key: this.fileListIndex, file: null} ];

  private handleChange(event: any, index: number) {
    const newFile = event.detail.files[0];
    console.log('Pre handleChange', this.files);

    if (newFile) {
      // Add/change file
      if (this.files[index].file) {
        // Change file
        this.files[index].file = newFile;
        console.log('change', this.files);
      } else {
        // New file
        this.files[index].file = newFile;

        this.fileListIndex++;
        this.files.push({ file: null, key: this.fileListIndex });
        console.log('new', this.files);
      }
    } else {
      // Deleted file
      this.files.splice(index, 1);
      console.log('delete', this.files);
    }

    this.vaChange.emit({ files: this.files.map(fileObj => fileObj.file) });
    console.log('Post handleChange', this.files);
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
    const { label, required, headerSize, hint, files, accept, errors } = this;
    return (
      <Host>
        {label && this.renderLabelOrHeader(label, required, headerSize)}
        {hint && (
          <div class="usa-hint" id="input-hint-message">
            {hint}
          </div>
        )}
        <div class="outer-wrap">
          <va-file-input
            uswds
            accept={accept}
            required={required}
            hint={hint}
          />
          {files.map((fileObj, index) => (
            <va-file-input
              key={fileObj.key}
              uswds
              label={`File ${index + 1}`}
              accept={accept}
              required={required}
              error={errors[index]}
              hint={hint}
              onVaChange={(event) => this.handleChange(event, fileObj.key)}
            />
          ))}
        </div>
      </Host>
    );
  }
}
///
