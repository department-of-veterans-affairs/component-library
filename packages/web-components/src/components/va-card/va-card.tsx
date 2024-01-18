import { 
  Component,
  Host, 
  Prop, 
  h 
} from '@stencil/core';

/**
 * @componentName Card
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-card',
  styleUrl: 'va-card.scss',
  shadow: true,
})
export class VaCard {
  /**
   * If `true`, a drop-shadow will be displayed
   */
  @Prop() showShadow?: boolean = false;

  /**
   * If `true`, the card will have a gray background.
   */
  @Prop() background?: boolean = false;

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
