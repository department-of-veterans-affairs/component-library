import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
import classNames from 'classnames'

@Component({
  tag: 'va-tab-item',
  styleUrl: 'va-tab-item.scss',
  shadow: true,
})
export class VaTabItem {
  buttonElement: HTMLButtonElement;

  /**
   * Reference to host element
   */
  @Element() el: HTMLElement;

  /**
   * The text content of the button element.
   */
  @Prop() buttonText!: string;

  /**
   * The id of the target panel that this tab item controls.
   */
  @Prop() targetId!: string;

  /**
   * Denotes whether this tab item is currently selected in parent va-tabs.
   */
  @Prop({ reflect: true }) isSelectedTab?: boolean = false;

  /**
   * This event is fired so that va-tabs element can manage which item is selected.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  tabItemSelected: EventEmitter;

  /**
   * This event is fired when the user navigates between tab items using the keyboard
   * using the left and right arrow keys. It allows focus to be managed by parent va-tabs.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  tabItemKeyNavigated: EventEmitter;

  connectedCallback() {
    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    // if (this.isSelectedTab) {
    //   const targetElement = document.getElementById(this.targetId);

    //   // Remove hidden attribute from the target element if it exists.
    //   if (targetElement) {
    //     // Ensure the target element is visible by removing any 'hidden' attribute.
    //     targetElement.removeAttribute('hidden');
    //   }
    // }
  }

  /**
   * @function handleClick
   * @description Emits the `tabItemSelected` event when the component's button element is clicked.
   * @param {MouseEvent} e - The click event.
   */
  private handleClick(e: MouseEvent) {
    e.preventDefault();
    this.tabItemSelected.emit(e);
  }

  /**
   * @function handleKeyDown
   * @description When either the left or right arrow key is pressed, this method emits the `tabItemKeyNavigated` event. When the Enter or Space key is pressed, it triggers a click event.
   * @param {KeyboardEvent} e - The keydown event.
   */
  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      this.tabItemKeyNavigated.emit(e);
    }
    else if (e.key === 'Enter' || e.key === ' ') {
      // If the Enter or Space key is pressed, trigger the click event.
      this.handleClick(new MouseEvent('click', { bubbles: true, cancelable: true }));
    }
  }

  render() {
    const {
      buttonText,
      targetId,
      isSelectedTab
    } = this;

    const buttonClass = classNames({
      'va-tabs__tab_item': true,
    });

    return (
      <Host
        role="tab"
        class={buttonClass}
        aria-selected={isSelectedTab ? 'true' : 'false'}
        aria-controls={targetId}
        id={`${targetId}-tab`}
        ref={(el) => this.buttonElement = el as HTMLButtonElement}
        tabIndex={isSelectedTab ? 0 : -1}
        onClick={(e: MouseEvent) => this.handleClick(e)}
        onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
        data-label={buttonText}
      >
        {buttonText}
      </Host>
    );
  }
}
