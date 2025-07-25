import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  State
} from '@stencil/core';
import { deepEquals } from '../../utils/utils';
import classnames from 'classnames';

export type Breadcrumb = {
  label: string;
  href: string;
  isRouterLink?: boolean;
  lang?: string;
};

/**
 * @componentName Breadcrumbs
 * @maturityCategory use
 * @maturityLevel deployed
 */
@Component({
  tag: 'va-breadcrumbs',
  styleUrl: 'va-breadcrumbs.scss',
  shadow: true,
})
export class VaBreadcrumbs {
  @Element() el: HTMLElement;

  /**
   * Adds an aria-label attribute to the <nav /> element.
   */
  @Prop() label?: string = 'Breadcrumb';
  /**
   *  Whether or not the component will wrap the breadcrumbs.
   */
  @Prop() wrapping?: boolean = false;
  /**
   *  Represents a list of breadcrumbs. Use a JSON array of objects with label and href properties, then wrap in a string if using non-React-binding version. See Storybook examples for React-binding version. For pure web components, here's an example link: ``[{"href": "/link1", "label": "Link 1"}]`.
   */
  @Prop() breadcrumbList?: Breadcrumb[] | string;

  /**
   *  When true, the first breadcrumb label will be "VA.gov home".
   */
  @Prop() homeVeteransAffairs?: boolean = true;

  /**
   * When true, the current page link will use the last href value provided in the breadcrumb list instead of the #content hash.
   */
  @Prop() currentPageRedirect?: boolean = false;

  /**
   *
   * Represents an internal state of the component which stores the list of breadcrumbs parsed from the 'breadcrumbList' prop.
   * Each breadcrumb is represented as an object with at least two properties: 'label' and 'href'.
   */
  @State() formattedBreadcrumbs?: Breadcrumb[] = [];
  
  /**
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * The event used to track usage of the component. This is emitted when a
   * breadcrumb anchor is clicked and disableAnalytics is not true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Fires when user clicks on breadcrumb anchor tag.
   * Has no effect unless the href of anchor tag is part of
   * breadcrumb object that also has isRouterLink: true
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  routeChange: EventEmitter<{ href: string }>;

  /**
   * This method is used to update the formattedBreadcrumbs state.
   * It either parses a JSON string into an array of breadcrumb objects or uses the passed array as is.
   *
   * @param breadcrumbList - An array of breadcrumb objects or a stringified version of it.
   * @private
   */
  private updateBreadCrumbList(breadcrumbList: Breadcrumb[]) {
    // Clone the array and its objects to avoid mutating the original prop value
    const clonedBreadcrumbs = breadcrumbList.map(bc => ({ ...bc }));
    const firstBreadcrumb = clonedBreadcrumbs[0];
    if (firstBreadcrumb && this.homeVeteransAffairs) {
      firstBreadcrumb.label = 'VA.gov home';
    }
    // Only update state if the value actually changed to avoid infinite loops
    const isEqual = deepEquals(this.formattedBreadcrumbs, clonedBreadcrumbs);
    if (!isEqual) {
      this.formattedBreadcrumbs = clonedBreadcrumbs;
    }
  }

  private getClickLevel(target: HTMLAnchorElement) {
    const anchorNodes = Array.from(this.el.shadowRoot.querySelectorAll('a'));
    const index = anchorNodes.findIndex((node: HTMLAnchorElement) =>
      node.isEqualNode(target),
    );
    return index + 1;
  }

  private fireAnalyticsEvent(event: MouseEvent): void {
    if (!this.disableAnalytics) {
      const target = event.target as HTMLAnchorElement;
      // If it's a link being clicked, dispatch an analytics event
      if (target?.tagName === 'A') {
        const details = {
          componentName: 'va-breadcrumbs',
          action: 'linkClick',
          details: {
            clickLabel: target.innerText.trim(),
            clickLevel: this.getClickLevel(target),
            totalLevels:  this.el.shadowRoot.querySelectorAll('a').length + 1
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  private handleAnchorNode(
    node: HTMLSlotElement,
    index: number,
    slotNodes: Node[],
  ) {
    const li = document.createElement('li');
    li.classList.add('va-breadcrumbs-li');
    if (index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      node.setAttribute('aria-current', 'page');
    }
    node.parentNode.replaceChild(li, node);
    li.appendChild(node);
  }

  private handleListNode(
    node: HTMLSlotElement,
    index: number,
    slotNodes: Node[],
  ) {
    node.classList.add('va-breadcrumbs-li');
    const anchor = node.querySelector('a');
    if (anchor && index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      anchor.setAttribute('aria-current', 'page');
    }
  }

  private validateBreadcrumbs(breadcrumbList: Breadcrumb[] | string) {
    let potentialBreadcrumbs: Breadcrumb[];

    if (Array.isArray(breadcrumbList)) {
      potentialBreadcrumbs = breadcrumbList;
    } else if (typeof breadcrumbList === 'string') {
      try {
        potentialBreadcrumbs = JSON.parse(breadcrumbList);
      } catch (e) {
        return false;
      }
    } else return false;

    // Now validate that potentialBreadcrumbs is an array of objects with the properties "label" and "href"
    // eslint-disable-next-line i18next/no-literal-string
    if (
      Array.isArray(potentialBreadcrumbs) &&
      potentialBreadcrumbs.every(
        item =>
          typeof item === 'object' &&
          item.hasOwnProperty('label') &&
          item.hasOwnProperty('href'),
      )
    ) {
      return potentialBreadcrumbs;
    } else {
      return false;
    }
  }

  /**
   * This method is invoked once before the component is first rendered and on component update.
   * Its main purpose is to validate and format the breadcrumbList prop, if present.
   */
  private validateAndFormatBreadcrumbs() {
    if (!this.breadcrumbList?.length) return;

    let potentialBreadcrumbs = this.validateBreadcrumbs(this.breadcrumbList);

    if (potentialBreadcrumbs) {
      this.updateBreadCrumbList(potentialBreadcrumbs);
    } else return;

  }

  componentDidLoad() {
    // We are getting the slot nodes so that we can handle either receiving an
    // anchor tag or a list item with an anchor tag.
    const slotNodes = (
      this.el.shadowRoot.querySelector('slot') as HTMLSlotElement
    )?.assignedNodes();
    if (!slotNodes) return;

    // This handles two different slot node scenarios:
    // 1. <li><a href="...">...</a></li>
    // 2. <a href="...">...</a>
    slotNodes.forEach((node: HTMLSlotElement, index: number) => {
      if (node.nodeName === 'LI') {
        this.handleListNode(node, index, slotNodes);
      } else if (node.nodeName === 'A') {
        this.handleAnchorNode(node, index, slotNodes);
      }
    });
  }

  
  componentWillLoad() {
    this.validateAndFormatBreadcrumbs();
  }

  componentDidUpdate() {
    this.validateAndFormatBreadcrumbs();
  }

  /**
   * This handles the use case of the component dynamically receiving
   * new breadcrumb items. It will programmatically toggle the
   * aria-current attribute on the last anchor tag and add the
   * va-breadcrumbs-li class to the list item.
   */
  handleSlotChange() {
    // Get all of the slot nodes and filter out only the list items.
    const slotNodes = (
      this.el.shadowRoot.querySelector('slot') as HTMLSlotElement
    )
      ?.assignedNodes()
      .filter((node: HTMLSlotElement) => node.nodeName === 'LI');

    if (!slotNodes) return;

    slotNodes.forEach((node: HTMLSlotElement, index: number) => {
      // We are only handling li nodes during slot change because it is
      // expected that the dynamic state usage of this component will
      // only be adding new breadcrumbs items in the format of
      // <li><a href="...">...</a></li>.
      if (node.nodeName === 'LI') {
        node.classList.add('usa-breadcrumb__list-item');
        const anchor = node.querySelector('a');

        if (index === 0 && anchor && this.homeVeteransAffairs) {
          anchor.innerText = 'VA.gov home';
        }

        const isAriaCurrent = anchor?.getAttribute('aria-current');

        if (isAriaCurrent && index !== slotNodes.length - 1) {
          anchor.removeAttribute('aria-current');
        }

        const span = document.createElement('span');
        span.textContent = anchor.textContent;
        anchor.innerHTML = '';
        anchor.appendChild(span);

        if (index === slotNodes.length - 1) {
          const span = document.createElement('span');
          span.textContent = anchor.textContent;
          node.classList.add('usa-current');
          node.replaceChild(span, anchor);
          /* eslint-disable-next-line i18next/no-literal-string */
          node?.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  /**
   * Emit event with payload equal to href of the link clinked
   * Only fires if link is part of breadcrumb object that also has isLinkRouter = true property
   */
  handleRouteChange(e: MouseEvent, href: string): void {
    e.preventDefault();
    this.routeChange.emit({ href });
  }

  /**
   * Handle click event on breadcrumb
   */
  handleClick(
    e: MouseEvent,
    breadcrumb: { href: string; isRouterLink?: boolean },
  ): void {
    const { href, isRouterLink } = breadcrumb;
    if (isRouterLink) {
      this.handleRouteChange(e, href);
    }
    this.fireAnalyticsEvent(e);
  }

  render() {
    const { label, wrapping } = this;
    const wrapClass = classnames({
      'usa-breadcrumb': true,
      'usa-breadcrumb--wrap': wrapping,
    });

    return (
      <Host>
        <nav aria-label={label} class={wrapClass}>
          <ol role="list" class="usa-breadcrumb__list">
            {this.formattedBreadcrumbs.map((item, index) => (
              <li
                class={`usa-breadcrumb__list-item ${
                  index === this.formattedBreadcrumbs.length - 1
                    ? 'usa-current'
                    : ''
                }`}
                aria-current={
                  index === this.formattedBreadcrumbs.length - 1
                    ? 'page'
                    : undefined
                }
              >
                {(!this.currentPageRedirect && index === this.formattedBreadcrumbs.length - 1) ? (
                  <a
                    class="usa-breadcrumb__link"
                    href="#content"
                    onClick={e => this.fireAnalyticsEvent(e)}
                    lang={item.lang || 'en-US'}
                    hreflang={item.lang || 'en-US'}
                  >
                    <span>{item.label}</span>
                  </a>
                ) : (
                  <a
                    class="usa-breadcrumb__link"
                    href={item.href}
                    onClick={e => this.handleClick(e, item)}
                    lang={item.lang || 'en-US'}
                    hreflang={item.lang || 'en-US'}
                  >
                    <span>{item.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Host>
    );
  }
}
