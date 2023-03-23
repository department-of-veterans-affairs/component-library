import { Component, Host, h } from '@stencil/core';

/**
 * @componentName Need Help?
 * @maturityCategory caution
 * @maturityLevel candidate
 */


@Component({
  tag: 'va-need-help',
  styleUrl: 'va-need-help.css',
  shadow: true,
})
export class VaNeedHelp {

  render() {
    return (
      <Host>
        <div class="need-help">
          <h2 id="need-help">Need help?</h2>
          <slot name="content"></slot>
        </div>
      </Host>
    );
  }

}
