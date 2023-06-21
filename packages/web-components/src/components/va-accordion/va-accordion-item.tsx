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
   * 
   * Begin V1 Props
   * 
   */

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
   * 
   * End V1 Props
   * 
   */

  /**
   * The id of the accordion item, required for accessibility. (USWDS only)
   */
  @Prop() itemId?: string;

  /**
   * The id of the accordion item, required for accessibility. (USWDS only)
   */
  @Prop() bordered?: boolean = false;

  /**
   * Whether or not the component will use USWDS v3 styling.
   */
  @Prop() uswds?: boolean = false;


  /**
   * 
   * Begin V1 state
   * 
   */

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
   * 
   * End V1 state
   * 
   */

  private toggle(e) {
    const content = this.expandButton.parentElement.nextElementSibling
    if (content.hasAttribute('hidden')) {
      this.accordionItemToggled.emit(e);
      this.expandButton.setAttribute('aria-expanded', 'true');
      content.removeAttribute('hidden');
    } else {
      this.expandButton.setAttribute('aria-expanded', 'false');
      content.setAttribute('hidden', 'true');
    }
  }


  /**
   * 
   * Begin V1 methods and variables
   * 
   */



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
        currentTarget.click();
      }
    }
  }

  /**
   * 
   * End V1
   * 
   */

  

  render() {
    const {uswds} = this;

    if (uswds) {
      const {itemId, bordered} = this;
      const accordionItemClass = classNames({
        'usa-accordion--bordered': bordered,
      })
      return (
        <Host>
          <div class={accordionItemClass}>
            <h4 class="usa-accordion__heading">
              <button
                type="button"
                class="usa-accordion__button"
                aria-expanded="false"
                aria-controls={itemId}
                onClick={this.toggle.bind(this)}
                ref={el => {
                  this.expandButton = el;
                }}
              >
                <span class="usa-accordion__header">
                  <slot name="header-icon"></slot>
                  <slot name="header"></slot>
                </span>
                <span class="usa-accordion__subheader">
                  <slot name="subheader-icon"></slot>
                  <slot name="subheader"></slot>
                </span>
              </button>
            </h4>
            <div id={itemId} class="usa-accordion__content usa-prose" hidden>
              <slot name="content"></slot>
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
          <div id="content" tabIndex={0}>
            <slot />
          </div>
        </Host >
      );
    }
  }
}
