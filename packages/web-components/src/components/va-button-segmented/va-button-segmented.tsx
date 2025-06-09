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
   * The aria-label for the button group, used for accessibility
   */
  @Prop() ariaLabel!: string;

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

  /**
   * Handles keyboard navigation for the segmented buttons.
   * ArrowRight/ArrowDown: move to next button
   * ArrowLeft/ArrowUp: move to previous button
   */

  /**
   * @function handleKeyDown
   * @description Handles keyboard navigation for the segmented buttons. ArrowRight/ArrowDown: move to next button ArrowLeft/ArrowUp: move to previous button
   * @param {KeyboardEvent} e  - The keyboard event.
   * @param {number} index - The index of the currently focused button.
   * @returns {void}
   */
  private handleKeyDown(e: KeyboardEvent, index: number) {
    const total = this.buttons.length;
    let nextIndex = index;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % total;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + total) % total;
      e.preventDefault();
    }
    if (nextIndex !== index) {
      // Find all button elements in the group and focus the next one
      const host = this.el.shadowRoot || this.el;
      const btns = host.querySelectorAll('button.va-segmented-button__button');
      if (btns[nextIndex]) {
        (btns[nextIndex] as HTMLElement).focus();
      }
    }
  }

  render() {
    const containerClass = classnames({
      'usa-button-group': true,
      'va-segmented-button': true,
    });

    const buttonClass = classnames({
      'va-segmented-button__button': true,
    });

    // Do not render if no aria-label or buttons are provided
    if (!this.ariaLabel || !this.buttons || !this.buttons.length) {
      return null;
    }

    return (
      <Host>
        <ul class={containerClass} role="radiogroup" aria-label={this.ariaLabel}>
          {this.buttons.map((buttonItem: ButtonItem, index: number) => (
            <li class="usa-button-group__item">
              <button
                class={buttonClass}
                onClick={() => {
                  this.selected = index;
                  this.handleClick(buttonItem);
                }}
                onKeyDown={e => this.handleKeyDown(e, index)}
                aria-label={buttonItem.label}
                title={buttonItem.label.length > 20 ? buttonItem.label : ''}
                role="radio"
                aria-checked={this.selected === index ? 'true' : 'false'}
                tabIndex={this.selected === index ? 0 : -1}
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
