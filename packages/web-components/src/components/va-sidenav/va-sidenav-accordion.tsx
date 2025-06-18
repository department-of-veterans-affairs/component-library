import { Component, h, Element, State, Prop } from '@stencil/core';

@Component({
  tag: 'va-sidenav-accordion',
  styleUrl: 'va-sidenav-accordion.scss',
  shadow: true,
})
export class VaSidenavAccordion {
  @Element() el!: HTMLElement;

  /**
   * If the accordion menu section is expanded.
  */
  @Prop({ reflect: true }) open?: boolean = true;

  @State() label: string;

  toggleOpen() {
    this.open = !this.open;
  }

  handleAccordionClasses() {
    // Add submenu class to all slotted va-sidenav-item elements
    const items = this.el.querySelectorAll('va-sidenav-item');
    
    items.forEach(item => {
      item.classList.add('va-sidenav__accordion-item');
    });
  }

  getAccordionLabel() {
    const parentItem = this.el.closest('va-sidenav-item');
    if (parentItem) {
      this.label = parentItem.getAttribute('label');
    }
  }

  componentDidLoad() {
    this.getAccordionLabel();
    this.handleAccordionClasses();
  }

  render() {
    return (
      <ul class="va-sidenav__accordion">
        <button 
          class="usa-accordion__button"
          onClick={this.toggleOpen.bind(this)}
          aria-expanded={this.open ? 'true' : 'false'} 
          aria-controls="accordionitems">
          {this.label}
        </button>
        <div id="accordionitems">
          <slot></slot>
        </div>
      </ul>
    );
  }
}
