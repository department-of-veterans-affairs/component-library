import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  // Listen,
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

  /**
   * @function handleClick
   * @description Handles the click event of an individual tab.
   * @returns {void}
   */
  private handleClick = (event: MouseEvent, clickedIndex: number): void => {
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
  };

  render() {
    const {
      label,
      selected,
      tabItems
    } = this;

    const containerClass = classnames({
      'va-tabs': true,
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
          <ul>
            {tabItems.map((item: TabItem, index: number) => (
              <li class={index === selected ? 'selected' : ''} key={item.label}>
                <a
                  href={`${item.url}`}
                  aria-current={index === selected ? 'page' : undefined}
                  onClick={(e: MouseEvent) => this.handleClick(e, index)}
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
