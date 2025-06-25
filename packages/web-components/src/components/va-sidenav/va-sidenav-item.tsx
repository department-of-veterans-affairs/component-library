import { Component, h, Prop, Element, Event, EventEmitter } from '@stencil/core';
import classNames from 'classnames';

@Component({
  tag: 'va-sidenav-item',
  styleUrl: 'va-sidenav-item.scss',
  shadow: true,
})
export class VaSidenavItem {
  @Element() el!: HTMLElement;

  /**
   * The href for the sidenav item
   */
  @Prop() href?: string;

  /**
   * The label for the sidenav item
   */
  @Prop() label?: string;

  /**
   * If the sidenav item is the current page
   */
  @Prop() currentPage?: boolean;

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
      <div class="va-sidenav__item" aria-current={this.currentPage ? 'page' : undefined}>
        <a class={anchorClasses} href={href} onClick={this.handleClick.bind(this)}>{this.label}</a>
        <slot></slot>
      </div>
    );
  }
}
