import { Component, h, Prop, Element, State } from '@stencil/core';
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

  @State() hasSubmenu = false;

  @State() isOpen = false;

  componentDidLoad() {
    // when the slot content is available, check if it has a 
    // va-sidenav-submenu element and set the hasSubmenu state
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (slot) {
      const slotContent = slot.assignedNodes();
      const hasSubmenu = slotContent.some(node => 
        node.nodeType === Node.ELEMENT_NODE && 
        (node as Element).tagName === 'VA-SIDENAV-SUBMENU'
      );
      if (hasSubmenu) {
        this.hasSubmenu = true;
      }
    }
  }

  render() {
    const anchorClasses = classNames({
      'va-sidenav__current': this.isCurrentPage,
    });
    
    return (
      <li class="va-sidenav__item" role="presentation">
        <a role="menuitem" class={anchorClasses} href={this.href}>{this.label}
          {this.hasSubmenu && (
            this.isOpen ? <va-icon icon="expand_less"></va-icon> : <va-icon icon="expand_more"></va-icon>
          )}
        </a>
        <slot></slot>
      </li>
    );
  }
}
