import { Component, Host, h, Prop } from '@stencil/core';

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

  render() {
    return (
      <Host>
        <nav aria-label={`Pages related to ${this.header || this.sectionName}`}>
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
}
