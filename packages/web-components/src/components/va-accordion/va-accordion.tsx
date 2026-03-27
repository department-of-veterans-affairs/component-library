import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Listen,
  Prop,
  State,
  h,
  forceUpdate,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';
import { i18next } from '../..';
import { Build } from '@stencil/core';
import classNames from 'classnames';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * Accordions are a list of headers that can be clicked to hide or reveal additional content.
 *
 * ## Usability
 * ### When to use
 * - Users only need a few specific pieces of content within a page.
 * - Information needs to be displayed in a small space.
 *
 * ### When to consider something else
 * - If visitors need to see most or all of the information on a page. Use well-formatted text instead.
 * - If there is not enough content to warrant condensing. Accordions increase cognitive load and interaction cost, as users have to make decisions about what headers to click on.
 *
 * ### Guidance
 *
 * - Allow users to click anywhere in the header area to expand or collapse the content; a larger target is easier to manipulate.
 * - Make sure interactive elements within the collapsible region are far enough from the headers that users don’t accidentally trigger a collapse. (The exact distance depends on the device.
 */

/**
 * @componentName Accordion
 * @accordionItemToggled This event is fired when an accordion item is opened or closed
 * @maturityCategory use
 * @maturityLevel best_practice
 * @guidanceHref accordion
 * @translations English
 * @translations Spanish
 * @translations Tagalog
 */
@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.scss',
  shadow: true,
})
export class VaAccordion {
  @Element() el!: any;
  accordionContainer: HTMLDivElement;
  expandCollapseBtn!: HTMLVaButtonIconElement | HTMLButtonElement;

  @State() expanded = false;
  @State() collapsed = true;

  /**
   * If true, the `sectionHeading` value will be included in the aria-label for
   * the "Expand/Collapse All" buttons, providing additional context for screen
   * reader users. This is particularly important when there are multiple
   * accordion groups on a single page. Requires a value for `sectionHeading` to
   * be provided.
   */
  @Prop() includeSectionHeadingInExpandCollapseAllAriaLabels?: boolean = false;

  /**
   * True if only a single item can be opened at once
   */
  @Prop() openSingle?: boolean = false;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Optional accordion section heading text. Emitted in analytics event and
   * optionally included in the aria-label for the "Expand/Collapse All" buttons
   * if `includeSectionHeadingInExpandCollapseAllAriaLabels` is true. Default is
   * null.
   */
  @Prop() sectionHeading?: string = null;

  /**
   * The event used to track usage of the component. This is emitted when an
   * accordion item is toggled and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * The event will fire when the Expand/Collapse All button is clicked. It will
   * emit the status of the accordion items as either "allOpen" or "allClosed".
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  accordionExpandCollapseAll: EventEmitter;

  @Listen('accordionItemToggled')
  itemToggledHandler(event: CustomEvent) {
    // eslint-disable-next-line i18next/no-literal-string
    const clickedItem = (event.target as HTMLElement).closest(
      'va-accordion-item',
    );

    if(this.el !== clickedItem.parentElement) {
      // ignore if this item is not a direct child of this va-accordion
      // this is to prevent issues with nested accordions
      return;
    }

    // Usage for slot to provide context to analytics for header and level
    const header = clickedItem.querySelector('[slot="headline"]');
    // using the slot to provide context to analytics for header and level
    let headerText;
    let headerLevel;
    if (header) {
      headerText = header?.innerHTML;
      headerLevel = parseInt(header?.tagName?.toLowerCase().split('')[1]);
    } else {
      // using the props to provide context to analytics for header and level
      headerText = clickedItem.header;
      headerLevel = clickedItem.level;
    }

    if (this.openSingle) {
      getSlottedNodes(this.el, 'va-accordion-item')
        .filter(item => item !== clickedItem)
        /* eslint-disable-next-line i18next/no-literal-string */
        .forEach(item => (item as Element).setAttribute('open', 'false'));
    }

    // setAttribute to "true" will only add the attribute name to the DOM, so we need to use "hasAttribute"
    const prevAttr = clickedItem.getAttribute('open') === 'false' ? false : clickedItem.hasAttribute('open');

    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-accordion',
        action: prevAttr ? 'collapse' : 'expand',
        details: {
          header: headerText || clickedItem.header,
          subheader: clickedItem.subheader,
          level: headerLevel || clickedItem.level,
          sectionHeading: this.sectionHeading,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }

    /* eslint-disable-next-line i18next/no-literal-string */
    clickedItem.setAttribute('open', !prevAttr ? 'true' : 'false');

    if (!this.isScrolledIntoView(clickedItem)) {
      clickedItem.scrollIntoView();
    }

    // Check if all accordions are open or closed due to user clicks
    this.accordionsOpened();
  }

  /**
   * Handles the accordion open state
   * @param method "some" or "every"; array methods to check if all or some of the accordion items are open
   */
  private accordionsOpened(method = 'every') {
    // Track user clicks on va-accordion-item within an array to compare if all values are true or false
    const accordionItems = [...this.el.children]
      .filter(el => el.tagName.toLowerCase() === 'va-accordion-item')
      .map(el => el.open);

    const allOpen = currentValue => currentValue === true;
    const allClosed = currentValue => currentValue === false;

    if (accordionItems[method](allOpen)) {
      return (this.expanded = true);
    }

    if (accordionItems[method](allClosed)) {
      return (
        this.expanded = false,
        this.collapsed = true
      );
    }

    return (
      this.expanded = false,
      this.collapsed = false
    );
  }

  // Expand or Collapse All Function for Button Click
  private expandCollapseAll = (expanded: boolean) => {
    this.expanded = expanded;
    this.collapsed = !expanded;

    const value = expanded ? 'allOpen' : 'allClosed';
    this.accordionExpandCollapseAll.emit({ status: value });

    getSlottedNodes(this.el, 'va-accordion-item').forEach(
      (item: HTMLElement) => {
        item.setAttribute('open', `${expanded}`);
      },
    );
  };

  isScrolledIntoView(el: Element) {
    const elemTop = el?.getBoundingClientRect().top;

    if (!elemTop && elemTop !== 0) {
      return false;
    }

    // Only partially || completely visible elements return true
    return elemTop >= 0 && elemTop <= window.innerHeight;
  }

  /**
   * Gets the aria-label for the "Expand all" and "Collapse all" buttons via dynamic keys for i18next translation, with optional section heading interpolation.
   * @param {boolean} isExpandBtn - If the aria-label being generated is for the "Expand all" button or not.
   * @returns {string}
   */
  private getExpandOrCollapseBtnAriaLabel(isExpandBtn: boolean): string {
    // Return default label if sectionHeading is not provided or prop flag to
    // include it in aria-label are not truthy.
    if (
      !this.includeSectionHeadingInExpandCollapseAllAriaLabels ||
      !this.sectionHeading
    ) {
      return i18next.t(isExpandBtn ? 'expand-all-aria-label' : 'collapse-all-aria-label');
    }

    return i18next.t(isExpandBtn ?
      'expand-all-aria-label-section-heading' :
      'collapse-all-aria-label-section-heading',
      { sectionHeading: this.sectionHeading }
    );
  }

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  // if one or more accordion-items are open on load, then we should put component in state to "Collapse all"
  componentWillLoad() {
    this.accordionsOpened('some');
    this.expanded = false;
    this.collapsed = false;

    // Validate value includeSectionHeadingInExpandCollapseAllAriaLabels prop -
    // sectionHeading value must be provided, if not set to false.
    if (
      this.includeSectionHeadingInExpandCollapseAllAriaLabels &&
      !this.sectionHeading
    ) {
      this.includeSectionHeadingInExpandCollapseAllAriaLabels = false;
    }
  }

  render() {
    const { openSingle } = this;
    const isInsideSearchFilter = this.el.classList.contains('va-search-filter__accordion')

    const accordionClass = classNames({
      'usa-accordion': true,
    });

    return (
      <Host>
        <div
          class={accordionClass}
          ref={accordionContainer =>
            (this.accordionContainer = accordionContainer)
          }
        >
          {(!openSingle && !isInsideSearchFilter) ? (
            <ul class="expand-collapse-list">
              <li>
                <va-button-icon
                  class="va-accordion__button"
                  data-testid="expand-all-accordions"
                  ref={el => (this.expandCollapseBtn = el as HTMLVaButtonIconElement)}
                  onClick={() => this.expandCollapseAll(true)}
                  label={this.getExpandOrCollapseBtnAriaLabel(true)}
                  buttonType="expand"
                ></va-button-icon>
              </li>
              <li>
                <va-button-icon
                  class="va-accordion__button"
                  data-testid="collapse-all-accordions"
                  ref={el => (this.expandCollapseBtn = el as HTMLVaButtonIconElement)}
                  onClick={() => this.expandCollapseAll(false)}
                  label={this.getExpandOrCollapseBtnAriaLabel(false)}
                  buttonType="collapse"
                ></va-button-icon>
              </li>
            </ul>
          ) : null}
          <slot></slot>
        </div>
      </Host>
    );
  }
}
