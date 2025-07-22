import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  Listen,
  h,
} from '@stencil/core';
import classnames from 'classnames';

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
  private tabItems: NodeListOf<HTMLVaTabItemElement>;
  private tabWithFocus: HTMLVaTabItemElement;
  private allowRender: boolean = true;

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
  @Prop({ mutable: true }) selected?: number = 0;

  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  componentWillRender() {
    // Check if there are any va-tab-item elements in the slot and flip `allowRender`
    // to false if not.
    const tabItems = this.el.querySelectorAll('va-tab-item');
    if (tabItems.length === 0) {
      this.allowRender = false;
      console.warn('va-tabs: No va-tab-item elements found. The component will not render.');
    }
  }

  connectedCallback() {
    // Populate the `tabItems` property with all `va-tab-item` elements in the slot
    this.tabItems = this.el.querySelectorAll('va-tab-item');

    // Set value on the n-th element corresponding to the value of the `selected` prop.
    if (this.selected < 0 || this.selected >= this.tabItems.length) {
      console.warn(`Selected index ${this.selected} is out of bounds. Resetting to 0.`);
      this.selected = 0; // Reset to the first tab if out of bounds.
    }

    const selectedTab = this.tabItems[this.selected];
    if (selectedTab) {
      selectedTab.setAttribute('is-selected-tab', 'true');
    }

    // Set the focused button to the selected tab's button.
    this.tabWithFocus = this.tabItems[this.selected];

    // If there are more than three tabs passed to slot, remove any beyond the first three.
    if (this.tabItems.length > 3) {
      // Convert NodeList to Array and slice the first three items.
      const firstThreeItems = Array.from(this.tabItems).slice(0, 3);

      // Remove all items from the slot.
      this.el.innerHTML = '';

      // Append the first three items back to the slot.
      firstThreeItems.forEach((item) => {
        this.el.appendChild(item);
      });

      // Then updated the `tabItems` property to reflect the new state.
      this.tabItems = this.el.querySelectorAll('va-tab-item');
    }

    // With all elements reset to hidden, query DOM for the element with the ID
    // of the clicked tab's URL.
    if (this.tabItems.length > 0) {
      const targetId = this.tabItems[this.selected].getAttribute('target-id');
      const targetElement = document.querySelector(`#${targetId}`);

      // Remove hidden attribute from the target element if it exists.
      if (targetElement) {
        // Ensure the target element is visible by removing any 'hidden' attribute.
        targetElement.removeAttribute('hidden');
      }
    }
  }

  @Listen('tabItemSelected')
  itemToggledHandler(event: CustomEvent) {
    // By default, assume the selected tab is the one that was clicked.
    let selectedTab = event.target as HTMLVaTabItemElement;

    this.tabWithFocus = selectedTab;

    // Emit analytics event if analytics is not disabled.
    if (!this.disableAnalytics) {
      let currentlyActiveIndex = Array.from(this.tabItems).indexOf(selectedTab);

      const detail = {
        componentName: 'va-button-segmented',
        action: 'click',
        details: {
          selected: currentlyActiveIndex,
        },
      };

      this.componentLibraryAnalytics.emit(detail);
    }

    // If tab that was clicked is already selected, do nothing.
    if (selectedTab.getAttribute('is-selected-tab') === 'true') {
      return;
    }

    // Get references to the currently selected tab and its panel.
    const tabToDeselect = this.el.querySelector('va-tab-item[is-selected-tab="true"]')
      || this.el.querySelector('va-tab-item[is-selected-tab=""]');
    const panelToHide = this.el.querySelector('va-tab-panel[selected="true"]')
      || this.el.querySelector('va-tab-panel[selected=""]');

    // Deselect the currently selected tab and hide its panel.
    tabToDeselect?.setAttribute('is-selected-tab', 'false');
    panelToHide?.setAttribute('selected', 'false');

    // Get the target ID of the clicked tab.
    const targetId = selectedTab.getAttribute('target-id');
    const panelToDisplay = this.el.querySelector(`va-tab-panel[panel-id="${targetId}"]`);

    // Select new tab and display its panel.
    selectedTab.setAttribute('is-selected-tab', 'true');
    panelToDisplay?.setAttribute('selected', 'true');
  }

  @Listen('tabItemKeyNavigated')
  itemKeyNavigatedHandler(event: CustomEvent) {
    const keyPressed = event.detail.key;

    // Get index of the currently focused tab item and its nested button.
    let newFocusedIndex = Array.from(this.tabItems).indexOf(this.tabWithFocus);
    const button = this.tabWithFocus.shadowRoot?.querySelector('button.va-tabs__tab_item');

    // Determine if the key pressed is a left or right arrow key
    if (keyPressed === "ArrowRight" || keyPressed === "ArrowLeft") {
      button.setAttribute("tabindex", "-1");

      // Move right
      if (keyPressed === "ArrowRight") {
        newFocusedIndex++;
        // If we're at the end, go to the start
        if (newFocusedIndex >= this.tabItems.length) {
          newFocusedIndex = 0;
        }
        // Move left
      } else if (keyPressed === "ArrowLeft") {
        newFocusedIndex--;
        // If we're at the start, move to the end
        if (newFocusedIndex < 0) {
          newFocusedIndex = this.tabItems.length - 1;
        }
      }

      // Update the tab index of the next button to be made selected and manually
      // focus on it.
      this.tabWithFocus = this.tabItems[newFocusedIndex];
      let nextButton = this.tabWithFocus.shadowRoot?.querySelector('button.va-tabs__tab_item');
      nextButton.setAttribute("tabindex", "0");
      (nextButton as HTMLElement).focus();
    }
  }

  render() {
    let { label } = this;

    const containerClass = classnames({
      'va-tabs': true,
    });

    const listClass = classnames({
      'va-tabs__list': true,
    });

    if (!this.allowRender) {
      return null;
    }

    return (
      <Host>
        <section class={containerClass}>
          <div role="tablist" aria-label={label} class={listClass}>
            <slot name="tab"></slot>
          </div>
          <slot name="panel"></slot>
        </section>
      </Host>
    );
  }
}
