import { Component, h, Prop, Element } from '@stencil/core';
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
  @Prop() isCurrentPage?: boolean;

  render() {
    const anchorClasses = classNames({
      'va-sidenav__current': this.isCurrentPage,
    });

    const href = this.isCurrentPage ? '#content' : this.href;
    
    return (
      <div class="va-sidenav__item" aria-current={this.isCurrentPage ? 'page' : undefined}>
        <a class={anchorClasses} href={href} part="link">{this.label}</a>
        <slot></slot>
      </div>
    );
  }
}
