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

  @State() hasAccordion = false;

  componentDidLoad() {
    // when the slot content is available, check if it has a 
    // va-sidenav-accordion element and set the hasAccordion state
    const slot = this.el.shadowRoot?.querySelector('slot');
    if (slot) {
      const slotContent = slot.assignedNodes();
      const hasAccordion = slotContent.some(node => 
        node.nodeType === Node.ELEMENT_NODE && 
        (node as Element).tagName === 'VA-SIDENAV-ACCORDION'
      );
      if (hasAccordion) {
        this.hasAccordion = true;
      }
    }
  }

  render() {
    const anchorClasses = classNames({
      'va-sidenav__current': this.isCurrentPage,
    });

    const href = this.isCurrentPage ? '#content' : this.href;
    
    return (
      <li class="va-sidenav__item" aria-current={this.isCurrentPage ? 'page' : undefined}>
        {!this.hasAccordion && (
          <a class={anchorClasses} href={href}>{this.label}</a>
        )}
        <slot></slot>
      </li>
    );
  }
}
