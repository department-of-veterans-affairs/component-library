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
 * @componentName Header - Minimal
 * @maturityCategory caution
 * @maturityLevel candidate
 * @guidanceHref header/header-minimal
 */

@Component({
  tag: 'va-header-minimal',
  styleUrl: 'va-header-minimal.scss',
  shadow: true,
})
export class VaHeaderMinimal {
  @Element() el: HTMLElement;

  /**
   * Local state to track if the shift key is pressed
   */
  @State() shifted: boolean = false;

  @Prop() header?: string;
  @Prop() subheader?: string;

  /**
   * Enables use of heading tags in the minimal header instead of `<div>` tags. This is for when a heading level 1 needs to be used in the header, as there should only be one heading level 1 per page.
   */
  @Prop() enableHeadings?: boolean = false;

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
    const { header, subheader, enableHeadings: enableHeadings } = this;

    return (
      <Host role="banner">
        <va-official-gov-banner />
        <va-crisis-line-modal />
        <div onFocusin={() => this.trapFocus()} class="va-header">
          <a href="/" title="Go to VA.gov" class="va-logo-link">
            <img class="va-logo" src={vaSeal} alt="VA logo and Seal, U.S. Department of Veterans Affairs" />
          </a>
          <div class="header-container">
            
            {enableHeadings ? <h1>{header}</h1> : <div class="header">{header}</div>}

            {subheader && (
              enableHeadings ? <h2>{subheader}</h2> : <div class="subheader">{subheader}</div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}