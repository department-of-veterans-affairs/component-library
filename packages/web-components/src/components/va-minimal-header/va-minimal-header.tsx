import { Component, Host, h, Prop} from '@stencil/core';
import vaSeal from '../../assets/va-seal.svg';

/**
 * @componentName Minimal Header
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-minimal-header',
  styleUrl: 'va-minimal-header.scss',
  shadow: true,
})

export class VaMinimalHeader {
  @Prop() header?: string;
  @Prop() subheader?: string;

  render() {
    const {header, subheader} = this;

    return (
      <Host role="banner">
        <va-official-gov-banner/>
        <va-crisis-line-modal/>
        <div class="va-header">

          <a href="/" >
            <img class="va-logo" src={vaSeal} aria-hidden="true"/>
          </a>
          <div class='header-container'>
            <h1>{header}</h1>
            {this.subheader &&
              <h2>{subheader}</h2>}
          </div>
        </div>
      </Host>
    );
  }

}