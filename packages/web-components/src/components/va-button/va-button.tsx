import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  Element,
  Watch,
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
  private showCompletedMessage: boolean = false;

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
   * If `true`, the button will appear disabled, a loading icon will show next to the text, and the click event will not fire.
   */
  @Prop({ reflect: true }) loading?: boolean = false;

  @Watch('loading')
  announceLoadingChange(newValue: boolean, oldValue: boolean) {
    if (oldValue && !newValue) {
      let me = this;
      this.showCompletedMessage = true;
      setTimeout(() => {
        me.showCompletedMessage = false;
      }, 3000);
    }
  }

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
   * Having this attribute present will set the [button type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/submit) to `submit`.
   * The va-button component must be within a `form` element.
   * **Prop options:**
   * `prevent` will trigger the onsubmit callback on the form, but won't submit the form.
   * `skip` will submit the form but not trigger the form onsubmit callback.
   * All other values will trigger the onsubmit and onclick callbacks, then submit the form, in that order.
   */
  @Prop() submit?: string;

  /**
   * The text displayed on the button. If `continue` or `back` is true, the value of text is ignored.
   */
  @Prop() text?: string;

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
    if (this.loading && !this.text) return 'Loading...';
    return this.text;
  };

  private handleSubmit() {
    if (this.submit === undefined) {
      return;
    }

    // Find the form element by walking up through shadow roots
    let element = this.el as Element;
    let formElement = null as HTMLFormElement | null;
    
    while (element && !formElement) {
      // Try to find form in the current root
      formElement = element.closest('form');
      
      // If no form found and we're in a shadow root, move up to the host element
      if (!formElement && element.getRootNode() instanceof ShadowRoot) {
        element = (element.getRootNode() as ShadowRoot).host;
      } else if (!formElement) {
        // If we're in the light DOM and still no form, break
        break;
      }
    }

    if (!formElement) {
      return;
    }
    const submitEvent = new CustomEvent('submit', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    if (this.submit !== 'skip') {
      formElement.dispatchEvent(submitEvent);
    }
    if (this.submit !== 'prevent') {
      formElement.submit();
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
    if (this.disabled || this.loading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.handleClick();
    this.handleSubmit();
  }

  render() {
    const {
      back,
      continue: _continue,
      disabled,
      loading,
      getButtonText,
      label,
      submit,
      secondary,
      primaryAlternate,
      big,
      messageAriaDescribedby,
    } = this;

    const ariaDescribedbyIds =
      `${messageAriaDescribedby ? 'button-description' : ''}`.trim() || null;

    const ariaDisabled = disabled || loading ? 'true' : undefined;
    const buttonText = getButtonText();

    const type = submit !== undefined ? 'submit' : 'button';

    const buttonClass = classnames({
      'usa-button': true,
      'usa-button--big': big,
      'usa-button--outline': back || secondary,
      'va-button-primary--alternate': primaryAlternate,
    });
    
    return (
      <Host>
          {/* This span must always be present for changes to be announced for the loading prop. It will not show visually or be read without content*/}
          <span class="loading-message" role="status">
            {this.loading ? 'Loading' : this.showCompletedMessage ? 'Loading complete' : null}
          </span>
          <button
            class={buttonClass}
            aria-disabled={ariaDisabled}
            aria-busy={loading ? 'true' : undefined}
            aria-label={label}
            aria-describedby={ariaDescribedbyIds}
            type={type}
            part="button"
          >
            {back && !_continue && <va-icon icon="navigate_far_before" />}
            {
              loading ? <va-icon class="loading-icon" icon="autorenew" aria-hidden="true"/> : null
            }
            {buttonText}
            {_continue && !back && <va-icon icon="navigate_far_next" />}
          </button>
        {messageAriaDescribedby && (
          <span id="button-description" class="usa-sr-only">
            {messageAriaDescribedby}
          </span>
        )}
      </Host>
    );
  }
}
