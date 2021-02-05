import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.css',
  shadow: true,
})
export class VaAccordionItem {
  @Event({
    composed: true,
    bubbles: true,
  })
  accordionItemToggled: EventEmitter;

  /**
   * The accordion item header
   */
  @Prop() header: string;

  /**
   * Is the item open
   */
  @Prop() open: boolean = false;

  private toggleOpen(e: MouseEvent): void {
    this.accordionItemToggled.emit(e);
  }

  render() {
    return (
      <Host>
        <button onClick={this.toggleOpen.bind(this)} aria-expanded={this.open ? 'true' : 'false'} aria-controls="content">
          {this.header}
        </button>
        <div id="content">
          <slot />
        </div>
      </Host>
    );
  }
}
