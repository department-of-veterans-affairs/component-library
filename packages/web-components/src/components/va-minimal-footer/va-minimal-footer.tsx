import { Component, Host, h, getAssetPath} from '@stencil/core';

/**
 * @componentName Minimal Footer
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-minimal-footer',
  styleUrl: 'va-minimal-footer.scss',
  shadow: true,
})
export class VAMinimalFooter {

  render() {
    const imageSrc = getAssetPath(`../../assets/va-logo-white.png`);

    return (
      <Host>
        <div class="va-footer">
          <a href="/" >
            <img class="va-logo" src={imageSrc} aria-hidden="true"/>
          </a>
        </div>
      </Host>
    );
  }
}
