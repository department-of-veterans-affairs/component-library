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
 * @componentName Button Segmented
 * @nativeHandler onClick
 * @maturityCategory use
 * @maturityLevel alpha
 */

@Component({
  tag: 'va-buttton-segmented',
  styleUrl: 'va-buttton-segmented.scss',
  shadow: true,
})
export class VaButttonSegmented {
  @Element() el: HTMLElement;

  /**
   * The text displayed on the button segment.
   */
  @Prop() text?: string;

  /**
   * If `true`, the segment is selected.
   */
  @Prop({ reflect: true }) selected?: boolean = false;

  /**
   * If `true`, the segment is disabled.
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

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
    if (!this.disabled) {
      const detail = {
        componentName: 'va-buttton-segmented',
        action: 'click',
        details: {
          selected: this.selected,
          label: this.text,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  @Listen('click')
  handleClickOverride(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.handleClick();
  }

  render() {
    const { selected, disabled, text } = this;
    const buttonClass = classnames({
      'va-segmented-button': true,
      'va-segmented-button--selected': selected,
      'va-segmented-button--disabled': disabled,
    });
    return (
      <Host>
        <button
          class={buttonClass}
          aria-pressed={selected ? 'true' : 'false'}
          aria-disabled={disabled ? 'true' : undefined}
          part="button"
        >
          {text}
        </button>
      </Host>
    );
  }
}
