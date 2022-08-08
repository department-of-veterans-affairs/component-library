import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
} from '@stencil/core';

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
  @Prop({ reflect: true }) back?: boolean = false;

  /**
   * If `true`, the button will use the big variant.
   */
  @Prop({ reflect: true }) big?: boolean = false;

  /**
   * If `true`, the button will use `Continue` as its text and an icon to represent proceeding forward in form flows.
   */
  @Prop({ reflect: true }) continue?: boolean = false;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * If `true`, the click event will not fire.
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * The aria-label of the component.
   */
  @Prop() label?: string; // could use this.el.getAttribute('aria-label') but this is more explicit

  /**
   * If `true`, the button will use the secondary variant.
   */
  @Prop({ reflect: true }) secondary?: boolean = false;

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

  /**
   * This workaround allows us to use disabled for styling and to prevent the click event from firing while improving
   * the button's accessibility by allowing it to be focusable and through the use of aria-disabled.
   *
   * Using a click handler on the button with this same check for disabled results in the event bubbling.
   */
  @Listen('click')
  handleClickOverride(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.handleClick(e);
  }

  render() {
    const {
      back,
      continue: _continue,
      disabled,
      getButtonText,
      label,
      submit,
    } = this;

    const ariaDisabled = disabled ? 'true' : undefined;
    const buttonText = getButtonText();
    const type = submit ? 'submit' : 'button';

    return (
      <Host>
        <button
          aria-disabled={ariaDisabled}
          aria-label={label}
          type={type}
          part="button"
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
