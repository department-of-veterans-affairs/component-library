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
        <nav aria-label="Pages related to [this section] or [h2]">
          <h2 class="va-sidenav__header">
            <span class="va-sidenav__icon-background" style={{ backgroundColor: `var(--vads-color-primary)` }}>
              <va-icon icon="account_circle"></va-icon>
            </span>
            Profile
          </h2>
          <div class="va-sidenav__list">
            <slot></slot>
          </div>
        </nav>
      </Host>
    );
  }
}
