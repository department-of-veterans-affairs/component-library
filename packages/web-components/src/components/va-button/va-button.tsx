import { Component, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

/**
 * @nativeHandler onClick
 */
@Component({
  tag: 'va-button',
  styleUrl: 'va-button.css',
  shadow: true,
})
export class VaButton {
  /**
   * Adds an icon before the button text to represent navigation
   */
  @Prop() back?: boolean;

  /**
   * Applies big button styling
   */
  @Prop() big?: boolean;

  /**
   * Adds an icon after the button text to represent navigation
   */
  @Prop() continue?: boolean;

  /** Disables analytics tracking */
  @Prop() disableAnalytics?: boolean;

  /**
   * Prevents user from interacting with button
   */
  @Prop() disabled?: boolean; // do we want this? double check

  /**
   * The value for aria-label
   */
  @Prop() label?: string; // could use this.el.getAttribute('aria-label') but this is more explicit

  /**
   * Applies secondary button styling
   */
  @Prop() secondary?: boolean;

  /**
   * The button submits the form data
   */
  @Prop() submit?: boolean;

  /**
   * The text displayed on the button. If continue or back is true, the value of text is ignored.
   */
  @Prop() text?: string;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  private handleClick = (e: MouseEvent): void => {
    // TODO: remove console.log
    console.log(e);
    if (this.disableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-button',
      action: 'click',
      details: {
        // TODO: add analytics event details
      },
    });
  };

  private getButtonText = (): string => {
    if (this.continue) return 'Continue';
    if (this.back) return 'Back';

    return this.text;
  };

  render() {
    const {
      back,
      continue: _continue,
      disabled,
      getButtonText,
      handleClick,
      label,
      submit,
    } = this;

    const type = submit ? 'submit' : 'button';

    return (
      <Host>
        <button
          aria-label={label}
          disabled={disabled}
          onClick={handleClick}
          type={type}
        >
          {back && !_continue && (
            <i aria-hidden="true" class="fa fa-angles-left" />
          )}
          {getButtonText()}
          {_continue && !back && (
            <i aria-hidden="true" class="fa fa-angles-right" />
          )}
        </button>
      </Host>
    );
  }
}
