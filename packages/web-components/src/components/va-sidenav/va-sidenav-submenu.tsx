import { Component, h, Element, Prop } from '@stencil/core';

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

  render() {
    return (
      <nav class="va-sidenav__submenu" aria-label="Pages related to [this section]">
        <div class="va-sidenav__submenu-label">{this.label}</div>
        <slot></slot>
      </nav>
    );
  }
}
