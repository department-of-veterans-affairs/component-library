import {
  Component,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Element,
  Watch,
} from '@stencil/core';
import { truncate } from '../../utils/utils';
import classnames from 'classnames';
import { ButtonItem } from './va-button-segmented.types';

/**
 * @componentName Button Segmented
 * @nativeHandler onClick
 * @maturityCategory caution
 * @maturityLevel candidate
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
  @Prop({ mutable: true }) buttons!: Array<ButtonItem>;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * The index of the selected button.
   */
  @Prop({ mutable: true }) selected: number = 0;

  /**
   * Watch for changes to the `buttons` property and do validation to ensure it does not exceed four buttons.
   */
  @Watch('buttons')
  validateButtons(newValue: Array<ButtonItem>) {
    // Ensure there are no more than four buttons
    if (newValue.length > 4) {
      this.buttons = newValue.slice(0, 4);
    }
  }

  /**
   * Watch for changes to the `selected` property and ensure it is within bounds.
   */
  @Watch('selected')
  validateSelectedIndex(newValue: number) {
    // Reset to the first button if out of bounds
    if (newValue < 0 || newValue >= this.buttons.length) {
      this.selected = 0;
    }
  }

  /**
   * Event emitted when selected button changes (a button is clicked).
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaChange: EventEmitter;

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
   * Before component loads, validate the initial buttons array and ensure it does not exceed four buttons.
   */
  componentWillLoad() {
    if (this.buttons && this.buttons.length > 4) {
      this.buttons = this.buttons.slice(0, 4);
    }
  }

  /**
   * @function handleClick
   * @description Handles the click event on the segmented buttons.
   * @param {ButtonItem} buttonItem - The button item that was clicked.
   * @returns {void}
   */
  private handleClick = (buttonItem: ButtonItem): void => {
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

    // Emit the vaChange event with the selected buttonItem.
    this.vaChange.emit(buttonItem);
  };

  render() {
    const containerClass = classnames({
      'usa-button-group': true,
      'va-segmented-button': true,
    });

    const buttonClass = classnames({
      'va-segmented-button__button': true,
    });

    // Do not render if no buttons are provided
    if (!this.buttons || !this.buttons.length) {
      return null;
    }

    return (
      <Host>
        <ul class={containerClass}>
          {this.buttons.map((buttonItem: ButtonItem, index: number) => (
            <li class="usa-button-group__item">
              <button
                class={buttonClass}
                onClick={() => {
                  this.selected = index;
                  this.handleClick(buttonItem);
                }}
                aria-label={buttonItem.label}
                title={buttonItem.label.length > 20 ? buttonItem.label : ''}
                type="button"
                aria-pressed={this.selected === index ? 'true' : 'false'}
              >
                {truncate(buttonItem.label, 145, null)}
              </button>
            </li>
          ))}
        </ul>
      </Host>
    );
  }
}
