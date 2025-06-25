import { Component, Host, Prop, h } from '@stencil/core';
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
  shadow: true,
})
export class VaIcon {
  private fallbackSpriteLocation = '/img/sprite.svg';
  /**
   * The name of the icon to use
   */
  @Prop() icon!: string;

  /**
   * The location (url) of the icon sprite file.
   * If not set, uses the global or default location.
   * The path must be loaded from the same origin as you application, cannot traverse the file system using `..` and must be a `.svg` file.
   */
  @Prop() spriteLocation?: string;

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

  private validateSpriteLocation(rawSpritePath : string): string {
    let safeSpritePath = this.fallbackSpriteLocation,
        errorMessage = `Invalid SVG sprite path provided to <va-icon>: ${rawSpritePath}`;
    // Only allow .svg files from the same origin or relative paths
    try {
      const url = new URL(rawSpritePath, window.location.origin);
      if (
        url.origin === window.location.origin &&
        url.pathname.endsWith('.svg') &&
        !rawSpritePath.includes('..')
      ) {
        safeSpritePath = url.pathname;
      } else {
        consoleDevError(errorMessage);
      }
      return safeSpritePath;
    } catch (e) {
      consoleDevError(errorMessage);
      return safeSpritePath;
    }
    
  }

  componentWillLoad() {
    if (!globalThis.getVaIconSpriteLocation) {
      initIconSpriteLocation();
    }
  }

  render() {
    const { icon, srtext, spriteLocation } = this;
    const size = this.getSize();
    const iconClass = classnames({
      'usa-icon': true,
      [`usa-icon--size-${size}`]: !!size,
    });
    // Validate the sprite path to ensure it is a safe SVG file
    const imageSrc = this.validateSpriteLocation(spriteLocation || globalThis.getVaIconSpriteLocation()) + `#${icon}`;
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
