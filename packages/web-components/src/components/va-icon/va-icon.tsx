import { Component, Prop, getAssetPath, h } from '@stencil/core';

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
      <img src={path} class="usa-icon" aria-hidden="true" role="img">
      </img>
    );
  }

}
