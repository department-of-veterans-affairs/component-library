import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

/**
 * Accordions are a list of headers that can be clicked to hide or reveal additional content.
 *
 * ## Usability
 * ### When to use
 * - Users only need a few specific pieces of content within a page.
 * - Information needs to be displayed in a small space.
 *
 * ### When to consider something else
 * - If visitors need to see most or all of the information on a page. Use well-formatted text instead.
 * - If there is not enough content to warrant condensing. Accordions increase cognitive load and interaction cost, as users have to make decisions about what headers to click on.
 *
 * ### Guidance
 *
 * - Allow users to click anywhere in the header area to expand or collapse the content; a larger target is easier to manipulate.
 * - Make sure interactive elements within the collapsible region are far enough from the headers that users don’t accidentally trigger a collapse. (The exact distance depends on the device.
 */
@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.css',
  shadow: true,
})
export class VaAccordion {
  @Element() el!: any;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Listen('accordionItemToggled')
  itemToggledHandler(event: CustomEvent) {
    // The event target is the button, and it has a parent which is a header.
    // It is the parent of the header (the root item) that we need to access
    // The final parentNode will be a shadowRoot, and from there we get the host.
    // https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/host
    const clickedItem =
      event.detail.currentTarget.parentNode.parentNode.host || // if we are on IE, `.host` won't be there
      event.detail.currentTarget.parentNode.parentNode;
    // Close the other items if this accordion isn't multi-selectable
    
    // Usage for slot to provide context to analytics for header and level
    getSlottedNodes(clickedItem, null).map(
      (node: HTMLSlotElement) => {
        this.slotHeader = node.innerHTML
        this.slotTag = parseInt(node.tagName.toLowerCase().split('')[1])
    })
    if (this.openSingle) {
      getSlottedNodes(this.el, 'va-accordion-item')
        .filter(item => item !== clickedItem)
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    const prevAttr = clickedItem.getAttribute('open') === 'true' ? true : false;

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'Accordion',
        action: prevAttr ? 'collapse' : 'expand',
        details: {
          header: this.slotHeader || clickedItem.header,
          subheader: clickedItem.subheader,
          level: this.slotTag || clickedItem.level,
          sectionHeading: this.sectionHeading,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }

    clickedItem.setAttribute('open', !prevAttr);

    if (!this.isScrolledIntoView(clickedItem)) {
      clickedItem.scrollIntoView();
    }
  }

  isScrolledIntoView(el: Element) {
    const elemTop = el?.getBoundingClientRect().top;

    if (!elemTop && elemTop !== 0) {
      return false;
    }

    // Only partially || completely visible elements return true
    return elemTop >= 0 && elemTop <= window.innerHeight;
  }

  /**
   * Whether or not the accordion items will have borders
   */
  @Prop() bordered: boolean;

  /**
   * True if only a single item can be opened at once
   */
  @Prop() openSingle: boolean;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  /**
   * Optional accordion section heading text. Only used in analytics event. Default is null.
   */
  @Prop() sectionHeading: string = null;

  /**
   * Local State for slot=headline replacement of props (header).
   * Provides context of the header text to the Accordion Item
   */
  @State() slotHeader: string = null;

  /**
   * Local State for slot=headline replacement of props (level).
   * Provides context of the level to the Accordion Item
   */
  @State() slotTag: number = null;


  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
