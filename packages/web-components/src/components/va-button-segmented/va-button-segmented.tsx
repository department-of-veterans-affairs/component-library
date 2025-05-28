import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Element,
} from '@stencil/core';
import classnames from 'classnames';
import { ButtonItem } from './va-button-segmented.types';

/**
 * @componentName Button Segmented
 * @nativeHandler onClick
 * @maturityCategory use
 * @maturityLevel alpha
 */

@Component({
  tag: 'va-button-segmented',
  styleUrl: 'va-button-segmented.scss',
  shadow: true,
})


export class VaButtonSegmented {
  @Element() el: HTMLElement;

  /**
   * An array of objects defining the labels and values for each button.
   */
  @Prop() buttons: Array<ButtonItem>;

  /**
   * The index of the selected button.
   */
  @Prop({ reflect: true }) selected: number = 0;

  /**
   * If `true`, the segmented button will span the viewport width.
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
    const { buttons } = this;
    const buttonClass = classnames({
      'va-segmented-button': true,
    });

    return (
      <Host>
        {buttons.map((buttonItem, index) => (
          <button
            class={buttonClass}
            onClick={() => {
              this.selected = index;
              this.handleClick();
            }}
            aria-pressed={this.selected === index ? 'true' : 'false'}
            part="button"
          >
            {buttonItem.label}
          </button>
        ))}
        
      </Host>
    );
  }
}
