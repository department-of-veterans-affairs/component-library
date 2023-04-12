import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  h,
} from '@stencil/core';
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
   * This event is fired so that va-accordion element can manage which items are opened or closed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  accordionItemToggled: EventEmitter;

  /**
   * Optional accordion item subheader text. Default is null.
   */
  @Prop() subheader?: string = null;

  /**
   * True if the item is open
   */
  @Prop() open?: boolean = false;

  /**
   * Toggle button reference
   */
  private expandButton: HTMLButtonElement = null;

  private toggleOpen(e: MouseEvent): void {
    this.accordionItemToggled.emit(e);
  }

  componentDidLoad() {
    // auto-expand accordion if the window hash matches the ID
    if (this.el.id && this.el.id === window.location.hash.slice(1)) {
      const currentTarget = this.expandButton;
      if (currentTarget) {
        currentTarget.click();
      }
    }
  }

  render() {
    const headerText = this.el.querySelector('[slot="headline"]').innerHTML.replace(/(<([^>]+)>)/ig, '');
    return (
      <Host>
        <button
          ref={el => {
            this.expandButton = el;
          }}
          onClick={this.toggleOpen.bind(this)}
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls="content"
          aria-label={(`${headerText ?? ''}`).trim()}
        >
          <slot name="headline" />
          {this.subheader ? <p id='subheader'>{this.subheader}</p> : <slot name="subheader" />}
        </button>
        <div tabIndex={0} id="content">
          <slot />
        </div>
      </Host>
    );
  }
}
