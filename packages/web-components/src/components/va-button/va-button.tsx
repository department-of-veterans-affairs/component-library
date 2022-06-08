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
   * If `true`, the button will use `Back` as its text and an icon to represent going back in form flows.
   */
  @Prop() back?: boolean = false;

  /**
   * If `true`, the button will use the big variant.
   */
  @Prop() big?: boolean = false;

  /**
   * If `true`, the button will use `Continue` as its text and an icon to represent proceeding forward in form flows.
   */
  @Prop() continue?: boolean = false;

  /** If `true`, the component-library-analytics event is disabled. */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, the button is disabled.
   */
  @Prop() disabled?: boolean = false; // do we want this? double check

  /**
   * The aria-label of the component.
   */
  @Prop() label?: string; // could use this.el.getAttribute('aria-label') but this is more explicit

  /**
   * If `true`, the button will use the secondary variant.
   */
  @Prop() secondary?: boolean = false;

  /**
   * If `true`, the button will submit form data when clicked.
   */
  @Prop() submit?: boolean = false;

  /**
   * The text displayed on the button. If `continue` or `back` is true, the value of text is ignored.
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

    const buttonText = getButtonText();
    const type = submit ? 'submit' : 'button';

    return (
      <Host>
        <button
          aria-label={label || buttonText}
          disabled={disabled}
          onClick={handleClick}
          type={type}
        >
          {back && !_continue && (
            <i aria-hidden="true" class="fa fa-angles-left" />
          )}
          {buttonText}
          {_continue && !back && (
            <i aria-hidden="true" class="fa fa-angles-right" />
          )}
        </button>
      </Host>
    );
  }
}
