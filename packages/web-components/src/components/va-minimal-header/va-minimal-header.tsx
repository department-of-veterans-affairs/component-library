import { Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'va-minimal-header',
  styleUrl: 'va-minimal-header.scss',
  shadow: true,
  assetsDirs: ['./assets'],
})

export class VaMinimalHeader {
  @Prop() header?: string;
  @Prop() subheader?: string;

  render() {
    const {header, subheader} = this;
    
    return (
      <Host>
        <va-official-gov-banner/>
        <va-crisis-line-modal/>
        <div class="va-flex">
          
          <div class="va-logo"></div>
          <div class='header-container'>
            <h1>{header}</h1>
            <h2>{subheader}</h2>
          </div>
        </div>
      </Host>
    );
  }

}

//<img src={getAssetPath("./assets/VA-seal.png")} />

//<h1 class='va-logo'>VA</h1>