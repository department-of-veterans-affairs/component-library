import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';
import classNames from 'classnames';
@Component({
  tag: 'va-accordion-item',
  styleUrl: 'va-accordion-item.scss',
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
   * Whether or not the accordion item will have a border
   */
  @Prop() bordered?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = true;

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

  private toggleOpen(e: MouseEvent): void {
    this.accordionItemToggled.emit(e);
  }

  // Using onSlotChange to fire event on inital load
  // Data access from slot html element is being perfomed by this function
  // Function allows us to provide context to state
  // State is then being digested by the Header Function below
  private populateStateValues() {
    getSlottedNodes(this.el, null).forEach((node: HTMLSlotElement) => {
      this.slotHeader = node.innerHTML;
      this.slotTag = node.tagName.toLowerCase();
    });
  }

  componentDidLoad() {
    // auto-expand accordion if the window hash matches the ID
    if (this.el.id && this.el.id === window.location.hash.slice(1)) {
      const currentTarget = this.expandButton;

      if (currentTarget) {
        this.open = true;
        this.el.setAttribute('open', 'true');
        this.el.scrollIntoView();
      }
    }
  }

  render() {
    const {uswds} = this;

    if (uswds) {
      const {bordered, header, subheader, level, open} = this;
      const accordionItemClass = classNames({
        'usa-accordion--bordered': bordered,
      });
      const Header = () => {
        const headline = this.el.querySelector('[slot="headline"]');
        const ieSlotCheckHeader = headline?.innerHTML;
        // eslint-disable-next-line i18next/no-literal-string
        const Tag = (headline && headline.tagName.includes("H"))
          ? headline.tagName.toLowerCase()
          // eslint-disable-next-line i18next/no-literal-string
          : `h${level}`;

        return (
          <Tag class="usa-accordion__heading">
            <button
              type="button"
              class="usa-accordion__button"
              aria-expanded={open ? 'true' : 'false'}
              aria-controls="content"
              onClick={this.toggleOpen.bind(this)}
              ref={el => {
                this.expandButton = el;
              }}
              part="accordion-header"
            >
              <span class="usa-accordion__header va-accordion__header">
                <slot name="icon" />
                {this.slotHeader || header || ieSlotCheckHeader}
              </span>
              {this.subheader &&
                <span class="va-accordion__subheader">
                  <slot name="subheader-icon" />
                  {subheader}
                </span>}
            </button>
          </Tag >
        );
      }

      return (
        <Host>
          <div class={accordionItemClass}>
            <Header/>
            <slot name="headline" onSlotchange={() => this.populateStateValues()} />
            <div
              id="content"
              class="usa-accordion__content usa-prose"
              hidden={!open}
              part="accordion-content"
            >
              <slot/>
            </div>
          </div>
        </Host>
      )

    } else {

      const Header = () => {
        const headline = this.el.querySelector('[slot="headline"]');
        const ieSlotCheckHeader = headline?.innerHTML;

        // eslint-disable-next-line i18next/no-literal-string
        const Tag = (headline && headline.tagName.includes("H"))
          ? headline.tagName.toLowerCase()
          // eslint-disable-next-line i18next/no-literal-string
          : `h${this.level}`;

        return (
          <Tag>
            <button
              ref={el => {
                this.expandButton = el;
              }}
              onClick={this.toggleOpen.bind(this)}
              aria-expanded={this.open ? 'true' : 'false'}
              aria-controls="content"
              part="accordion-header"
            >
              <span class="header-text">
                <slot name="icon" />
                {this.slotHeader || this.header || ieSlotCheckHeader}
              </span>
              {this.subheader &&
                <p class="subheader" part='accordion-subheader'>
                  <slot name="subheader-icon" />
                  {this.subheader}
                </p>}
            </button>
          </Tag >
        );
      }
      return (
        <Host>
          <Header />
          <slot name="headline" onSlotchange={() => this.populateStateValues()} />
          <div id="content">
            <slot />
          </div>
        </Host>
      );
    }
  }
}
