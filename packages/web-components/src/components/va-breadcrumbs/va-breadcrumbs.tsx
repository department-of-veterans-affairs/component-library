import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
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
  shadow: false,
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
   *  Whether or not the component will wrap the breadcrumbs. This prop is available when `uswds` is set to `true`.
   */
  @Prop() wrapping?: boolean = false;
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
    event.preventDefault();
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

  private handleAnchorNode(node, index: number, listItems) {
    const li = document.createElement('li');
    li.classList.add('va-breadcrumbs-li');
    if (index === listItems.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      node.setAttribute('aria-current', 'page');
    }
    node.parentNode.replaceChild(li, node);
    li.appendChild(node);
  }

  private handleListNode(node, index: number, listItems) {
    node.classList.add('va-breadcrumbs-li');
    const anchor = node.querySelector('a');
    if (anchor && index === listItems.length - 1) {
      /* eslint-disable-next-line i18next/no-literal-string */
      anchor.setAttribute('aria-current', 'page');
    }
  }

  /**
   * This method takes an anchor element as an argument, creates a new span element,
   * and moves the contents of the anchor into the span. This is useful for adhering to 
   * the USWDS breadcrumb format, which expects anchor text to be wrapped in a span.
   * @param {HTMLElement} anchor - The anchor element to be modified
   */
  private wrapAnchorText(anchor) {
    const spanElement = document.createElement('span');
    spanElement.innerHTML = anchor.innerHTML;
    anchor.innerHTML = '';
    anchor.appendChild(spanElement);
  }

  /**
   * This method takes an array of anchor elements and for each one, it creates a new 
   * list item, clones the anchor, and appends the cloned anchor to the list item. The 
   * original anchor is then replaced in the DOM with the new list item. This is useful 
   * for transforming a list of anchor elements into a list of list items with anchor children.
   * @param {Array<HTMLElement>} anchorItems - The anchor elements to be transformed
   */
  private wrapAnchorsInList(anchorItems) {
    anchorItems.forEach((anchor) => {
        const listItem = document.createElement('li');
        listItem.appendChild(anchor.cloneNode(true)); // clone the anchor to avoid modifying original anchor
        anchor.parentNode.replaceChild(listItem, anchor);
    });
  }

  private observer: MutationObserver;

  disconnectedCallback() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  componentDidLoad() {
      // Watch for changes to list items.
      const breadcrumbList = this.el.querySelector('.usa-breadcrumb__list');
      const callback = mutationList => {
        for (const mutation of mutationList) {
          if (mutation.type === 'childList') {
            const listItems = this.el.querySelectorAll('li');
            listItems.forEach((item) => {
              if (this.uswds) {
                item.classList.add('usa-breadcrumb__list-item');
              } else {
                // handle v1?
              }  
            });
          }
        }
      };
      this.observer = new MutationObserver(callback);
      this.observer.observe(breadcrumbList, {
        childList: true,
        subtree: true,
      });
    if (this.uswds) {
      const listItems = Array.from(this.el.querySelectorAll('li'));
      const anchorItems = Array.from(this.el.querySelectorAll('a'));
  
      // Check if we have list items, if not wrap anchorItems into list items
      if(listItems.length === 0 && anchorItems.length > 0) {
        this.wrapAnchorsInList(anchorItems);
      }
  
      const updatedListItems = Array.from(this.el.querySelectorAll('li'));
      const updatedAnchorItems = Array.from(this.el.querySelectorAll('a'));

      updatedListItems.forEach((item, i) => {
        item.classList.add('usa-breadcrumb__list-item');
        if (updatedListItems.length - 1 === i) {
          item.classList.add('usa-current');
          // eslint-disable-next-line i18next/no-literal-string
          item.setAttribute('aria-current', 'page');

          // Find the anchor child and replace it with a span
          const anchor = item.querySelector('a');
          if (anchor) {
            const span = document.createElement('span');
            span.innerHTML = anchor.innerHTML;
            item.replaceChild(span, anchor);
          }
        }
      });

      updatedAnchorItems.forEach((item) => {
        item.classList.add('usa-breadcrumb__link');
        this.wrapAnchorText(item);
      });
    } else {
      // We are getting the slot nodes so that we can handle either receiving an 
      // anchor tag or a list item with an anchor tag.
      const listItems = this.el.querySelectorAll('li');
      const anchorItems = this.el.querySelectorAll('a');
      
      if (listItems.length > 0) {
        // Scenario: <li><a href="...">...</a></li>
        listItems.forEach((item, index) => {
          if (item.nodeName === 'LI') { 
              this.handleListNode(item, index, listItems);
          }
        });
      } else if (anchorItems.length > 0) {
        // Scenario: <a href="...">...</a>
        anchorItems.forEach((item, index) => {
          if (item.nodeName === 'A') {
            this.handleAnchorNode(item, index, anchorItems);
          }
        });
      }
    }
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
          <nav class={wrapClass} aria-label={label}>
            <ol class="usa-breadcrumb__list" role="list" onClick={e => this.fireAnalyticsEvent(e)}>
              <slot name="list"></slot>
            </ol>
          </nav>
        </Host>
      );
    } else {
      return (
        <Host>
          <nav aria-label={label}>
            <ul role="list" onClick={e => this.fireAnalyticsEvent(e)}>
              <slot></slot>
            </ul>
          </nav>
        </Host>
      );
    }
  }
}
