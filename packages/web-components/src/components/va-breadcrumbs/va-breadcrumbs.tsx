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
   *  Represents a list of breadcrumbs. Use an array of objects with label and href properties, and then use JSON.stringify() to convert to a string. This prop is available when uswds is set to true.
   */
  // @Prop() breadcrumbList?: any;
  /**
   * 
   * Represents an internal state of the component which stores the list of breadcrumbs parsed from the 'breadcrumbList' prop. 
   * Each breadcrumb is represented as an object with two properties: 'label' and 'href'.
   */
  @State() formattedBreadcrumbs?: Array<{ label: string; href: string }> = [];
  /**
   * 
   * This is a method that watches for changes in the 'breadcrumbList' prop. 
   * When the 'breadcrumbList' prop changes, this method parses the new value (provided as a JSON-formatted string) 
   * into a JavaScript object and assigns it to the 'breadcrumbsState' state.
   */
  // @Watch('breadcrumbList')
  // watchBreadcrumbListHandler(breadcrumbList) {
  //   if (!this.breadcrumbList?.length) return;
  //   this.updateBreadCrumbList(breadcrumbList);
  // }
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

  // private updateBreadCrumbList(breadcrumbList: Array<{ label: string; href: string }> | string) {
  //   this.formattedBreadcrumbs = typeof breadcrumbList === 'string' ? JSON.parse(breadcrumbList) : breadcrumbList;
  // }

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
    
    this.uswds ? li.classList.add('usa-breadcrumb__list-item')  : li.classList.add('va-breadcrumbs-li');
    if (!this.uswds && index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      node.setAttribute('aria-current', 'page');
    }
    node.parentNode.replaceChild(li, node);
    li.appendChild(node);
  }

  private handleListNode(node: HTMLSlotElement, index: number, slotNodes: Node[]) {
    this.uswds ? node.classList.add('usa-breadcrumb__list-item') : node.classList.add('va-breadcrumbs-li');
    const anchor = node.querySelector('a');
    if (!this.uswds && anchor && index === slotNodes.length - 1) {
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

  componentWillLoad() {
    if (this.uswds) {
      // 
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

    console.log(slotNodes)

    slotNodes.forEach((node: HTMLSlotElement, index: number) => {
      // We are only handling li nodes during slot change because it is 
      // expected that the dynamic state usage of this component will 
      // only be adding new breadcrumbs items in the format of 
      // <li><a href="...">...</a></li>.
      if (node.nodeName === 'LI') {
        if (this.uswds) {
          // Adding class to the list tag
          node.classList.add('usa-breadcrumb__list-item');

          // Select the anchor in the current node
          const anchor = node.querySelector('a');

          // Create a span and set its text content to be the same as the anchor's
          const span = document.createElement('span');
          if (anchor) {
            span.textContent = anchor.textContent;
  
            // Clear the anchor's HTML and append the newly created span to it
            anchor.innerHTML = '';
            anchor.appendChild(span);
          }

          if (index === slotNodes.length - 1) {
            // If this is the last element in the list, add the 'usa-current' class
            // Replace the anchor with a span, and set the 'aria-current' attribute
            node.classList.add('usa-current');
            node.replaceChild(span, anchor);
            /* eslint-disable-next-line i18next/no-literal-string */
            node?.setAttribute('aria-current', 'page');
          } else if (index === slotNodes.length - 2) {
            let span = node.querySelector('span');

            // Create a new anchor and append the span to it
            const newAnchor = document.createElement('a');
            newAnchor.appendChild(span);

            if (!anchor) {
              // If there wasn't an existing anchor, append the new anchor to the node
              node.appendChild(newAnchor);
            } else {
              // If there was an existing anchor, replace it with the new one
              node.replaceChild(newAnchor, anchor);
            }

            // If this is the second last element, do whatever needs to be done here
            node.classList.remove('usa-current');
            node.removeAttribute('aria-current');
          }
        } else {
          node.classList.add('va-breadcrumbs-li');
          const anchor = node.querySelector('a');
          const isAriaCurrent = anchor?.getAttribute('aria-current');
  
          if (isAriaCurrent && index !== slotNodes.length - 1) {
            anchor.removeAttribute('aria-current');
          }
          
          if (index === slotNodes.length - 1) {
            /* eslint-disable-next-line i18next/no-literal-string */
            anchor?.setAttribute('aria-current', 'page');
          }
  
        }
      }
    });
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
            <ol role="list" onClick={e => this.fireAnalyticsEvent(e)} class="usa-breadcrumb__list">
              <slot onSlotchange={this.handleSlotChange.bind(this)}></slot>
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
