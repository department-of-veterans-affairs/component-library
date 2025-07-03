import { Component, h, Prop, Element, Event, EventEmitter, Host } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'va-sidenav-item',
  styleUrl: 'va-sidenav-item.scss',
  shadow: true,
})
export class VaSidenavItem {
  @Element() el!: HTMLElement;

  /**
   * The href for the sidenav item. If it is also the `current-page`, this will be set to `#content`.
   */
  @Prop() href!: string;

  /**
   * The label for the sidenav item
   */
  @Prop() label!: string;

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

  handleClick(e: MouseEvent) {
    if (this.routerLink) {
      e.preventDefault();
      this.vaRouteChange.emit({ href: this.href });
    }
  }

  render() {
    const anchorClasses = classNames({
      'va-sidenav__current': this.currentPage,
    });

    const href = this.currentPage ? '#content' : this.href;
    
    return (
      <Host>
        <a 
          class={anchorClasses} 
          href={href} 
          aria-current={this.currentPage ? 'page' : undefined}
          onClick={this.handleClick.bind(this)}>{this.label}</a>
        <slot></slot>
      </Host>
    );
  }
}
