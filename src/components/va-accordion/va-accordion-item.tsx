import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.css',
  shadow: true,
})
export class VaAccordionItem {
  content!: HTMLDivElement;

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
    // e.detail.content = this.content;
    this.accordionItemToggled.emit(e);
  }

  render() {
    console.log('rendering');
    return (
      <Host>
        <button onClick={this.toggleOpen.bind(this)} class="usa-accordion-button" aria-expanded={this.open ? 'true' : 'false'} aria-controls="content">
          {this.header}
        </button>
        <div id="content" ref={el => (this.content = el as HTMLDivElement)}>
          <slot />
        </div>
      </Host>
    );
  }
}
