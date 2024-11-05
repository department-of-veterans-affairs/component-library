import { Component, Host, h, State, Event, EventEmitter, Prop, Fragment } from '@stencil/core';
import classNames from 'classnames';

export type LangUrl = {
  label: string;
  href: string;
  lang: string;
};

/**
 * @componentName Language Toggle
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-language-toggle',
  styleUrl: 'va-language-toggle.scss',
  shadow: true,
})
export class VaLanguageToggle {
  /**
   * The ISO language code for the page. Default is 'en'.
   */
  @Prop() language: string = 'en';

  /**
   * The English language href for the page. Required.
   */
  @Prop() enHref!: string;

  /**
   * The Spanish language href for the page. Optional.
   */
  @Prop() esHref?: string;

  /**
   * The Tagalog language href for the page. Optional.
   */
  @Prop() tlHref?: string;

  /**
   * A JSON array of objects with link data.
   */
  @State() urls: LangUrl[];

  /**
   * If true, specifies that the toggle is being used on a page with a router and clicking on a link will not result in page navigation.
   */
  @Prop() routerLinks?: boolean = false;
  
  /**
   * Event fired when a link is clicked. Includes the selected language's ISO code.
   */
  @Event()
  vaLanguageToggle: EventEmitter;

  /**
   * The event used to track usage of the component.
   */
    @Event({
      bubbles: true,
      composed: true,
      eventName: 'component-library-analytics',
    })
    componentLibraryAnalytics: EventEmitter;

  // get the current page's url with language as a query param. 
  // allows for marking "pages" as visited
  getUrl(langCode: string): string {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    return url.href;
  }

  // This method is fired whenever a link is clicked
  handleToggle(e: Event, langCode: string): void {
    // don't navigate from current page but set new language
    if (this.routerLinks) {
      e.preventDefault();
      // change browser url so that :visited styles apply to links
      window.history.replaceState(null, null, this.getUrl(langCode));
      this.language = langCode;
    }

    this.vaLanguageToggle.emit({ language: langCode });

    const detail = {
      componentName: 'va-language-toggle',
      action: 'linkClick',
      details: {
        'pipe-delimited-list-header': langCode
      },
    };
    this.componentLibraryAnalytics.emit(detail);
  }

  componentWillLoad() {
    // always include English
    const urls = [{
      label: "English",
      lang: "en",
      href: this.enHref
    }];

    if (this.esHref) {
      urls.push({
        label: "Español",
        lang: "es",
        href: this.esHref
      });
    }

    if (this.tlHref) {
      urls.push({
        label: "Tagalog",
        lang: "tl",
        href: this.tlHref
      });
    }

    this.urls = urls;
  }

  render() {
    const { language, urls } = this;
    return (
      <Host>
        {urls.map(({href, lang, label}, i) => {
          const anchorClass = classNames({
            'is-current-lang': lang === language
          });
          return (
            <Fragment>
              <a
                class={anchorClass}
                href={href}
                lang={lang}
                hrefLang={lang}
                onClick={(e) => this.handleToggle(e, lang)}
              >
                {label}
              </a>
              { (i < urls.length - 1) && <span>|</span> }
            </Fragment>
          )
        })}
      </Host>
    );
  }
}
