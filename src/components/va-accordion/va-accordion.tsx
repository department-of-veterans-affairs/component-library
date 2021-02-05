import { Component, Host, Listen, Prop, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.css',
  shadow: true,
})
export class VaAccordion {
  root!: HTMLElement;

  @Listen('accordionItemToggled')
  itemToggledHandler(event: CustomEvent) {
    const clickedItem = event.detail.target.parentNode.host;
    // Close the other items if this accordion isn't multi-selectable
    if (!this.multi) {
      getSlottedNodes(this.root, 'VA-ACCORDION-ITEM')
        .filter(item => item !== clickedItem)
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    const prevAttr = clickedItem.getAttribute('open') === 'true' ? true : false;
    clickedItem.setAttribute('open', !prevAttr);
  }

  /**
   * Whether or not the accordion has a border
   */
  @Prop() bordered: boolean;

  /**
   * Can multiple items be opened at once
   */
  @Prop() multi: boolean;

  render() {
    return (
      <Host ref={el => (this.root = el as HTMLElement)}>
        <slot />
      </Host>
    );
  }
}
