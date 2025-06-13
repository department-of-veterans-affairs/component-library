import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Side Navigation
 * @maturityCategory caution
 * @maturityLevel candidate
 */
@Component({
  tag: 'va-sidenav',
  styleUrl: 'va-sidenav.scss',
  shadow: true,
})
export class VaSidenav {
  render() {
    return (
      <Host>
        <nav aria-label="Side navigation">
          <ul class="va-sidenav" role="menu">
            <slot></slot>
          </ul>
        </nav>
      </Host>
    );
  }
}
