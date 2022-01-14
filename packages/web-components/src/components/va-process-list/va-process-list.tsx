import { Component, Host, Element, State, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-process-list',
  styleUrl: 'va-process-list.css',
  shadow: true,
})
export class VaProcessList {
  @Element() el: any;

  @State() items: Array<Node>;
  /**
   * This function is for taking the slotted content and rendering
   * it inside the `<ol>` element. Putting the `<slot>` directly
   * inside the `<ol>` prevents `<li>` from being the only child type
   */
  private populateItems() {
    this.items = getSlottedNodes(this.el, 'li').map((node: HTMLLIElement) => {
      console.log(node);
      return <li>Testing</li>;
    });
  }

  render() {
    return (
      <Host>
        <slot onSlotchange={() => this.populateItems()}></slot>
        <ol role="list">{this.items}</ol>
      </Host>
    );
  }
}
