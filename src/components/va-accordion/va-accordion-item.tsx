import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.css',
  shadow: true,
})
export class VaAccordionItem {
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

  private toggleOpen(e: MouseEvent): void {
    this.accordionItemToggled.emit(e);
  }

  addSubheader() {
    if (this.subheader) {
      console.log(this.subheader);
      return (
        <p class="vads-u-font-weight--normal vads-u-margin--0">{this.subheader}</p>
      )
    }
    return false;
  }

  render() {
    const Header = () =>
      h(
        `h${this.level}`,
        null,
        <button
          onClick={this.toggleOpen.bind(this)}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls="content"
        >
          {this.header}
          {this.addSubheader()}
        </button>,
      );

    return (
      <Host>
        <Header />
        <div id="content">
          <slot />
        </div>
      </Host>
    );
  }
}
