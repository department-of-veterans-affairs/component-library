import { Component, Element, Event, EventEmitter, Host, Listen, Prop, h } from '@stencil/core';

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
      event.detail.target.parentNode.parentNode.host || // if we are on IE, `.host` won't be there
      event.detail.target.parentNode.parentNode;
    // Close the other items if this accordion isn't multi-selectable
    if (!this.multi) {
      this.getSlottedNodes(this.el, 'va-accordion-item')
        .filter(item => item !== clickedItem)
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    const prevAttr = clickedItem.getAttribute('open') === 'true' ? true : false;

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'Accordion',
        action: prevAttr ? "collapse" : "expand",
        details: {
          header: clickedItem.header,
          subheader: clickedItem.subheader,
          level: clickedItem.level,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }

    clickedItem.setAttribute('open', !prevAttr);
  }

  /**
   * Get all of the slotted children in the root element that match `nodeName`
   */
  getSlottedNodes(root: HTMLElement, nodeName: string): Array<Node> {
    // If the browser is using the shadowDOM, the childNodes should be an array of two things:
    // A `<style>` element and a `<slot>` element
    // Chrome, Firefox, Safari, Edge - literally every modern browser will use shadowDOM.
    // This is purely for IE compatibility
    const hasShadowDOM =
      Array.from(root.shadowRoot.childNodes).filter(
        (node: any) => node.tagName === 'SLOT',
      ).length > 0;

    const children = hasShadowDOM
      ? root.shadowRoot.querySelector('slot').assignedNodes()
      : root.shadowRoot.childNodes;

    return Array.from(children).filter(
      item => item.nodeName.toLowerCase() === nodeName,
    );
  }

  /**
   * Whether or not the accordion items will have borders
   */
  @Prop() bordered: boolean;

  /**
   * True if multiple items can be opened at once
   */
  @Prop() multi: boolean;

  /**
   * If true, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics: boolean = false;

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
