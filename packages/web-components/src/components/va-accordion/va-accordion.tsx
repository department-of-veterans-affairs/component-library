import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  h,
  forceUpdate,
} from '@stencil/core';
import classnames from 'classnames';
import { getSlottedNodes } from '../../utils/utils';
import i18next from 'i18next';
import { Build } from '@stencil/core';
// @ts-ignore
import { accordion } from '@uswds/uswds/js';

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
 * @accordionItemToggled This event is fired when an accordion item is opened or closed
 */
@Component({
  tag: 'va-accordion',
  styleUrl: 'va-accordion.scss',
  shadow: true,
})
export class VaAccordion {
  @Element() el!: any;
  expandCollapseBtn!: HTMLButtonElement;

  @State() expanded = false;

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
   * Whether or not the accordion items will have borders
   */
  @Prop() bordered?: boolean = false;

  /**
   * True if only a single item can be opened at once
   */
  @Prop() openSingle?: boolean = false;

  /**
   * If `true`, doesn't fire the CustomEvent which can be used for analytics tracking.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Optional accordion section heading text. Only used in analytics event. Default is null.
   */
  @Prop() sectionHeading?: string = null;

  // Expand or Collapse All Function for Button Click
  private expandCollapseAll = (expanded: boolean) => {
    this.expanded = expanded;
    getSlottedNodes(this.el, 'va-accordion-item').forEach(item => {
      const itemButton = (item as Element).firstElementChild.firstElementChild;
      accordion.toggle(itemButton, expanded)
    });
  };

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });

    // Follow the USWDS3 pattern
    accordion.on(this.el.shadowRoot);
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  render() {
    const accordionProps = {
      class: classnames('usa-accordion', { 'usa-accordion--bordered': this.bordered }),
      'data-allow-multiple': this.openSingle ? undefined : true
    };
    return (
      <Host {...accordionProps} >
        {!this.openSingle && (
          <button
            ref={el => (this.expandCollapseBtn = el as HTMLButtonElement)}
            onClick={() => this.expandCollapseAll(!this.expanded)}
            aria-label={
              this.expanded
                ? i18next.t('collapse-all-aria-label')
                : i18next.t('expand-all-aria-label')
            }
          >
            {this.expanded
              ? `${i18next.t('collapse-all')} -`
              : `${i18next.t('expand-all')} +`}
          </button>
        )}
        <slot />
      </Host>
    );
  }
}
