import { Component, h, Element, Prop, State, Listen, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'va-sidenav-submenu',
  styleUrl: 'va-sidenav-submenu.scss',
  shadow: true,
})
export class VaSidenavMenu {
  @Element() el!: HTMLElement;

  /**
   * The label for the submenu
   */
  @Prop() label!: string;

  /**
   * When present, the category name will be a link. If it is also the `current-page`, this will be set to `#content`.
   */
  @Prop() href?: string;

  /**
   * Identifies when the item is the current page. The current page link have the `#content` hash on the `href`.
   */
  @Prop() currentPage?: boolean;

  /**
   * When set, native link routing behavior will be disabled with `preventDefault` and the `vaRouteChange` event will fire.
   */
  @Prop() routerLink?: boolean;

  /**
   * Fires when a sidenav anchor link is clicked. This can be leveraged when using a SPA routing library like React Router. 
   * The `href` and `router-link` props must be set.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  vaRouteChange: EventEmitter<{ href: string }>;

  /**
   * Tracks if any child item is the current page so that the submenu can be styled accordingly
   */
  @State() hasCurrentPageItem: boolean = false;

  @State() isCurrentPage: boolean = false;

  componentWillLoad() {
    this.checkForCurrentPageItem();
  }

  /**
   * Listen for slot changes to detect when items are added or removed
   */
  @Listen('slotchange')
  onSlotChange() {
    this.checkForCurrentPageItem();
  }

  handleClick(e: MouseEvent) {
    if (this.routerLink) {
      e.preventDefault();
      this.vaRouteChange.emit({ href: this.href });
    }
  }

  /**
   * Helper method to check if an element is a va-sidenav-item with current-page set
   */
  private isCurrentPageItem(element: Element): boolean {
    return element.tagName.toLowerCase() === 'va-sidenav-item' && 
           element.hasAttribute('current-page') && 
           element.getAttribute('current-page') !== 'false';
  }

  /**
   * Check if any of the slotted va-sidenav-items have current-page set to true
   * or if the submenu parent itself has current-page set to true
   */
  private checkForCurrentPageItem() {
    // Check if this submenu itself has current-page set (only if it has an href)
    const isCurrentPage = this.href && this.currentPage;

    // Get slotted elements
    const slot = this.el.shadowRoot?.querySelector('slot');
    const slottedElements = slot?.assignedElements();

    // If there is no slot, there are no children to check
    if (!slot) {
      this.hasCurrentPageItem = false;
      this.isCurrentPage = isCurrentPage;
      return;
    }
    
    // If the submenu itself is the current page, remove current-page from children
    if (isCurrentPage) {
      this.hasCurrentPageItem = false;
      this.isCurrentPage = true;
      
      // Remove current-page attribute from any children
      slottedElements?.forEach(element => {
        if (this.isCurrentPageItem(element)) {
          element.removeAttribute('current-page');
        }
      });
      
      return;
    }
    
    // Check if any child items have current-page set
    let hasCurrentPageChild = false;
    
    // Process children, keeping only the first current-page item
    slottedElements?.forEach(element => {
      if (this.isCurrentPageItem(element)) {
        if (!hasCurrentPageChild) {
          // This is the first current page item we found
          hasCurrentPageChild = true;
        } else {
          // We already found a current page item, remove this one
          element.removeAttribute('current-page');
        }
      }
    });
    
    // Set state
    this.hasCurrentPageItem = hasCurrentPageChild;
    this.isCurrentPage = false;
  }

  render() {
    const submenuClasses = classNames({
      'va-sidenav-submenu__current': this.hasCurrentPageItem || this.isCurrentPage,
      'va-sidenav-submenu': true
    });

    const linkClasses = classNames({
      'va-sidenav-submenu__current-link': this.isCurrentPage,
      'va-sidenav-submenu__link': true
    });

    const href = this.currentPage ? '#content' : this.href;

    return (
      <nav class={submenuClasses} aria-label={`Pages related to the ${this.label} section`}>
        {this.href ? (
          <div class="va-sidenav-submenu__link-wrapper" aria-current={this.currentPage ? 'page' : undefined}>
            <a class={linkClasses} href={href} onClick={this.handleClick.bind(this)}>{this.label}</a>
          </div>
        ) : (
          <div class="va-sidenav-submenu__label">{this.label}</div>
        )}
        <slot></slot>
      </nav>
    );
  }
}
