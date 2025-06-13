import { Component, h, Element } from '@stencil/core';

@Component({
  tag: 'va-sidenav-submenu',
  styleUrl: 'va-sidenav-submenu.scss',
  shadow: true,
})
export class VaSidenavMenu {
  @Element() el!: HTMLElement;

  componentDidLoad() {
    // Add in-sublist class to all slotted va-sidenav-item elements
    const items = this.el.querySelectorAll('va-sidenav-item');
    
    // Check if this sublist is nested inside another va-sidenav-item
    const isNested = this.el.closest('va-sidenav-item')?.closest('va-sidenav-submenu') !== null;
    
    items.forEach(item => {
      item.classList.add('va-sidenav__submenu');
      
      // If this is a nested sublist, add a 'nested-sublist' class as well
      if (isNested) {
        item.classList.add('va-sidenav__nested-submenu');
      }
    });
  }

  render() {
    return (
      <ul class="va-sidenav__submenu" role="menu">
        <slot></slot>
      </ul>
    );
  }
}
