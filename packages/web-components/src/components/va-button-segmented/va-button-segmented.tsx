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
interface Button {
  text: string;
  value: string;
}
@Component({
  tag: 'va-button-segmented',
  styleUrl: 'va-button-segmented.scss',
  shadow: true,
})


export class VaButtonSegmented {
  @Element() el: HTMLElement;

  /**
   * The text displayed on the button segment.
   */
  @Prop() buttons: Array<Button>;

  /**
   * If `true`, the segment is selected.
   */
  @Prop({ reflect: true }) selected: number = 0;

  /**
   * If `true`, the segment is disabled.
   */
  @Prop() fullWidth?: boolean = false;

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
    const detail = {
      componentName: 'va-button-segmented',
      action: 'click',
      details: {
        selected: this.selected,
      },
    };

    this.componentLibraryAnalytics.emit(detail);
  };

  render() {
    const { selected } = this;
    const buttonClass = classnames({
      'va-segmented-button': true,
      'va-segmented-button--selected': selected,
    });

    return (
      <Host>
        <button
          class={buttonClass}
          aria-pressed={selected ? 'true' : 'false'}
          part="button"
        >
          Text
        </button>
      </Host>
    );
  }
}
