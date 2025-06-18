import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'va-sidenav-submenu',
  styleUrl: 'va-sidenav-submenu.scss',
  shadow: true,
})
export class VaSidenavMenu {
  @Element() el!: HTMLElement;

  handleSubmenuClasses() {
    // Add submenu class to all slotted va-sidenav-item elements
    const items = this.el.querySelectorAll('va-sidenav-item');
    // check if the parent element is va-sidenav-submenu
    const parentSubmenu = this.el.closest('va-sidenav-submenu');
    // check if the parentSubmenu parent is va-sidenav-item
    const parentItem = parentSubmenu?.closest('va-sidenav-item');
    // add the the parentItem the class va-sidenav__parent-submenu-item
    parentItem?.classList.add('va-sidenav__parent-submenu-item');

    items.forEach(item => {
      item.classList.add('va-sidenav__submenu-item');
    });
  }

  componentDidLoad() {
    this.handleSubmenuClasses();
  }

  render() {
    return (
      <ul class="va-sidenav__submenu">
        <slot></slot>
      </ul>
    );
  }
}
