import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Privacy agreement
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-privacy-agreement',
  styleUrl: 'va-privacy-agreement.scss',
  shadow: true,
})
export class VaPrivacyAgreement {
  /**
   * Whether the checkbox is checked or not.
   */
  @Prop({ mutable: true }) checked?: boolean = false;

  /**
   * Whether to display the error message or not.
   */
  @Prop() showError?: boolean = false;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when the
   * checked value changes and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * The event emitted when the checkbox changes.
   */
  @Event() vaChange: EventEmitter;

  private handleCheckboxChange = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });

    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-privacy-agreement',
        action: 'click',
        details: {
          checked: this.checked
        },
      });
    }
  }

  private errorMessage() {
    return (this.showError && !this.checked)
    ? "You must accept the privacy policy before continuing."
    : null;
  }

  render() {
    const labelClass = classnames({
      'usa-label--error': this.showError
    });


    return (
      <Host>
        <va-checkbox
          required
          error={this.errorMessage()}
          id="checkbox"
          label="I have read and accept the privacy policy."
          checked={this.checked}
          onVaChange={this.handleCheckboxChange}
        >
          <span class={`${labelClass} description`} slot="description">
            Please read and accept the&nbsp;
            <va-link
              href="/privacy-policy/"
              text="privacy policy"
              external
            ></va-link>
            .
          </span>
        </va-checkbox>
      </Host>
    );
  }
}
