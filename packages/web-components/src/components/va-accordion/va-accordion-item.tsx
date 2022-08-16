import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';
import { uniqueId } from '../../../../react-components/src/helpers/utilities';

@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.scss',
  // shadow: true,
})
export class VaAccordionItem {
  /**
   * Reference to host element
   */
  @Element() el: HTMLElement;

  headlineSlot!: HTMLElement;

  /**
   * The accordion item header text
   */
  @Prop() header?: string;

  /**
   * Optional accordion item subheader text. Default is null.
   */
  @Prop() subheader?: string = null;

  /**
   * True if the item is open
   */
  @Prop() open?: boolean = false;

  /**
   * Header level for button wrapper. Must be between 1 and 6
   */
  @Prop() level?: number = 2;

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

  /**
   * Toggle button reference
   */
  private expandButton: HTMLButtonElement = null;

  // Using onSlotChange to fire event on inital load
  // Data access from slot html element is being perfomed by this function
  // Function allows us to provide context to state
  // State is then being digested by the Header Function below
  private populateStateValues() {
    const node = this.headlineSlot.firstElementChild;
    this.slotHeader = node.innerHTML;
    this.slotTag = node.tagName.toLowerCase();
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
    // IE11 is unable to run onSlotChange
    // Check needed to populate Accordion Item Header information
    // When using slot="headline" to set the information
    const ieSlotCheckTag = this.el
      .querySelector('[slot="headline"]')
      ?.tagName.toLowerCase();
    const ieSlotCheckHeader =
      this.el.querySelector('[slot="headline"]')?.innerHTML;

    const contentId = uniqueId("content");

    const Header = () =>
      h(
        // TODO: Remove level & header prop & let the slot do its work
        /* eslint-disable-next-line i18next/no-literal-string */
        this.slotTag || ieSlotCheckTag || `h${this.level}`,
        null,
        <button
          ref={el => {
            this.expandButton = el;
          }}
          class="usa-accordion__button"
          aria-expanded={this.open ? 'true' : 'false'}
          aria-controls={contentId}
        >
          {this.slotHeader || ieSlotCheckHeader || this.header}
          {this.subheader ? <p>{this.subheader}</p> : false}
        </button>,
      );
    return (
      <Host class="usa-accordion__heading">
        <Header />
        <slot name="headline" ref={el => this.headlineSlot= el as HTMLElement} onSlotchange={() => this.populateStateValues()} />
        <div id={contentId} class="usa-accordion__content">
          <slot />
        </div>
      </Host>
    );
  }
}
