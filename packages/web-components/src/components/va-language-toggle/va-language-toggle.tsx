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
   * A JSON array of objects with link data. Each object should have an href, lang (ISO language code), and label properties. If using the pure web component provide as a string. Example: `[{"href": "/one", "lang": "en", "label": "English"}, ...]`.
   */
  @Prop() urls: LangUrl[] | string;

  /**
   * If true, specifies that the toggle is being used on a page with a router and clicking on a link will not result in page navigation.
   */
  @Prop() routerLinks?: boolean = false;
    
  /**
   * The urls as a Javascript array of objects, each with href, lang, and label properties.
   */
  @State() formattedUrls: LangUrl[] = [];
  
  /**
   * Event fired when a link is clicked. Includes the selected language's ISO code.
   */
  @Event()
  vaLanguageToggle: EventEmitter;

  // get the current page's url with language as a query param. 
  // allows for marking "pages" as visited
  getUrl(langCode: string): string {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', langCode);
    return url.href;
  }

  // This method is fired whenever a link is clicked
  handleToggle(e: Event, langCode: string) {
    // don't navigate from current page but set new language
    if (this.routerLinks) {
      e.preventDefault();
      // change browser url so that :visited styles apply to links
      window.history.replaceState(null, null, this.getUrl(langCode));
      this.language = langCode;
    }

    this.vaLanguageToggle.emit({ language: langCode });
  }

  componentWillLoad() {
    // parse urls if needed
    this.formattedUrls = (typeof this.urls === 'string' || this.urls instanceof String)
    ? JSON.parse(this.urls as string)
    : this.urls;
  }

  render() {
    const { language, formattedUrls } = this;
    return (
      <Host>
        {this.formattedUrls.map(({href, lang, label}, i) => {
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
              { (i < formattedUrls.length - 1) && <span>|</span> }
            </Fragment>
          )
        })}
      </Host>
    );
  }
}
