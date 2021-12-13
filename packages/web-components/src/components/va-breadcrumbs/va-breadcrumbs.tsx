import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State,
} from '@stencil/core';
import { getSlottedNodes } from '../../utils/utils';

@Component({
  tag: 'va-breadcrumbs',
  styleUrl: 'va-breadcrumbs.css',
  shadow: true,
})
export class VaBreadcrumbs {
  @Element() el: HTMLElement;

  /**
   * Adds an aria-label attribute to the <nav /> element.
   */
  @Prop() label: string = 'Breadcrumb';

  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics: boolean;

  /**
   * Adds a custom id attribute to the UL element
   */
  @Prop() listId: string;

  /**
   * Adds CSS class `.va-nav-breadcrumbs--mobile` to the
   * NAV element. The mobile breadcrumb will always
   * be displayed while mobileFirstProp is True.
   */
  @Prop() mobileFirstProp: boolean = false;

  /**
   * Adds a custom id attribute to the NAV element
   */
  @Prop() navId: string;

  @State() breadcrumbs: Array<Node>;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  private fireAnalyticsEvent(event: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = event.target as HTMLElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const details = {
          componentName: 'va-breadcrumbs',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText.trim(),
            clickLevel: parseInt(target.dataset.index, 10) + 1,
            totalLevels: getSlottedNodes(this.el, 'a').length,
            mobileFirstProp: this.mobileFirstProp,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  componentDidLoad() {
    const nodes = getSlottedNodes(this.el, 'a');
    // This renders slot content outside of a slot.
    // This is a workaround for the limitations of styling slotted nested elements.
    // See https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot/61631668
    this.breadcrumbs = nodes.map((node: HTMLAnchorElement, index: number) => {
      return (
        <li>
          <a
            aria-current={index === nodes.length - 1 ? 'page' : undefined}
            data-index={`${index}`}
            href={node.attributes['href'].value}
          >
            {node.innerText}
          </a>
        </li>
      );
    });
  }

  render() {
    const { label, navId, listId, mobileFirstProp } = this;

    return (
      <Host>
        <nav
          aria-label={label}
          class={mobileFirstProp ? 'va-nav-breadcrumbs--mobile' : undefined}
          data-mobile-first={mobileFirstProp}
          id={navId}
        >
          <ul role="list" id={listId} onClick={e => this.fireAnalyticsEvent(e)}>
            {this.breadcrumbs}
          </ul>
        </nav>
        <slot></slot>
      </Host>
    );
  }
}
