import {
  Component,
  // Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';
import classnames from 'classnames';

/**
 * @nativeHandler onClick
 */
@Component({
  tag: 'va-button',
  styleUrl: 'va-button.css',
  shadow: true,
})
export class VaButton {
  // @Element() el: HTMLElement;

  /**
   * Applies big button styling
   */
  @Prop() big?: boolean;

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
   * Adds an icon after the button text to represent navigation
   */
  @Prop() next?: boolean;

  /**
   * Adds an icon before the button text to represent navigation
   */
  @Prop() previous?: boolean;

  /**
   * Applies secondary button styling
   */
  @Prop() secondary?: boolean;

  /**
   * The button submits the form data
   */
  @Prop() submit?: boolean;

  /**
   * The text displayed on the button
   */
  @Prop() text!: string;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  private handleClick = (e: MouseEvent) => {
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

  render() {
    const {
      big,
      disabled,
      handleClick,
      label,
      next,
      previous,
      secondary,
      submit,
      text,
    } = this;

    const styles = classnames('va-button', {
      big: big,
      secondary: secondary || previous,
    });
    const type = submit ? 'submit' : 'button';

    return (
      <Host>
        <button
          aria-label={label}
          class={styles}
          disabled={disabled}
          onClick={handleClick}
          type={type}
        >
          {previous && <i aria-hidden="true" class="fa fa-angles-left" />}
          {text}
          {next && <i aria-hidden="true" class="fa fa-angles-right" />}
        </button>
      </Host>
    );
  }
}
