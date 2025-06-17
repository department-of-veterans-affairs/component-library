import { Component, Prop, h } from '@stencil/core';
import classnames from 'classnames';
import { consoleDevError } from '../../utils/utils';
import { initIconSpriteLocation } from './va-icon-global';

/**
 * @componentName Icon
 * @maturityCategory caution
 * @maturityLevel available
 */

@Component({
  tag: 'va-icon',
  styleUrl: 'va-icon.scss',
  assetsDirs: ['../img'],
  shadow: false,
})
export class VaIcon {

  /**
   * The name of the icon to use
   */
  @Prop() icon!: string;

  /**
   * The location (url) of the icon sprite file.
   * If not set, uses the global or default location.
   */
  @Prop() spriteLocation?: string; // Default location for the icon sprite

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

  connectedCallback() {
    if (!globalThis.getVaIconSpriteLocation) {
      console.log('globalThis.getVaIconSpriteLocation is not defined');
      initIconSpriteLocation();
    } else {
      console.log('Already initialized globalThis.getVaIconSpriteLocation', globalThis.getVaIconSpriteLocation());
    }
  }

  render() {
    const { icon, srtext, spriteLocation } = this;
    const size = this.getSize();
    const iconClass = classnames({
      'usa-icon': true,
      [`usa-icon--size-${size}`]: !!size,
    });
    
    console.log(spriteLocation, globalThis.getVaIconSpriteLocation());
    const imageSrc = `${ spriteLocation || globalThis.getVaIconSpriteLocation() }#${icon}`; //* getAssetPath() had no perceivable effect here
    console.log('imageSrc', imageSrc);
    return (
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
    );
  }
}
