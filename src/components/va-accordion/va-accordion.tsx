import { Component, Element, Host, Listen, Prop, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.css',
  shadow: true,
})
export class VaAccordion {
  @Element() el!: any;

  @Listen('accordionItemToggled')
  itemToggledHandler(event: CustomEvent) {
    const clickedItem = event.detail.target.parentNode.host;
    // Close the other items if this accordion isn't multi-selectable
    if (!this.multi) {
      getSlottedNodes(this.el, 'va-accordion-item')
        .filter(item => item !== clickedItem)
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    const prevAttr = clickedItem.getAttribute('open') === 'true' ? true : false;
    clickedItem.setAttribute('open', !prevAttr);
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
