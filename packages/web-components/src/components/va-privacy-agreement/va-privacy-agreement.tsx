import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Privacy agreement
 * @maturityCategory caution
 * @maturityLevel available
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
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = true;
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
      'usa-label--error': this.showError && this.uswds
    });

    const uswdsFalse = classnames({
      'uswds-false': !this.uswds
    });
    
      return (
        <Host>
          <va-checkbox
            class={uswdsFalse}
            required
            error={this.errorMessage()}
            id="checkbox"
            label="I have read and accept the privacy policy."
            checked={this.checked}
            onVaChange={this.handleCheckboxChange}
          >
            <span class={`${labelClass} description`} slot="description">
              Please read and accept the&nbsp;
              <a href="/privacy-policy/" target="_blank">
                privacy policy
                <i
                  class="fa-arrow-up-right-from-square"
                  aria-hidden="true"
                  role="img"
                ></i>
                <span class={this.uswds ? "usa-sr-only" : "sr-only"}>opens in a new window</span>
              </a>
              .
            </span>
          </va-checkbox>
        </Host>
      );
  }
}
