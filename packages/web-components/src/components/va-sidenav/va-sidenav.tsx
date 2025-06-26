import { Component, Host, h, Prop, Listen, Element } from '@stencil/core';
import { forceUpdate } from '@stencil/core';

/**
 * Value corresponds with the --tablet breakpoint size.
 * https://design.va.gov/foundation/breakpoints
 */
const TABLET_BREAKPOINT = 640;

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

  @Element() el!: HTMLElement;

  /**
   * Header text to display at the top of the side navigation.
   */
  @Prop() header?: string;

  /**
   * Used to describe the navigation for screen readers. If the header property is set, that text will be used instead of this value.
   */
  @Prop() sectionName?: string;

  /**
   * The [icon name](https://design.va.gov/components/icon) for the icon that will display to the left of the header text. A iconBackgroundColor must be set.
   */
  @Prop() iconName?: string;

  /**
   * Adds a circle around the icon with the provided background [color token](https://design.va.gov/foundation/color-palette). 
   */
  @Prop() iconBackgroundColor?: string = 'vads-color-primary';

  @Listen('resize', { target: 'window' })
  handleResize() {
    this.isDesktop = window.innerWidth > TABLET_BREAKPOINT;
    forceUpdate(this);
  }

  /**
   * Checks for multiple current-page links and sets only the first one found to true.
   */
  setOnlyOneCurrentPage() {
    const currentPageElements = this.el.querySelectorAll('[current-page]');
    currentPageElements.forEach((el, index) => {
      if (index > 0) {
        el.setAttribute('current-page', 'false');
      }
    });
  }

  componentWillLoad() {
    this.setOnlyOneCurrentPage();
  }

  private isDesktop: boolean = window.innerWidth > TABLET_BREAKPOINT;

  render() {
    if (this.isDesktop) {
      return (
        <Host>
          <nav aria-label={this.header || this.sectionName}>
            {this.header && (
              <h2 class="va-sidenav__header">
                {this.iconName && this.iconBackgroundColor && (
                  <span class="va-sidenav__icon-background" style={{ backgroundColor: `var(--${this.iconBackgroundColor})` }}>
                    <va-icon icon={this.iconName}></va-icon>
                  </span>
                )}
                {this.header}
              </h2>
            )}
            <div class="va-sidenav__list">
              <slot></slot>
            </div>
          </nav>
        </Host>
      );
    }
  
    return (
      <Host>
        <va-accordion open-single>
          <va-accordion-item bordered header={`${this.header || this.sectionName} menu`}>
            <span slot="icon">
              <va-icon icon="menu" />
            </span>
            <nav aria-label={`Pages related to ${this.header || this.sectionName}`}>
              <div class="va-sidenav__list">
                <slot></slot>
              </div>
            </nav>
          </va-accordion-item>
        </va-accordion>
      </Host> 
    );
  }
}
