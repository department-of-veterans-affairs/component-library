import { Component, Element, Host, Listen, Prop, h } from '@stencil/core';

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

  @Listen('accordionItemToggled')
  itemToggledHandler(event: CustomEvent) {
    const clickedItem = event.detail.target.parentNode.parentNode.host;
    // Close the other items if this accordion isn't multi-selectable
    if (!this.multi) {
      this.getSlottedNodes(this.el, 'va-accordion-item')
        .filter(item => item !== clickedItem)
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    const prevAttr = clickedItem.getAttribute('open') === 'true' ? true : false;
    clickedItem.setAttribute('open', !prevAttr);
  }

  /**
   * Get all of the slotted children in the root element that match `nodeName`
   */
  getSlottedNodes(root: HTMLElement, nodeName: string): Array<Node> {
    return root.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .filter(item => item.nodeName.toLowerCase() === nodeName);
  }

  /**
   * Whether or not the accordion items will have borders
   */
  @Prop() bordered: boolean;

  /**
   * True if multiple items can be opened at once
   */
  @Prop() multi: boolean;

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
