import {
  Component,
  // Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

@Component({
  tag: 'va-button',
  styleUrl: 'va-button.css',
  shadow: true,
})
export class VaButton {
  // @Element() el: HTMLElement;

  // TODO: add comments
  @Prop() disableAnalytics?: boolean;
  @Prop() disabled?: boolean; // do we want this? double check
  @Prop() label?: string; // could use this.el.getAttribute('aria-label') but this is more explicit
  @Prop() next?: boolean;
  @Prop() previous?: boolean;
  @Prop() secondary?: boolean;
  @Prop() submit?: boolean;
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
      disabled,
      handleClick,
      label,
      next,
      previous,
      secondary,
      submit,
      text,
    } = this;
    const styles = secondary ? 'va-button secondary' : 'va-button primary';
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
          {/* TODO: update class with icon name */}
          {previous && <i aria-hidden="true" class="fa" />}
          {text}
          {/* TODO: update class with icon name */}
          {next && <i aria-hidden="true" class="fa" />}
        </button>
      </Host>
    );
  }
}
