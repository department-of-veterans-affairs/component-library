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
    const path = getAssetPath("./assets/sprite.svg");
    console.log('PATH', path)
    return (
      <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
        <use xlinkHref={`${path}#${this.icon}`}></use>
      </svg>
    );
  }

}
