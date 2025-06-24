import { Component, h, Element, Prop } from '@stencil/core';
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

  render() {
    const submenuClasses = classNames({
      'va-sidenav-submenu__current': false,
      'va-sidenav__submenu': true
    });

    return (
      <nav class={submenuClasses} aria-label="Pages related to [this section]">
        <div class="va-sidenav__submenu-label">{this.label}</div>
        <slot></slot>
      </nav>
    );
  }
}
