import { Component, h, Element, Prop } from '@stencil/core';

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

  /**
   * The label for the accordion menu section
   */
  @Prop() label!: string;

  toggleOpen() {
    this.open = !this.open;
  }

  render() {
    return (
      <nav class="va-sidenav__accordion" aria-label="Pages related to [this section]">
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
      </nav>
    );
  }
}
