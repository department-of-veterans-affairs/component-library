/* eslint-disable i18next/no-literal-string */
import { Component, Host, h, Prop, Event, EventEmitter, Fragment } from '@stencil/core';

/**
 * @componentName Privacy Agreement
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-privacy-agreement',
  styleUrl: 'va-privacy-agreement.css',
  shadow: true,
})
export class VaPrivacyAgreement {
  /**
   * Whether the checkbox is checked or not.
   */
  @Prop() checked?: boolean = false;

  /**
   * Whether to display the error message or not.
   */
  @Prop() isError?: boolean = false;

  /**
   * Emit component-library-analytics events on the blur event.
   */
  @Prop() enableAnalytics?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when the
   * input is blurred and enableAnalytics is true.
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

  private handleBlur = (e: Event) => {
    this.checked = (e.target as HTMLInputElement).checked;
    this.vaChange.emit({ checked: this.checked });

    if (this.enableAnalytics) {
      this.componentLibraryAnalytics.emit({
        componentName: 'va-privacy-agreement',
        action: 'blur',
        details: {
          checked: this.checked
        },
      });
    }
  };

  render() {
    return (
      <Host>
        <span>
          Please read and accept the&nbsp;
          <a target="_blank" href="/privacy/">
            privacy policy
          </a>
        </span>
        <span id="error-message" role="alert">
          {(this.isError && !this.checked) && (
            <Fragment>
              <span class="sr-only">error</span>
              You must accept the privacy policy before continuing
            </Fragment>
          )}
        </span>
        <va-checkbox
          required
          id="checkbox"
          label='I have read and accept the privacy policy'
          checked={this.checked}
          onBlur={this.handleBlur}
        />
      </Host>
    );
  }

}
