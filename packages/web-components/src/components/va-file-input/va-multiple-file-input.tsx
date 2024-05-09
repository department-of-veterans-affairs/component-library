/* eslint-disable i18next/no-literal-string */
import { Component, Prop, State, Element, h, Host } from '@stencil/core';
// todo i think we need the react-bindings to pass the children prop along but getting an error currently
//import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';

/**
 * @componentName Multiple file input
 * @maturityCategory caution
 * @maturityLevel available
 * @guidanceHref form/file-input
 */

@Component({
  tag: 'va-multiple-file-input',
  styleUrl: 'va-file-input.scss',
  shadow: true,
})
export class VaMultipleFileInput {
  @State() fileTrackCount: number = 1;
  @State() inputArray: HTMLElement[] = [];
  @State() inputOnDeck: HTMLElement = this.makeNewInput();

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
   * Shows a va-progress-bar at this percentage when uploading
   */
  @Prop() uploadPercentage?: number;

  /**
   * Optionally specifies the size of the header element to use instead of the base label.
   * Accepts a number from 1 to 6, corresponding to HTML header elements h1 through h6.
   * If not provided, defaults to standard label styling.
   */
  @Prop() headerSize?: number;

  @Element() el: HTMLElement;

  private handleChange(e) {
    // todo i think we need to bubble the event up
    // const index = this.inputArray.findIndex(o => o.id === e.target.id);
    // if (index === this.inputArray.length - 1) {
    // }
    console.log('just changed');
    if (e.target.id === this.fileTrackCount.toString()) {
      this.registerFileInput();
    }
  }

  private registerFileInput(): void {
    console.log(this.inputOnDeck, 'reg');
    this.inputArray.push(structuredClone(this.inputOnDeck));
    this.inputOnDeck = <div>done</div>;
    return;
  }

  private makeNewInput(): HTMLElement {
    this.fileTrackCount++;
    const newInput = this.createInput();
    newInput['$attrs$']['ischild'] = 'true';
    return newInput;
  }

  private createInput(): HTMLElement {
    const {
      label,
      name,
      required,
      accept,
      error,
      hint,
      uploadPercentage,
      headerSize,
      enableAnalytics,
    } = this;

    // const inputElement = document.createElement('va-file-input');
    // inputElement.id = this.fileTrackCount.toString();
    // inputElement.label = label;
    // inputElement.name = name;
    // inputElement.accept = accept;
    // inputElement.required = required;
    // inputElement.error = error;
    // inputElement.hint = hint;
    // inputElement.uswds = true;
    // inputElement.uploadPercentage = uploadPercentage;
    // inputElement.headerSize = headerSize;
    // inputElement['enable-analytics'] = enableAnalytics;
    // inputElement['onVaChange'] = e => this.handleChange(e);
    // inputElement['onVaRemoveFile'] = e => this.handleRemoveFile(e);
    // inputElement.setAttribute('isChild', 'true');
    // return inputElement;

    return (
      <va-file-input
        id={this.fileTrackCount.toString()}
        label={label}
        name={name}
        accept={accept}
        required={required}
        error={error}
        hint={hint}
        enable-analytics={enableAnalytics}
        onVaChange={e => this.handleChange(e)}
        onVaRemoveFile={e => this.handleRemoveFile(e)}
        uswds={true}
        uploadPercentage={uploadPercentage}
        headerSize={headerSize}
        //children={"children"}
      />
    );
  }

  private handleRemoveFile(e): void {
    console.log('delete!');
    const id = e.target.closest('va-file-input').id;
    alert(id);
    this.inputArray = this.inputArray.filter(el => el['$attrs$'].id !== id);
    // if (this.inputArray.length === 0) {
    //   this.registerFileInput();
    //   return;
    // }
  }

  componentDidRender() {
    /**
     * AFTER the component has been rendered,
     * append the list of tracked inputs to the DOM
     * This is done as to not lose the file 'attached'
     * to each of the va-file-input elements
     **/
    // const container: HTMLElement =
    //   this.el.shadowRoot.querySelector('.inputs-wrap');
    // this.inputArray.forEach(input => container.appendChild(input));
    // const wrap: HTMLElement = this.el.shadowRoot.querySelector('.outer-wrap');
    // wrap.appendChild(this.inputOnDeck);
    console.log(this.fileTrackCount, 'didrend');
  }

  render() {
    console.log('am rendering');
    return (
      <Host>
        <div class="outer-wrap">
          <div class="selected-files-label">Selected files</div>
          <div class="inputs-wrap">{this.inputArray}</div>
          -- arr:{this.inputArray.length} ---- trak: {this.fileTrackCount}-----
          {this.inputOnDeck}
        </div>
      </Host>
    );
  }
}
