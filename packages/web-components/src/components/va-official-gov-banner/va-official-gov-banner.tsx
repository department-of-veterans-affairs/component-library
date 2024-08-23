import {
  Component,
  Host,
  h,
  EventEmitter,
  Event,
  Prop,
  Element,
  forceUpdate
} from '@stencil/core';
import i18next from 'i18next';
import { Build } from '@stencil/core';

import iconHttpsSvg from '../../assets/icon-https.svg';
import iconDotGovSvg from '../../assets/icon-dot-gov.svg';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @componentName Banner - Official Gov
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-official-gov-banner',
  styleUrl: 'va-official-gov-banner.scss',
  shadow: true,
})
export class VaOfficialGovBanner {
  @Element() el: HTMLElement;
  /**
   * The event used to track usage of the component.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * If `true`, the component-library-analytics event is disabled.
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Accepts a top level domain (TLD) value of either `gov` or `mil`.
   * Default is `gov`.
   */
  @Prop() tld: string = 'gov';

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  componentDidLoad(){
    // Initial loading of formatted text.
    this.govSiteExplanationText();
    this.govSiteLockText();
  }

  private handleClick = () => {
    const content = this.el.shadowRoot?.querySelector('.content') as HTMLElement;
    const button = this.el.shadowRoot?.querySelector('button') as HTMLElement;
    const header = this.el.shadowRoot?.querySelector('div#header') as HTMLElement;

    button.setAttribute(
      'aria-expanded',
      button.getAttribute('aria-expanded') === 'true'
        ? 'false'
        : 'true'
    );

    header.classList.toggle('expanded');
    // Toggle the hidden attribute on the content.
    content.hidden ? content.removeAttribute('hidden') : content.setAttribute('hidden', 'true');

    if (!this.disableAnalytics) {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      const detail = {
        componentName: 'va-official-gov-banner',
        action: isOpen ? 'expand' : 'collapse',
      }
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  /**
   * This will add <strong> tags around the
   * matching TLD value (.gov or .mil) in the text that is provided
   * and the innerHTML of the element will be updated.
   */
  private govSiteExplanationText = () => {
    const el = this.el.shadowRoot?.querySelector('.gov-site-explanation-text') as HTMLElement;
    if (el) {
      const text = i18next.t('gov-site-explanation', { tld: this.tld });
      if (text) {
        el.innerHTML = text.replace(`.${this.tld}`, `<strong>.${this.tld}</strong>`);
      }
    }
  }

  /**
   * This will add <strong> tags around various words in the text that is provided
   * as well as add the SVG lock image.
   */
  private govSiteLockText = () => {
    const el = this.el.shadowRoot?.querySelector('.gov-site-lock-text') as HTMLElement;

    // eslint-disable-next-line i18next/no-literal-string
    const lockSvg = `(&nbsp;<span class="icon-lock"><svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64" role="img" aria-labelledby="banner-lock-description" focusable="false">
    <title id="banner-lock-title">Lock</title>
    <desc id="banner-lock-description">Locked padlock icon</desc>
    <path fill="#000000" fill-rule="evenodd" d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"></path>
    </svg></span>&nbsp;)`

    let html = i18next.t('gov-site-lock', { image: 'SVG', tld: this.tld });

    html = html.replace('SVG', lockSvg);
    html = html.replace('lock', `<strong>lock</strong>`);
    html = html.replace('candado', `<strong>candado</strong>`);
    html = html.replace('https://', `<strong>https://</strong>`);

    if (el) {
      el.innerHTML = html;
    }
  }

  render() {
    const { tld } = this;
    if (tld === 'gov' || tld === 'mil') {
      return (
        <Host>
            <div class="banner">
            <div class="accordion"  >
              <div id="header">
                <div class="inner">
                  <div class="grid-col-auto">
                    <img
                      role="presentation"
                      class="header-flag"
                      src="https://s3-us-gov-west-1.amazonaws.com/content.www.va.gov/img/tiny-usa-flag.png"
                      alt="" />
                  </div>
                  <div class="grid-col-fill" aria-hidden="true">
                    <p class="header-text">{i18next.t('gov-site-label')}</p>
                    <p class="header-action">{i18next.t('gov-site-button')}</p>
                  </div>
                  <button
                    onClick={this.handleClick}
                    type="button"
                    aria-expanded="false"
                    aria-controls="official-gov-banner">
                    <span class="button-text">{i18next.t('gov-site-button')}</span>
                  </button>
                </div>
              </div>

              <div class="content" id="official-gov-banner" hidden>
                <div class="grid-row">
                  <div class="col">
                    <img
                      src={iconHttpsSvg}
                      role="presentation"
                      alt="" />
                    <div class="media-block">
                      <p>
                        <strong>{i18next.t('gov-site-website', { tld })}</strong><br />
                        <span class="gov-site-explanation-text">
                          {this.govSiteExplanationText()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="col">
                    <img
                      src={iconDotGovSvg}
                      role="presentation"
                      alt="" />
                    <div class="media-block">
                      <p>
                        <strong>{i18next.t('gov-site-https', { tld })}</strong><br />
                        <span class="gov-site-lock-text">
                          {this.govSiteLockText()}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Host>
      );
    }
  }

}
