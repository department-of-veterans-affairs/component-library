import { Component, Host, h } from '@stencil/core';
import { use } from 'typescript-mix';
import classnames from 'classnames';

import { VaCard } from '../va-card/va-card';

export interface VaCardExtended extends VaCard {}

@Component({
  tag: 'va-card-extended',
  styleUrl: 'va-card-extended.scss',
  shadow: true,
})
export class VaCardExtended {

  @use(VaCard) this: VaCard;

  render() {
    const classes = classnames('va-card',  {'show-shadow': this.showShadow});
    return (
      <Host class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
