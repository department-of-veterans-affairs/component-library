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

  @Prop() href!: string;

  @Prop({ reflect: true }) isSelectedTab?: boolean = false;

  /**
   * This event is fired so that va-tabs element can manage which item is selected.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  tabItemSelected: EventEmitter;

  connectedCallback() {
    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    if (this.isSelectedTab) {
      const targetId = this.href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      // Remove hidden attribute from the target element if it exists.
      if (targetElement) {
        // Ensure the target element is visible by removing any 'hidden' attribute.
        targetElement.removeAttribute('hidden');
      }
    }
  }

  componentDidLoad() {
    // Set the button element's data-label attribute to the text content of the slot.
    const slotContent = this.el.textContent?.trim() || '';
    const button = this.el.shadowRoot?.querySelector('.va-tabs__tab_item');
    if (button) {
      button.setAttribute('data-label', slotContent);
    }
  }

  private handleClick(e: MouseEvent) {
    e.preventDefault();
    this.tabItemSelected.emit(e);
  }

  private handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      this.tabItemSelected.emit(e);
    }
  }

  render() {
    const {
      href,
      isSelectedTab
    } = this;

    const buttonClass = classNames({
      'va-tabs__tab_item': true,
    });

    return (
      <Host>
        <button
          role="tab"
          class={buttonClass}
          aria-selected={isSelectedTab ? 'true' : 'false'}
          aria-controls={href.replace('#', '')}
          id={href}
          ref={(el) => this.buttonElement = el as HTMLButtonElement}
          tabIndex={isSelectedTab ? 0 : -1}
          onClick={(e: MouseEvent) => this.handleClick(e)}
          onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e)}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }
}
