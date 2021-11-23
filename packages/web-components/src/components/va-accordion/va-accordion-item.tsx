import { Component, Element, Event, EventEmitter, Host, Prop, State, h } from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';
@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.css',
  shadow: true,
})
export class VaAccordionItem {
  /**
  * Reference to host element
  */
  @Element() el: HTMLElement;

  /**
   * This event is fired so that `<va-accordion>` can manage which items are opened or closed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  accordionItemToggled: EventEmitter;

  /**
   * The accordion item header text
   */
  @Prop() header: string;

  /**
   * Optional accordion item subheader text. Default is null.
   */
  @Prop() subheader: string = null;

  /**
   * True if the item is open
   */
  @Prop() open: boolean = false;

  /**
   * Header level for button wrapper. Must be between 1 and 6
   */
  @Prop() level: number = 2;

  /**
   * Local State for slot=headline replacement of props (header).
   * Provides context of the header text to the Accordion Item
   */
  @State() slotHeader: string = null;

  /**
   * Local State for slot=headline replacement of props (level).
   * Provides context of the level to the Accordion Item
   */
  @State() slotTag: string = null;

  private toggleOpen(e: MouseEvent): void {
    this.accordionItemToggled.emit(e);
  }

  // Using onSlotChange to fire event on inital load
  // Data access from slot html element is being perfomed by this function
  // Function allows us to provide context to state
  // State is then being digested by the Header Function below
  private populateStateValues() {
    getSlottedNodes(this.el, null).map(
      (node: HTMLSlotElement) => {
        this.slotHeader = node.innerHTML
        this.slotTag = node.tagName.toLowerCase()
      })
  }

  render() {
    const Header = () =>
      h(
        this.slotTag || `h${this.level}`,
        null,
        <button
          onClick={this.toggleOpen.bind(this)}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls="content"
        >
          {this.slotHeader || this.header}
          {this.subheader ? (<p>{this.subheader}</p>) : false}
        </button>,
      );

    return (
      <Host>
        <Header />
        <slot name="headline" onSlotchange={() => this.populateStateValues()}/>
        <div id="content">
          <slot />
        </div>
      </Host>
    );
  }
}
