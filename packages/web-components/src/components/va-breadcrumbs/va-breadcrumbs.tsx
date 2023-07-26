import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
} from '@stencil/core';

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
   * Analytics tracking function(s) will not be called
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * USWDS variation
   */
  @Prop() uswds?: boolean = false;

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

  private getClickLevel(target: HTMLAnchorElement) {
    const anchorNodes = Array.from(this.el.querySelectorAll('a'));
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
            totalLevels: this.el.querySelectorAll('a').length,
          },
        };
        this.componentLibraryAnalytics.emit(details);
      }
    }
  }

  private handleAnchorNode(node: HTMLSlotElement, index: number, slotNodes: Node[]) {
    const li = document.createElement('li');
    this.uswds ? li.classList.add('usa-breadcrumb__list-item') : li.classList.add('va-breadcrumbs-li');
    if (index === slotNodes.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      node.setAttribute('aria-current', 'page');
    }
    node.parentNode.replaceChild(li, node);
    li.appendChild(node);
  }

  private handleListNode(node: HTMLSlotElement, index: number, slotNodes: Node[]) {
    this.uswds ? node.classList.add('usa-breadcrumb__list-item') : node.classList.add('va-breadcrumbs-li');
    const anchor = node.querySelector('a');
    this.uswds ? anchor.classList.add('usa-breadcrumb__link') : anchor.classList.add('va-breadcrumbs-link');
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
        this.uswds ? node.classList.add('usa-breadcrumb__list-item') : node.classList.add('va-breadcrumbs-li');
        const anchor = node.querySelector('a');
        this.uswds ? anchor.classList.add('usa-breadcrumb__link') : anchor.classList.add('va-breadcrumbs-link');
        const isAriaCurrent = anchor?.getAttribute('aria-current');

        if (isAriaCurrent && index !== slotNodes.length - 1) {
          anchor.removeAttribute('aria-current');
        }

        if (index === slotNodes.length - 1) {
          /* eslint-disable-next-line i18next/no-literal-string */
          anchor?.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  render() {
    const { label, uswds } = this;

    if (uswds) {
      return (
        <Host>
          <nav class="usa-breadcrumb" aria-label={label}>
            <ol class="usa-breadcrumb__list" role="list" onClick={e => this.fireAnalyticsEvent(e)}>
              <slot onSlotchange={this.handleSlotChange.bind(this)}></slot>
            </ol>
          </nav>
        </Host>
      );
    }

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
