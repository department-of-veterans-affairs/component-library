import { Component, Host, h, EventEmitter, Event, Prop, Element } from '@stencil/core';

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

  private handleClick = () => {
    const content = this.el.shadowRoot?.querySelector('.content') as HTMLElement;
    const button = this.el.shadowRoot?.querySelector('button') as HTMLElement;
    const header = this.el.shadowRoot?.querySelector('header') as HTMLElement;

    // button aria-expanded attribute
    button.setAttribute(
      'aria-expanded', 
      button.getAttribute('aria-expanded') === 'true' 
        ? 'false' 
        : 'true'
    );
    // header `.expanded` class
    header.classList.toggle('expanded');
    // content `hidden` attribute
    content.hidden ? content.removeAttribute('hidden') : content.setAttribute('hidden', 'true');

    // TODO: Add analytics details.
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-official-gov-banner',
        action: 'click',
        details: { },
      }
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  render() {
    return (
      <Host>
        <section
          class="banner"
          aria-label="Official website of the United States government"
        >
          <div class="accordion">
            <header>
              <div class="inner">
                <div>
                  <img 
                    role="presentation" 
                    class="header-flag" 
                    src="https://s3-us-gov-west-1.amazonaws.com/content.www.va.gov/img/tiny-usa-flag.png"
                    alt="" />
                </div>
                <p class="header-text">An official website of the United States government</p>
                <button 
                  onClick={this.handleClick}
                  type="button" 
                  aria-expanded="false" 
                  aria-controls="official-gov-banner">
                  <span>Here's how you know</span>
                </button>
              </div>
            </header>

            <div class="content" id="official-gov-banner" hidden>
              <div class="grid-row">
                <div class="col">
                  <img 
                    src="https://s3-us-gov-west-1.amazonaws.com/content.www.va.gov/img/icon-dot-gov.svg" 
                    role="presentation" 
                    alt="" />
                  <div class="media-block">
                    <p>
                      <strong>Official websites use .gov</strong><br />
                      A <strong>.gov</strong> website belongs to an official government
                      organization in the United States.
                    </p>
                  </div>
                </div>
                <div class="col">
                  <img 
                    src="https://s3-us-gov-west-1.amazonaws.com/content.www.va.gov/img/icon-https.svg" 
                    role="presentation" 
                    alt="" />
                  <div class="media-block">
                    <p>
                      <strong>Secure .gov websites use HTTPS</strong><br />
                      A <strong>lock</strong> (
                      <span class="icon-lock">
                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64" role="img" aria-labelledby="banner-lock-description" focusable="false">
                          <title id="banner-lock-title">Lock</title>
                          <desc id="banner-lock-description">Locked padlock icon</desc>
                          <path fill="#000000" fill-rule="evenodd" d="M26 0c10.493 0 19 8.507 19 19v9h3a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h3v-9C7 8.507 15.507 0 26 0zm0 8c-5.979 0-10.843 4.77-10.996 10.712L15 19v9h22v-9c0-6.075-4.925-11-11-11z"></path>
                        </svg> 
                        </span>) or <strong>https://</strong> means you've safely connected to
                      the .gov website. Share sensitive information only on official,
                      secure websites.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </Host>
    );
  }

}
