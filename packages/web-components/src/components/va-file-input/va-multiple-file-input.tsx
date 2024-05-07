/* eslint-disable i18next/no-literal-string */
import { Component, Prop, State, Element, h } from '@stencil/core';
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
  @State() fileTrackCount: number = 0;

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
    // const inputElement = this.findFile(e.target.id);
    console.log(e.target, 'z');
    const container: HTMLElement =
      this.el.shadowRoot.querySelector('.inputs-wrap');
    this.appendFileInput(container);
  }

  // // private findFile(id: string): Element {
  // //   return this.el.shadowRoot.getElementById(id);
  // // }

  private handleRemoveFile() {
    const container: HTMLElement =
      this.el.shadowRoot.querySelector('.inputs-wrap');
    if (container.children.length === 0) {
      this.appendFileInput(container);
    }
  }

  private appendFileInput(container: HTMLElement): void {
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

    const inputElement = document.createElement('va-file-input');
    inputElement.id = this.fileTrackCount.toString();
    inputElement.label = label;
    inputElement.name = name;
    inputElement.accept = accept;
    inputElement.required = required;
    inputElement.error = error;
    inputElement.hint = hint;
    inputElement.uswds = true;
    inputElement.uploadPercentage = uploadPercentage;
    inputElement.headerSize = headerSize;
    inputElement['enable-analytics'] = enableAnalytics;
    inputElement['onVAChange'] = e => this.handleChange(e);
    inputElement['onVaRemoveFile'] = () => this.handleRemoveFile();
    inputElement.setAttribute('data-ischild', 'true');
    container.appendChild(inputElement);
    this.fileTrackCount++;
    return;
  }

  componentDidLoad() {
    this.appendFileInput(this.el.shadowRoot.querySelector('.inputs-wrap'));
  }

  render() {
    return <div class="inputs-wrap"></div>;
  }
}
