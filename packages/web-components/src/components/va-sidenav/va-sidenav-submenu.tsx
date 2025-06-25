import { Component, h, Element, Prop, State, Listen } from '@stencil/core';
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
   * Tracks if any child item is the current page
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

  /**
   * Check if any of the slotted va-sidenav-items have current-page set to true
   */
  checkForCurrentPageItems() {
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (!slot) return;

    const slottedElements = slot.assignedElements();
    
    this.hasCurrentPageItem = slottedElements.some(element => {
      if (element.tagName.toLowerCase() === 'va-sidenav-item') {
        return element.hasAttribute('current-page') && 
               element.getAttribute('current-page') !== 'false';
      }
      return false;
    });
  }

  render() {
    const submenuClasses = classNames({
      'va-sidenav-submenu__current': this.hasCurrentPageItem,
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
