import { Component, h, Element, Prop, State, Listen, Event, EventEmitter, Host } from '@stencil/core';
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
   * Identifies when the item is the current page. The current page link will have `#content` on the `href`.
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

  // Observer for current-page changes on slotted elements
  private mutationObserver: MutationObserver;

  componentWillLoad() {
    if (this.href && this.currentPage) {
      this.isCurrentPage = true;
    }
  }

  componentDidLoad() {
    // Use setTimeout to resolve a Stencil warning about state changes in the render cycle.
    // We are using the componentDidLoad lifecycle method to ensure that the slot is fully rendered 
    // before we check for the current page item.
    setTimeout(() => {
      this.checkForCurrentPageItem();
      this.setupMutationObserver();
    }, 0);
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  /**
   * Listen for slot changes to detect when items are added or removed
   */
  @Listen('slotchange')
  onSlotChange() {
    this.checkForCurrentPageItem();

    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.setupMutationObserver();
    }
  }

  /**
   * Watch the current-page attribute for changes on slotted elements 
   * so that we can update the submenu state for displaying the submenu style.
   */
  private setupMutationObserver() {
    // Create a mutation observer to watch for attribute changes
    this.mutationObserver = new MutationObserver((mutations) => {
      // Check if any mutations affected the current-page attribute
      const shouldUpdate = mutations.some(mutation => 
        mutation.type === 'attributes' && 
        mutation.attributeName === 'current-page'
      );
      
      if (shouldUpdate) {
        this.checkForCurrentPageItem();
      }
    });

    // Watch the submenu element itself for current-page attribute changes
    this.mutationObserver.observe(this.el, {
      attributes: true,
      attributeFilter: ['current-page']
    });

    // Also watch all slotted elements
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (slot) {
      const slottedElements = slot.assignedElements();
      
      // Observe each slotted element for attribute changes
      slottedElements.forEach(element => {
        this.mutationObserver.observe(element, {
          attributes: true,
          attributeFilter: ['current-page']
        });
      });
    }
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
    if (!slot || !slottedElements || slottedElements.length === 0) {
      this.hasCurrentPageItem = false;
      this.isCurrentPage = isCurrentPage;
      return;
    }
    
    // If the submenu itself is the current page, remove current-page from children
    if (isCurrentPage) {
      this.hasCurrentPageItem = false;
      this.isCurrentPage = true;
      
      // Remove current-page attribute from any children
      slottedElements.forEach(element => {
        if (this.isCurrentPageItem(element)) {
          element.removeAttribute('current-page');
        }
      });
      
      return;
    }
    
    // Check if any child items have current-page set
    let hasCurrentPageChild = false;
    
    // Process children
    slottedElements.forEach(element => {
      if (this.isCurrentPageItem(element)) {
        hasCurrentPageChild = true;
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
      <Host role="listitem">
        <nav role="list" class={submenuClasses} aria-describedby="va-sidenav-submenu__label">
          {this.href ? (
            <a 
              role="listitem"
              class={linkClasses} 
              href={href} 
              aria-current={this.currentPage ? 'page' : undefined} 
              onClick={this.handleClick.bind(this)}>{this.label}</a>
          ) : (
            <div role="listitem" id="va-sidenav-submenu__label" class="va-sidenav-submenu__label">{this.label}</div>
          )}
          <slot></slot>
        </nav>
      </Host>
    );
  }
}
