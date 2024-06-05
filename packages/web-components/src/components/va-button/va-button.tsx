import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  Element,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @componentName Button
 * @nativeHandler onClick
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-button',
  styleUrl: 'va-button.scss',
  shadow: true,
})
export class VaButton {
  @Element() el: HTMLElement;

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
   * If `true`, the button will use the primary alternate variant.
   */
  @Prop() primaryAlternate?: boolean = false;

  /**
   * If `true`, the button will use the secondary variant.
   */
  @Prop({ reflect: true }) secondary?: boolean = false;

  /**
   * A value of: `prevent` --will  triger the onsubmit callback on form, but not submit;
   * `skip` --will submit but not trigger onsubmit callback; and `submit` or truthy -- will do both
   * `false` acts a boolean false
   */
  @Prop() submit?: 'submit' | 'prevent' | 'skip' | '' = '';

  /**
   * The text displayed on the button. If `continue` or `back` is true, the value of text is ignored.
   */
  @Prop() text?: string;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop({ reflect: true }) uswds?: boolean = true;

  /**
   * An optional message that will be read by screen readers when the input is focused.
   */
  @Prop() messageAriaDescribedby?: string;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  componentDidLoad() {
    // check if the element has a class named uswds-false added from parent
    if (this.el.classList.contains('uswds-false')) {
      // add attribute manually
      this.el.setAttribute('uswds', 'false');
    }
  }

  private handleClick = (): void => {
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-button',
        action: 'click',
        details: {
          type: this.secondary ? 'secondary' : 'primary',
          label: this.getButtonText(),
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  private getButtonText = (): string => {
    if (this.continue) return 'Continue';
    if (this.back) return 'Back';

    return this.text;
  };

  private handleSubmit() {
    const theForm = this.el.closest('form');
    const submitEvent = new CustomEvent('submit', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (this.submit && this.submit !== 'skip') {
      theForm.dispatchEvent(submitEvent);
    }
    if (this.submit && this.submit !== 'prevent') {
      theForm.submit();
    }
  }

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
    this.handleClick();
    if (this.submit) {
      this.handleSubmit();
    }
  }

  render() {
    const {
      back,
      continue: _continue,
      disabled,
      getButtonText,
      label,
      submit,
      secondary,
      primaryAlternate,
      big,
      uswds,
      messageAriaDescribedby,
    } = this;

    const ariaDescribedbyIds =
      `${messageAriaDescribedby ? 'button-description' : ''}`.trim() || null;

    const ariaDisabled = disabled ? 'true' : undefined;
    const buttonText = getButtonText();
    const type = submit ? 'submit' : 'button';

    if (uswds) {
      const buttonClass = classnames({
        'usa-button': true,
        'usa-button--big': big,
        'usa-button--outline': back || secondary,
        'va-button-primary--alternate': primaryAlternate,
      });
      return (
        <Host>
          <button
            class={buttonClass}
            aria-disabled={ariaDisabled}
            aria-label={label}
            aria-describedby={ariaDescribedbyIds}
            type={type}
            part="button"
          >
            {back && !_continue && (
              <va-icon
                class="va-button--icon margin-right-8px"
                icon="navigate_far_before"
              ></va-icon>
            )}
            {buttonText}
            {_continue && !back && (
              <va-icon
                class="va-button--icon margin-left-8px"
                icon="navigate_far_next"
              ></va-icon>
            )}
          </button>
          {messageAriaDescribedby && (
            <span id="button-description" class="usa-sr-only">
              {messageAriaDescribedby}
            </span>
          )}
        </Host>
      );
    } else {
      const buttonClass = classnames({
        'va-button-primary--alternate': primaryAlternate,
      });
      return (
        <Host>
          <button
            class={buttonClass}
            aria-disabled={ariaDisabled}
            aria-label={label}
            type={type}
            part="button"
          >
            {back && !_continue && (
              <va-icon
                class="va-button--icon"
                icon="navigate_far_before"
                size={2}
              ></va-icon>
            )}
            {buttonText}
            {_continue && !back && (
              <va-icon
                class="va-button--icon"
                icon="navigate_far_next"
                size={2}
              ></va-icon>
            )}
          </button>
        </Host>
      );
    }
  }
}
