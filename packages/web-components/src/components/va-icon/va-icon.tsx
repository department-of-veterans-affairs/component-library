import { Component, Host, Prop, h } from '@stencil/core';
import classnames from 'classnames';
import { consoleDevError } from '../../utils/utils';
import Sprite from '../../assets/sprite.svg';

/**
 * @componentName Icon
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-icon',
  styleUrl: 'va-icon.scss',
  assetsDirs: ['../assets'],
  shadow: true,
})
export class VaIcon {
  /**
   * The name of the icon to use
   */
  @Prop() icon!: string;

  /**
   * The size variant of the icon,
   * an integer between 3 and 9 inclusive
   */
  @Prop() size?: number;

  /**
   * Screen-reader text if the icon has semantic meaning
   * and is not purely decorative.
   */
  @Prop() srtext?: string;

  private getSize(): number | null {
    const sizes = [3, 4, 5, 6, 7, 8, 9];
    if (!!this.size && !sizes.includes(this.size)) {
      consoleDevError(`Size must be an integer between 3 and 9, inclusive.`);
      return null;
    }
    return this.size;
  }

  render() {
    const { icon, srtext } = this;
    const size = this.getSize();
    const iconClass = classnames({
      'usa-icon': true,
      [`usa-icon--size-${size}`]: !!size,
    });
    const imageSrc = `${Sprite}#${icon}`;
    return (
      <Host>
        <svg
          class={iconClass}
          aria-labelledby={!!srtext ? 'icon-title' : null}
          aria-hidden={!!srtext ? null : 'true'}
          focusable="false"
          role="img"
        >
          {srtext && <title id="icon-title">{srtext}</title>}
          <use href={imageSrc}></use>
        </svg>
      </Host>
    );
  }
}
