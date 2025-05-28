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
  @Prop() buttons!: Array<ButtonItem>;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * The index of the selected button.
   */
  @Prop() selected: number = 0;

  /**
   * Event emitted when a button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  buttonClick: EventEmitter;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * @function handleClick
   * @description Handles the click event on the segmented buttons.
   * It emits the `buttonClick` event with the selected button index and also emits a component library analytics event if analytics are not disabled via props.
   * @returns {void}
   *
   */
  private handleClick = (): void => {
    // Fire the component library analytics event if analytics is not disabled.
    if  (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-button-segmented',
        action: 'click',
        details: {
          selected: this.selected,
        },
      };

      this.componentLibraryAnalytics.emit(detail);
    }

    // Emit the buttonClick event with the selected index.
    this.buttonClick.emit(this.selected);
  };

  render() {
    const { buttons } = this;

    const containerClass = classnames({
      'usa-button-group': true,
      'va-segmented-button': true,

    });
    const buttonClass = classnames({
      'va-segmented-button__button': true,
    });

    // Do not render if no buttons are provided
    if (!buttons || !buttons.length) {
      return null;
    }

    return (
      <Host>
        <ul class={containerClass}>
          {buttons.map((buttonItem: ButtonItem, index: number) => (
            <li class="usa-button-group__item">
              <button
                class={buttonClass}
                onClick={() => {
                  this.selected = index;
                  this.handleClick();
                }}
                aria-label={buttonItem.label}
                aria-pressed={this.selected === index ? 'true' : 'false'}
                part="button"
              >
                {buttonItem.label}
              </button>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
