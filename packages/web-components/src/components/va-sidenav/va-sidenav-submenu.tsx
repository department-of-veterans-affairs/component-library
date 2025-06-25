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
   * When present, the category name will be a link.
   */
  @Prop() href?: string;

  /**
   * When set, native link routing behavior will be disabled with `preventDefault` and the `vaRouteChange` event will fire.
   */
  @Prop() routerLink?: boolean;

  /**
   * Fires when a sidenav anchor link is clicked. This can be leveraged when using a SPA routing library like React Router. 
   * The `href` and `isRouterLink` props must be set.
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

  componentDidLoad() {
    this.checkForCurrentPageItems();
  }

  /**
   * Listen for slot changes to detect when items are added or removed
   */
  @Listen('slotchange')
  onSlotChange() {
    this.checkForCurrentPageItems();
  }

  handleClick(e: MouseEvent) {
    if (this.routerLink) {
      e.preventDefault();
      this.vaRouteChange.emit({ href: this.href });
    }
  }

  /**
   * Check if any of the slotted va-sidenav-items have current-page set to true
   */
  private checkForCurrentPageItems() {
    // Check if this submenu itself has current-page set (only if it has an href)
    const isCurrentPage = this.href && 
                         this.el.hasAttribute('current-page') && 
                         this.el.getAttribute('current-page') !== 'false';
    
    // Check if any child items have current-page set
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (!slot) {
      this.hasCurrentPageItem = isCurrentPage;
      return;
    }

    const slottedElements = slot.assignedElements();
    
    const hasCurrentPageChild = slottedElements.some(element => {
      if (element.tagName.toLowerCase() === 'va-sidenav-item') {
        return element.hasAttribute('current-page') && 
               element.getAttribute('current-page') !== 'false';
      }
      return false;
    });
    
    // Set state if either this submenu or any child is current
    this.hasCurrentPageItem = isCurrentPage || hasCurrentPageChild;
  }

  render() {
    const submenuClasses = classNames({
      'va-sidenav-submenu__current': this.hasCurrentPageItem,
      'va-sidenav-submenu': true
    });

    const linkClasses = classNames({
      'va-sidenav-submenu__current-link': this.hasCurrentPageItem,
      'va-sidenav-submenu__link': true
    });

    return (
      <nav class={submenuClasses} aria-label={`Pages related to the ${this.label} section`}>
        {this.href ? (
          <a class={linkClasses} href={this.href} onClick={this.handleClick.bind(this)}>{this.label}</a>
        ) : (
          <div class="va-sidenav-submenu__label">{this.label}</div>
        )}
        <slot></slot>
      </nav>
    );
  }
}
