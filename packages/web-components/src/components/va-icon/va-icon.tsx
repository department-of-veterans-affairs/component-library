import { Component, Host, Prop, getAssetPath, h } from '@stencil/core';
import ascendingIcon from '../../assets/sort-arrow-up.svg?format=text';

@Component({
  tag: 'va-icon',
  styleUrl: 'va-icon.css',
  // assetsDirs: ["../../../../node_modules/@uswds/uswds"],
  shadow: true,
})
export class VaIcon {

  @Prop() icon!: string;

  render() {
    const path = getAssetPath(`./assets/${this.icon}.svg`);
    console.log('PATH', path)
    return (
      <Host >
        <div innerHTML={ascendingIcon}></div>
    </Host>
    );
  }

}
