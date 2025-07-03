import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  //Listen,
  Prop,
  //State,
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
  /*
  @State() visibleButtonElements: NodeListOf<Element> | null = null;
  @State() overflowTabs: Array<TabItem> = [];
  @State() visibleTabs: Array<TabItem> = [];
  @State() windowWidth: number = window.innerWidth;
  @State() overflowMenuVisible: boolean = false;
  private resetRender: boolean = true;
  private debounce: number = null;*/
  private formattedTabItems: Array<TabItem> = [];
  //private visibleButtonElements: NodeListOf<Element> | null = null;


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
  @Prop() tabItems!: TabItem[] | string;

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

  /*
   * Watch for changes to the `overflowMenuVisible` property to reset the visible button elements.
   */
  // @Watch('overflowMenuVisible')
  // handleOverflowMenuVisibilityChange() {
  //   // Reset the visible button elements when the overflow menu visibility changes
  //   this.resetVisibleButtonElements();
  // }

  /*
   * Watch for changes to the `overflowTabs` property to reset the visible button elements.
   * This is necessary to ensure that the correct buttons are shown when the overflow items change.
   */
  // @Watch('overflowTabs')
  // handleOverflowTabsChange() {
  //   // Reset the overflow menu visibility when overflow items change
  //   this.resetVisibleButtonElements();
  // }

  // @Listen('resize', { target: 'window' })
  // handleResize() {
  //   if (this.debounce !== null) {
  //     clearTimeout(this.debounce);
  //     this.debounce = null;
  //   }
  //   this.debounce = window.setTimeout(() => {
  //     if (window.innerWidth > this.windowWidth) {
  //       // If the window is resized to be larger, reset the overflow items. Causes re-render.
  //       this.visibleButtonElements = null;
  //       this.overflowTabs = [];
  //       this.visibleTabs = [];
  //       this.resetRender = true;
  //     } else {
  //       this.checkForOverflow();
  //     }
  //     this.windowWidth = window.innerWidth;
  //     this.debounce = null;
  //   }, 100);
  // }


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
    if (!Array.isArray(this.tabItems) && typeof this.tabItems === 'string') {
      try {
        this.formattedTabItems = JSON.parse(this.tabItems as string) as TabItem[];
      } catch (e) {
        return false;
      }
    } else {
      this.formattedTabItems = this.tabItems as TabItem[];

      // If there are more than three tab items, slice the array to only include
      // the first three.
      if (this.formattedTabItems.length > 3) {
        this.formattedTabItems = this.formattedTabItems.slice(0, 3);
      }
    }
    // Make sure that the tab panel corresponding to the selected tab is visible
    // when the component is first rendered.
    this.validateSelectedIndex(this.selected);

    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    if (this.tabItems.length > 0) {
      const targetId = this.formattedTabItems[this.selected].url.replace('#', '');
      const targetElement = document.getElementById(targetId);

      // Remove hidden attribute from the target element if it exists.
      if (targetElement) {
        // Ensure the target element is visible by removing any 'hidden' attribute.
        targetElement.removeAttribute('hidden');
      }
    }
  }

  /*
  componentDidRender() {
    if (this.resetRender) {
      this.resetRender = false;
      this.checkForOverflow();
    }
  }


  componentDidUpdate() {
    // After the component updates, reset the visible button elements to ensure
    // that the references to DOM elements are correct in `this.visibleButtonElements`.
    this.resetVisibleButtonElements();
  }
    */

  /**
   * @function handleClick
   * @description Handles the click event of an individual tab.
   * @returns {void}
   */
  private handleClick = (event: Event, clickedIndex: number): void => {
    // Prevent the default anchor behavior in order to prevent the page from
    // jumping to the anchor button when the tab is clicked.
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
    this.formattedTabItems.forEach((item: TabItem) => {
      const targetId = item.url.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.setAttribute('hidden', '');
      }
    });

    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    const targetId = this.formattedTabItems[clickedIndex].url.replace('#', '');
    const targetElement = document.getElementById(targetId);

    // Remove hidden attribute from the target element if it exists.
    if (targetElement) {
      // Ensure the target element is visible by removing any 'hidden' attribute.
      targetElement.removeAttribute('hidden');
    }
  };

  /**
   * @function resetVisibleButtonElements
   * @description Resets the `visibleButtonElements` state array to reflect the current visible buttons in the tab list.
   * This is called after the component is rendered and when the window is resized to ensure that the visible buttons
   * are correctly identified.
   * @returns {void}
   */
 /// private resetVisibleButtonElements = (): void => {
    // If the overflow menu is visible, we want to show all buttons, including those in the overflow menu. Otherwise, we
    // only want to show the visible buttons in the tab list.
 //   let selectorString = this.overflowMenuVisible ?
 //     'button' :
 //     '.va-tabs__tab_visible_button, .va-tabs__tab_more_button';
 //   this.visibleButtonElements = this.el.shadowRoot.querySelectorAll(selectorString);
 // }

  /**
   * @function handleKeyDown
   * @description Handles keyboard navigation for the tabs.
   * @param {KeyboardEvent} event - The keyboard event.
   * @param {number} index - The index of the currently focused tab.
   * @returns {void}
   */
  private handleKeyDown = (event: KeyboardEvent, index: number): void => {
    let newFocusedIndex = index;
    let visibleButtonElements = this.el.shadowRoot.querySelectorAll('.va-tabs__tab_visible_button, .va-tabs__tab_more_button');
    // Determine if the key pressed is a left or right arrow key
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      visibleButtonElements[newFocusedIndex].setAttribute("tabindex", "-1");
      // Move right
      if (event.key === "ArrowRight") {
        newFocusedIndex++;

        //const lastIndex = this.overflowMenuVisible ? this.tabItems.length + 1 : this.visibleButtonElements.length;
        const lastIndex = this.formattedTabItems.length;
        // If we're at the end, go to the start
        if (newFocusedIndex >= lastIndex) {
          newFocusedIndex = 0;
        }
        // Move left
      } else if (event.key === "ArrowLeft") {
        newFocusedIndex--;
        // If we're at the start, move to the end
        if (newFocusedIndex < 0) {
          newFocusedIndex = visibleButtonElements.length - 1;
        }
      }

      visibleButtonElements[newFocusedIndex].setAttribute("tabindex", "0");
      (visibleButtonElements[newFocusedIndex] as HTMLElement).focus();
    }
  }

  /**
   * @function toggleOverflowMenu
   * @description Toggles the visibility of the overflow menu.
   * @returns {void}
   */
  /*private toggleOverflowMenu = (): void => {
    this.overflowMenuVisible = !this.overflowMenuVisible;
    this.resetVisibleButtonElements();
  }*/

  /**
   * @function checkForOverflow
   * @description Checks if the tab items overflow the container and updates the visible and overflow items accordingly.
   * @returns {void}
   */
  /*private checkForOverflow = (): void => {
    const container = this.el.shadowRoot.firstElementChild?.querySelector('.va-tabs__list');
    if (!container) {
      console.warn('va-tabs: Container for tab items not found.');
      return;
    }
    const firstRun = this.visibleTabs.length === 0;

    // Check if the container has overflow
    if (container.scrollWidth > container.clientWidth) {
      const items = Array.from(container.children) as HTMLAnchorElement[];
      const moreTabWith = (container.querySelector('.va-tabs__tab_item.overflow')?.clientWidth + 12) || 0; // 12px margin
      const clientWidth = container.clientWidth - moreTabWith;
      let visibleTabs = [], overflowTabs = this.overflowTabs;
      items.forEach((item, index) => {
        let rect = item.getBoundingClientRect();
        if ((rect.x + item.clientWidth + 24)  >  clientWidth) { // 24px for margin
          if (!overflowTabs.includes(this.formattedTabItems[index])) {
            overflowTabs.push(this.formattedTabItems[index]);
          }
        } else {
          visibleTabs.push(this.tabItems[index]);
        }
      });

      overflowTabs.sort((a,b) => {
        return this.formattedTabItems.indexOf(a) > this.formattedTabItems.indexOf(b) ? 1 : -1;
      })

      this.resetVisibleButtonElements();
      this.overflowTabs = overflowTabs;
      this.visibleTabs = visibleTabs;
      if (firstRun) {
        // Re-run because the more tab may have been added
        setTimeout(() => {
          this.checkForOverflow();
        })
      }
    } else {
      this.visibleTabs = this.formattedTabItems.map(ti => ({ ...ti }));;
      this.overflowTabs = [];
    }
  }*/

  render() {
    let {
      label,
      selected,
      formattedTabItems
    } = this;

    const containerClass = classnames({
      'va-tabs': true,
    });

    const listClass = classnames({
      'va-tabs__list': true,
    });

    // Check to ensure that tabItems is an array and has at least one item with
    // a valid label and URL before rendering
    if (
      !Array.isArray(formattedTabItems) ||
      formattedTabItems.length === 0 ||
      !formattedTabItems.some(item => item.label && item.url)
    ) {
      console.error('va-tabs: Invalid tabItems prop: must be an array with at least one item containing a valid label and URL.');
      return null;
    }

    // let tabItemsToRenderAsTabs = this.visibleTabs.length > 0 ? this.visibleTabs : formattedTabItems;

    /*function getFormattedTabItemIndex(item: TabItem): number {
      let matchedIndex;
      formattedTabItems.forEach((tabItem, index) => {
        if (tabItem.label === item.label && tabItem.url === item.url) {
          matchedIndex = index;
        }
      });
      return matchedIndex
    }*/

    return (
      <Host>
        <section class={containerClass}>
          <div role="tablist" aria-label={label} class={listClass}>
            {formattedTabItems.map((item: TabItem, index: number) => (
              <button
                role="tab"
                aria-selected={index === selected ? 'true' : 'false'}
                aria-controls={item.url.replace('#', '')}
                id={`${item.url}`}
                tabIndex={index === selected ? 0 : -1}
                class={'va-tabs__tab_item va-tabs__tab_visible'}
                onClick={(e: MouseEvent) => this.handleClick(e, index)}
                onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, index)}
                data-label={item.label}
              >
                {item.label}
              </button>
            ))}
            {/*
              The overflow menu code below is commented out for now. To restore, replace `{false && (...)}` with the code block.
              {false && (
                this.overflowTabs.length > 0 && (
                  <li class="va-tabs__tab_item overflow">
                    <button
                      aria-haspopup="true"
                      aria-expanded={this.overflowMenuVisible}
                      onClick={() => this.toggleOverflowMenu()}
                      onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, this.tabItems.length - this.overflowTabs.length)}
                      class="va-tabs__tab_more_button"
                    >
                      More ({this.overflowTabs.length}) <va-icon icon="expand_more"/>
                    </button>
                    <ul class={`va-tabs__overflow-menu ${this.overflowMenuVisible ? 'visible' : ''}`}>
                      {this.overflowTabs.map((item: TabItem) => (
                        <li class={getFormattedTabItemIndex(item) === selected ? 'va-tabs__tab_overflow-item selected' : 'va-tabs__tab_overflow-item'}>
                          <button
                            role="tab"
                            aria-selected={getFormattedTabItemIndex(item) === selected ? 'page' : undefined}
                            aria-controls={item.url.replace('#', '')}
                            id={`${item.url}`}
                            tabIndex={getFormattedTabItemIndex(item) === selected ? 0 : -1}
                            onClick={(e: MouseEvent) => {
                              this.handleClick(e, getFormattedTabItemIndex(item));
                              this.toggleOverflowMenu();
                            }}
                            onKeyDown={(e: KeyboardEvent) => this.handleKeyDown(e, getFormattedTabItemIndex(item) + 1)}
                            data-label={item.label}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </li>
                )
              )}
            */}
          </div>
        </section>
      </Host>
    );
  }
}
