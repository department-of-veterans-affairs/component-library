import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Watch,
  State
} from '@stencil/core';
import classnames from 'classnames';

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
     * Whether or not the component will use USWDS v3 styling.
     */
  @Prop() uswds?: boolean = false;
  /**
   *  Whether or not the component will wrap the breadcrumbs. This prop is available when `uswds` is set to `true`.
   */
  @Prop() wrapping?: boolean = false;
  /**
   *  Represents a list of breadcrumbs. Use an array of objects with label and href properties, and then use JSON.stringify() to convert to a string. This prop is available when `uswds` is set to `true`.
   */
  @Prop() breadcrumbList?: any;
  /**
   * 
   * Represents an internal state of the component which stores the list of breadcrumbs parsed from the 'breadcrumbList' prop. 
   * Each breadcrumb is represented as an object with two properties: 'label' and 'href'.
   * This state is used when `uswds` is set to `true`.
   */
  @State() formattedBreadcrumbs?: Array<{ label: string; href: string }> = [];
  /**
   * 
   * This is a method that watches for changes in the 'breadcrumbList' prop. 
   * When the 'breadcrumbList' prop changes, this method parses the new value (provided as a JSON-formatted string) 
   * into a JavaScript object and assigns it to the 'breadcrumbsState' state.
   */
  @Watch('breadcrumbList')
  watchBreadcrumbListHandler(breadcrumbList) {
    if (!this.breadcrumbList?.length) return;
    this.updateBreadCrumbList(breadcrumbList);
  }
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
   * Are the hrefs provided in the objects of the breadcrumbList to be used 
   * in an app with a Router, e.g. React Router?
   * Has no effect if uswds is false
   */
  @Prop() useRouter?: boolean = false;

  /**
   * This method is used to update the formattedBreadcrumbs state.
   * It is only invoked when the uswds attribute is set to true on the component.
   * It either parses a JSON string into an array of breadcrumb objects or uses the passed array as is.
   * 
   * @param breadcrumbList - An array of breadcrumb objects or a stringified version of it.
   * @private
   */
  private updateBreadCrumbList(breadcrumbList: Array<{ label: string; href: string }> | string) {
    this.formattedBreadcrumbs = typeof breadcrumbList === 'string' ? JSON.parse(breadcrumbList) : breadcrumbList;
  }

  private getClickLevel(target: HTMLAnchorElement) {
    const anchorNodes = this.uswds ? Array.from(this.el.shadowRoot.querySelectorAll('a')) : Array.from(this.el.querySelectorAll('a'));
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
            totalLevels: this.uswds ? this.el.shadowRoot.querySelectorAll('a').length + 1 : this.el.querySelectorAll('a').length,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  private handleAnchorNode(node: HTMLSlotElement, index: number, slotNodes: Node[]) {
    const li = document.createElement('li');
      li.classList.add('va-breadcrumbs-li');
    if (index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      node.setAttribute('aria-current', 'page');
    }
    node.parentNode.replaceChild(li, node);
    li.appendChild(node);
  }

  private handleListNode(node: HTMLSlotElement, index: number, slotNodes: Node[]) {
    node.classList.add('va-breadcrumbs-li');
    const anchor = node.querySelector('a');
    if (anchor && index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      anchor.setAttribute('aria-current', 'page');
    }
  }

  componentDidLoad() {
    // We are getting the slot nodes so that we can handle either receiving an 
    // anchor tag or a list item with an anchor tag.
    const slotNodes = (this.el.shadowRoot.querySelector('slot') as HTMLSlotElement)?.assignedNodes();
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

  /**
   * This method is invoked once before the component is first rendered.
   * It is only used when the uswds attribute is set to true on the component.
   * Its main purpose is to validate and format the breadcrumbList prop, if present.
   *
   */
  componentWillLoad() {
    if (this.uswds) {
      if (!this.breadcrumbList?.length) return;
      
      let potentialBreadcrumbs;
      
      if (Array.isArray(this.breadcrumbList)) {
        potentialBreadcrumbs = this.breadcrumbList;
      } else if (typeof this.breadcrumbList === 'string') {
        try {
          potentialBreadcrumbs = JSON.parse(this.breadcrumbList);
        } catch (e) {
          return;
        }
      } else return;
      
      // Now validate that potentialBreadcrumbs is an array of objects with the properties "label" and "href"
      // eslint-disable-next-line i18next/no-literal-string
      if (Array.isArray(potentialBreadcrumbs) && potentialBreadcrumbs.every(item => typeof item === 'object' && item.hasOwnProperty('label') && item.hasOwnProperty('href'))) {
        this.formattedBreadcrumbs = potentialBreadcrumbs;
        this.updateBreadCrumbList(this.formattedBreadcrumbs);
      } else return;
    }
  }

  /**
   * This handles the use case of the component dynamically receiving
   * new breadcrumb items. It will programmatically toggle the
   * aria-current attribute on the last anchor tag and add the 
   * va-breadcrumbs-li class to the list item.
   */
  handleSlotChange() {
    // Get all of the slot nodes and filter out only the list items.
    const slotNodes = (this.el.shadowRoot.querySelector('slot') as HTMLSlotElement)
      ?.assignedNodes()
      .filter((node: HTMLSlotElement) => node.nodeName === 'LI');

    if (!slotNodes) return;

    slotNodes.forEach((node: HTMLSlotElement, index: number) => {
      // We are only handling li nodes during slot change because it is 
      // expected that the dynamic state usage of this component will 
      // only be adding new breadcrumbs items in the format of 
      // <li><a href="...">...</a></li>.
      if (node.nodeName === 'LI') {
        if (this.uswds) {
          node.classList.add('usa-breadcrumb__list-item');
        } else {
          node.classList.add('va-breadcrumbs-li');
        }
        const anchor = node.querySelector('a');
        const isAriaCurrent = anchor?.getAttribute('aria-current');

        if (isAriaCurrent && index !== slotNodes.length - 1) {
          anchor.removeAttribute('aria-current');
        }

        if(this.uswds) {
          const span = document.createElement('span');
          span.textContent = anchor.textContent;
          anchor.innerHTML = '';
          anchor.appendChild(span);
        }

        if (index === slotNodes.length - 1) {
          if (this.uswds) {
            const span = document.createElement('span');
            span.textContent = anchor.textContent;
            node.classList.add('usa-current');
            node.replaceChild(span, anchor);
            /* eslint-disable-next-line i18next/no-literal-string */
            node?.setAttribute('aria-current', 'page');
          } else {
            /* eslint-disable-next-line i18next/no-literal-string */
            anchor?.setAttribute('aria-current', 'page');
          }
        }
      }
    });
  }

  /**
   * Changes the route when uswds and useRoute props are true.
   * Route will be set to the href value in the breadcrumb.
   */
  handleRouteChange(e: MouseEvent, href: string): void {
    e.preventDefault();
    window.history.pushState(null, '', href);
    // create event to notify Router
    const popStateEvent = new PopStateEvent('popstate');
    // notify Router
    window.dispatchEvent(popStateEvent);
  }

  /**
   * Handle click event on breadcrumb when uswds is true
   */
  uswdsHandler(e: MouseEvent, href: string) {
    if (this.useRouter) {
      this.handleRouteChange(e, href);
    }
    this.fireAnalyticsEvent(e);
  }

  render() {
    const { label, uswds, wrapping } = this;
    const wrapClass = classnames({
      'usa-breadcrumb': true,
      'usa-breadcrumb--wrap': wrapping
    });

    if (uswds) {
      return (
        <Host>
          <nav aria-label={label} class={wrapClass}>
            <ol role="list" class="usa-breadcrumb__list">
              {this.formattedBreadcrumbs.map((item, index) => (
                <li
                  class={`usa-breadcrumb__list-item ${index === this.formattedBreadcrumbs.length - 1 ? 'usa-current' : ''}`}
                  aria-current={index === this.formattedBreadcrumbs.length - 1 ? "page" : undefined}>
                  {index === this.formattedBreadcrumbs.length - 1 ? (
                    <a class="usa-breadcrumb__link" href="#content" onClick={e => this.fireAnalyticsEvent(e)}>
                      <span>{item.label}</span>
                    </a>
                  ) : (
                    <a class="usa-breadcrumb__link" href={item.href} onClick={e => this.uswdsHandler(e, item.href)}>
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
    else {
      return (
        <Host>
          <nav aria-label={label}>
            <ul role="list" onClick={e => this.fireAnalyticsEvent(e)}>
              <slot onSlotchange={this.handleSlotChange.bind(this)}></slot>
            </ul>
          </nav>
        </Host>
      );
    }
  }
}
