import { 
  Component,
  Host, 
  Prop, 
  h 
} from '@stencil/core';
import classnames from 'classnames';

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

  render() {
    const {
      showShadow
    } = this;

    const classes = classnames('va-card',  {'show-shadow': showShadow});

    return (
      <Host class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
