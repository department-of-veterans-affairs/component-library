import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @componentName Card
 * @maturityCategory use
 * @maturityLevel deployed
 */

@Component({
  tag: 'va-card',
  styleUrl: 'va-card.scss',
  shadow: true,
})
export class VaCard {
  /**
   * If `true`, a drop-shadow will be displayed with a white background.
   */
  @Prop() showShadow?: boolean = false;

  /**
   * If `true`, the card will have a gray background.
   */
  @Prop() background?: boolean = false;

  /**
   * If set, displays an icon at the top of the card in a blue circle.
   * The value should be the icon name to use. Icons can be found at https://design.va.gov/components/icon
   */
  @Prop() iconName?: string;

  render() {
    return (
      <Host>
        {this.iconName && (
          <div class="va-card__icon-wrapper">
            <span class="va-card__icon-circle">
              <va-icon icon={this.iconName} size={5} />
            </span>
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
