import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  h,
} from '@stencil/core';
import classNames from 'classnames';
import { Sanitizer } from '../../utils/utils';

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
   * Optional text that will be read by screen readers in addition to the header text.
  */
  @Prop() headerSrOnly?: string;

  /**
   * Optional accordion item subheader text. Default is null.
  */
  @Prop() subheader?: string = null;

  /**
   * True if the item is open
  */
  @Prop({ reflect: true }) open?: boolean = false;

  /**
   * Header level for button wrapper. Must be between 1 and 6
   */
  @Prop() level?: number = 2;

  /**
   * Whether or not the accordion item will have a border
   */
  @Prop() bordered?: boolean = false;

  /**
   * Toggle button reference
   */
  private expandButton: HTMLButtonElement = null;

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

  /**
   * Handle click events using @Listen decorator for better NVDA compatibility.
   * This pattern matches va-button and works better with Shadow DOM + screen readers.
   */
  @Listen('click')
  handleClick(e: MouseEvent) {
    // Emit the event - let the parent accordion handle the logic
    this.accordionItemToggled.emit(e);
  }

  render() {
    const {
      bordered,
      header,
      subheader,
      level,
      open,
      headerSrOnly,
    } = this;

    const headlineSlot = this.el.querySelector('[slot="headline"]');

    const accordionItemClass = classNames({
      'usa-accordion--bordered': bordered,
    });

    const Header = () => {
      // Determine tag and attributes based on slot vs prop usage
      const Tag = (headlineSlot && headlineSlot.tagName.toLowerCase().startsWith('h'))
        ? headlineSlot.tagName.toLowerCase()
        : `h${level}`;

      const headerClass = classNames({
        'va-accordion__header': true,
        'va-accordion__header--has-icon': this.el.querySelector('[slot="icon"]'),
      });

      const subHeaderClass = classNames({
        'va-accordion__subheader': true,
        'va-accordion__subheader--has-icon': this.el.querySelector('[slot="subheader-icon"]'),
      });

      // For slots: extract attributes and content
      let slotAttributes = {};
      let headerContent;
      
      if (headlineSlot) {
        // Capture all attributes from the slot element except slot attribute
        for (const attr of Array.from(headlineSlot.attributes)) {
          if (attr.name !== 'slot') {
            slotAttributes[attr.name] = attr.value;
          }
        }
        // Get the inner content (innerHTML) to avoid nested headings
        // Sanitize the HTML content for security
        const sanitizedContent = Sanitizer.escapeHTML([headlineSlot.innerHTML]);
        headerContent = <span innerHTML={sanitizedContent}></span>;
      } else {
        // For props: use header prop directly
        headerContent = header;
      }

      return (
        <Tag class="usa-accordion__heading" {...slotAttributes}>
          <button
            type="button"
            class="usa-accordion__button"
            aria-expanded={open ? 'true' : 'false'}
            aria-controls="content"
            ref={el => {
              this.expandButton = el;
            }}
            part="accordion-header"
          >
            <span class={headerClass}>
              <slot name="icon" />
              {headerContent}
              {headerSrOnly && <span class="usa-sr-only">&nbsp;{headerSrOnly}</span>}
            </span>
            {this.subheader &&
              <span class={subHeaderClass}>
                <slot name="subheader-icon" />
                {subheader}
              </span>}
          </button>
        </Tag>
      );
    }

    return (
      <Host>
        <div class={accordionItemClass}>
          <Header />
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
  }
}
