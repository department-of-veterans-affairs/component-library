import {
  Component,
  Host,
  h,
  Prop,
  State,
  Element,
  Listen,
} from '@stencil/core';
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
  @Element() el: HTMLElement;

  /**
   * Local state to track if the shift key is pressed
   */
  @State() shifted: boolean = false;

  @Prop() header?: string;
  @Prop() subheader?: string;

  // This keydown event listener tracks if the shift key is held down while changing focus
  @Listen('keydown', { target: 'window' })
  trackShiftKey(e: KeyboardEvent) {
    this.shifted = e.shiftKey;
  }

  // Redirects focus back to the modal, if the modal is open/visible
  private trapFocus() {
    const modal = this.el?.shadowRoot.querySelector('va-crisis-line-modal').shadowRoot.querySelector('va-modal');
    const modalVisible = modal?.getAttribute('visible');

    if (modalVisible !== null && modalVisible !== 'false') {
      let focusedChild;
      const query = this.shifted ? '.last-focusable-child' : '.va-modal-close';
      if (this.shifted) {
        focusedChild = modal?.querySelector(query) as HTMLElement;
      } else {
        focusedChild = modal?.shadowRoot.querySelector(query) as HTMLElement;
      }

      focusedChild?.focus();
    }
  }

  render() {
    const { header, subheader } = this;

    return (
      <Host role="banner">
        <va-official-gov-banner />
        <va-crisis-line-modal />
        <div onFocusin={() => this.trapFocus()} class="va-header">
          <a href="/" title="Go to VA.gov" class="va-logo-link">
            <img class="va-logo" src={vaSeal} alt="VA logo and Seal, U.S. Department of Veterans Affairs" />
          </a>
          <div class="header-container">
            <h1>{header}</h1>
            {this.subheader && <h2>{subheader}</h2>}
          </div>
        </div>
      </Host>
    );
  }
}