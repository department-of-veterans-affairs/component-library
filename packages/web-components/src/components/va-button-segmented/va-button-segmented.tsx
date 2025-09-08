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
import classnames from 'classnames';
import { ButtonItem } from './va-button-segmented.types';

/**
 * @componentName Button Segmented
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref button/button-segmented
 */
@Component({
  tag: 'va-button-segmented',
  styleUrl: 'va-button-segmented.scss',
  shadow: true,
})
export class VaButtonSegmented {
  @Element() el: HTMLElement;

  /**
   * The aria-label for the button group, used for accessibility. Not required, but recommended.
   */
  @Prop() label: string;

  /**
   * An array of objects defining the labels and values for each button. The recommended structure is: `{ label: string, value?: string }`, with the `label` property being required.
   * The `value` property is optional and can be used to store additional information about the button.
   * The maximum number of buttons allowed is four.
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
  vaButtonClick: EventEmitter;

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

    // Emit the vaButtonClick event with the selected buttonItem.
    this.vaButtonClick.emit(buttonItem);
  };

  render() {
    const containerClass = classnames({
      'usa-button-group': true,
      'va-segmented-button': true,
    });

    const buttonClass = classnames({
      'va-segmented-button__button': true,
    });

    // Validate that the buttons prop is provided and is a non-empty array.
    if (!this.buttons || !Array.isArray(this.buttons) || this.buttons.length === 0) {
      console.error('va-button-segmented: "buttons" prop array is required and must contain at least one item.');
      return null;
    }

    return (
      <Host>
        <ul class={containerClass} aria-label={this.label} data-count={this.buttons.length}>
          {this.buttons.map((buttonItem: ButtonItem, index: number) => (
            <li class="usa-button-group__item">
              <button
                class={buttonClass}
                onClick={() => {
                  this.selected = index;
                  this.handleClick(buttonItem);
                }}
                type="button"
                title={buttonItem.label.length > 20 ? buttonItem.label : undefined}
                aria-pressed={this.selected === index ? 'true' : 'false'}
                data-label={buttonItem.label}
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
