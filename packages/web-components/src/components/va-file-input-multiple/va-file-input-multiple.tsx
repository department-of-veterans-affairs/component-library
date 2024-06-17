/* eslint-disable i18next/no-literal-string */
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
// todo i think we need the react-bindings to pass the children prop along but getting an error currently
//import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import i18next from 'i18next';

interface FileIndex {
  file: File | null;
  key: number;
  content: Node[];
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
  @State() files: FileIndex[] = [{ key: 0, file: null, content: null }];

  private fileKeyCounter: number = 0;
  private additionalSlot = null;

  private findFileByKey(fileKey: number) {
    return this.files.find(file => file.key === fileKey);
  }

  private isEmpty(): boolean {
    return this.files[0].file === null;
  }

  private setSlotContent() {
    const slot = this.el.shadowRoot.querySelector('slot');
    if (!this.additionalSlot) {
      this.additionalSlot = slot
        ? slot.assignedElements({ flatten: true })
        : [];
    }
    slot?.remove();
    console.log(this.additionalSlot), 'add';
  }

  private getAdditionalContent() {
    const elArray = this.additionalSlot.map(n => n.cloneNode(true));
    return elArray;
  }

  private handleChange(event: any, fileKey: number, pageIndex: number) {
    const newFile = event.detail.files[0];
    console.log('Pre handleChange', this.files);

    if (newFile) {
      // Add/change file
      const fileObject = this.findFileByKey(fileKey);
      if (fileObject.file) {
        // Change file
        fileObject.file = newFile;
        console.log('change', this.files);
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
        console.log('new', this.files);
      }
    } else {
      // Deleted file
      this.files.splice(pageIndex, 1);
      console.log('delete', this.files);
    }

    this.vaMultipleChange.emit({
      files: this.files.map(fileObj => fileObj.file),
    });
    console.log('Post handleChange', this.files);
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
          <span part="label">{label}</span>
          {requiredSpan}
        </div>
      );
    }
  };

  componentDidRender() {
    const theFileInputs = this.el.shadowRoot.querySelectorAll(`va-file-input`);
    this.setSlotContent();
    theFileInputs.forEach((fileEntry, index) => {
      if (this.files[index].content) {
        this.files[index].content.forEach(node => fileEntry.append(node));
      }
    });
  }

  // private buildFileInputs(fileEntry, pageIndex) {
  //   const { required, accept, errors, name, enableAnalytics } = this;
  //   const fileInput = (
  //     <va-file-input
  //       key={fileEntry.key}
  //       uswds
  //       headless
  //       name={`${name}-${fileEntry.key}`}
  //       accept={accept}
  //       required={required}
  //       error={errors[pageIndex]}
  //       onVaChange={event => this.handleChange(event, fileEntry.key, pageIndex)}
  //       enable-analytics={enableAnalytics}
  //     />
  //   );
  //   if (fileEntry.content) {
  //     fileInput['$elm$'].childNodes = fileEntry.content;
  //   }
  //   console.log(fileInput, 'built');
  //   return fileInput;
  // }

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
    return (
      <Host>
        {label && this.renderLabelOrHeader(label, required, headerSize)}
        {hint && (
          <div class="usa-hint" id="input-hint-message">
            {hint}
          </div>
        )}
        <div class={outerWrapClass}>
          {!this.isEmpty() && (
            <div class="selected-files-label">Selected files</div>
          )}
          {files.map((fileEntry, pageIndex) => {
            console.log(fileEntry, 'ppp');
            return (
              <va-file-input
                key={fileEntry.key}
                uswds
                headless
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
