import { Component, Host, h } from '@stencil/core';
import vaSeal from '../../assets/va-logo-white.svg';

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

    return (
      <Host>
        <div class="va-footer">
          <a href="/" title="Go to VA.gov" >
            <img class="va-logo" src={vaSeal} alt="VA logo and Seal, U.S. Department of Veterans Affairs"/>
          </a>
        </div>
      </Host>
    );
  }
}
