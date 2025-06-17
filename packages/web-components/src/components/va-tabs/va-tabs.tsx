import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Watch,
  h,
} from '@stencil/core';
import classnames from 'classnames';
import { TabItem } from './va-tabs.types';


/**
 * @componentName Tabs
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-tabs',
  styleUrl: 'va-tabs.scss',
  shadow: true,
})
export class VaTabs {
  @Element() el: HTMLElement;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * A unique name for the rendered nav landmark. To be set as value for wrapper's `aria-label` attribute.
   */
  @Prop() label: string;

  /**
   * The index of the currently selected tab. Defaults to 0 (the first tab).
   */
  @Prop({ mutable: true }) selected: number = 0;

  /**
   * An array of tab item objects, each containing a label and a URL.
   */
  @Prop({ mutable: true }) tabItems!: TabItem[];

  /**
   * Watch for changes to the `selected` property and ensure it is within bounds.
   */
  @Watch('selected')
  validateSelectedIndex(newValue: number) {
    // Reset to the first button if out of bounds
    if (newValue < 0 || newValue >= this.tabItems.length) {
      this.selected = 0;
    }
  }

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  connectedCallback() {
    // Make sure that the tab panel corresponding to the selected tab is visible
    // when the component is first rendered.
    this.validateSelectedIndex(this.selected);

    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    const targetId = this.tabItems[this.selected].url.replace('#', '');
    const targetElement = document.getElementById(targetId);

    // Remove hidden attribute from the target element if it exists.
    if (targetElement) {
      // Ensure the target element is visible by removing any 'hidden' attribute.
      targetElement.removeAttribute('hidden');
    }
  }

  /**
   * @function handleClick
   * @description Handles the click event of an individual tab.
   * @returns {void}
   */
  private handleClick = (event: Event, clickedIndex: number): void => {
    // Prevent the default anchor behavior in order to prevent the page from
    // jumping to the anchor link when the tab is clicked.
    event.preventDefault();

    // Fire the component library analytics event if analytics is not disabled.
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-button-segmented',
        action: 'click',
        details: {
          selected: this.selected,
        },
      };

      this.componentLibraryAnalytics.emit(detail);
    }

    // Update the selected index to the clicked tab's index.
    this.selected = clickedIndex;

    // Reset all tab panel content elements to hidden by iterating over the URLs
    // of the tab items and setting the 'hidden' attribute on each corresponding
    // element.
    this.tabItems.forEach((item: TabItem) => {
      const targetId = item.url.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.setAttribute('hidden', '');
      }
    });

    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    const targetId = this.tabItems[clickedIndex].url.replace('#', '');
    const targetElement = document.getElementById(targetId);

    // Remove hidden attribute from the target element if it exists.
    if (targetElement) {
      // Ensure the target element is visible by removing any 'hidden' attribute.
      targetElement.removeAttribute('hidden');
    }
  };

  /**
   * @function handleKeyDown
   * @description Handles keyboard navigation for the tabs.
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {number} index - The index of the currently focused tab.
   * @returns {void}
   */
  private handleKeyDown = (event: KeyboardEvent, index: number): void => {
    const currentlyActiveElement = document.activeElement as HTMLAnchorElement;
    if (event.key === ' ') {
      event.preventDefault(); // Prevent scrolling when space is pressed
      this.handleClick(event, index);
    }
    // Handle keyboard navigation for the tabs
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      // Move to the next tab
      const nextIndex = index === this.tabItems.length - 1 ? 0 : index + 1;
      console.log('nextIndex', nextIndex);
      this.selected = nextIndex;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      // Move to the previous tab
      const prevIndex = (index - 1 + this.tabItems.length) % this.tabItems.length;
      console.log('prevIndex', prevIndex);
      this.selected = prevIndex;
    }

    // Query the DOM for the element with the ID of the clicked tab's URL.
    const targetId = this.tabItems[this.selected].url.replace('#', '');
    const targetElement = document.getElementById(targetId);

    currentlyActiveElement.blur();

    // If the target element exists, focus it.
    if (targetElement) {
      targetElement.focus();
    }
  }

  render() {
    const {
      label,
      selected,
      tabItems
    } = this;

    const containerClass = classnames({
      'va-tabs': true,
    });

    const listClass = classnames({
      'va-tabs__list': true,
    });

    // Check to ensure that tabItems is an array and has at least one item with
    // a valid label and URL before rendering
    // TODO: Should we enforce at least two tab items?
    if (
      !Array.isArray(tabItems) ||
      tabItems.length === 0 ||
      !tabItems.some(item => item.label && item.url)
    ) {
      console.error('va-tabs: Invalid tabItems prop: must be an array with at least one item containing a valid label and URL.');
      return null;
    }

    return (
      <Host>
        <nav aria-label={label} class={containerClass}>
          <ul class={listClass}>
            {tabItems.map((item: TabItem, index: number) => (
              <li class={index === selected ? 'va-tabs__tab_item selected' : 'va-tabs__tab_item'}>
                <a
                  href={`${item.url}`}
                  aria-current={index === selected ? 'page' : undefined}
                  onClick={(e: MouseEvent) => this.handleClick(e, index)}
                  onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, index)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Host>
    );
  }
}
