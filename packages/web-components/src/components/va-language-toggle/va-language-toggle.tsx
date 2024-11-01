import { Component, Host, h, State, Event, EventEmitter, Prop, Fragment} from '@stencil/core';
import classNames from 'classnames';

export type LangUrl = {
  label: string;
  href: string;
  lang: string;
};

/**
 * @componentName LanguageToggle
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
   * A JSON array of objects with link data for the toggle to render. Each object should have an href, lang (ISO language code), and label properties. If using the pure web component provide as a string. Example: '[{"href":"https://www.va.gov/resources/the-pact-act-and-your-va-benefits/","lang":"en","label":"English"},{"href":"https://www.va.gov/resources/the-pact-act-and-your-va-benefits/","lang":"es","label":"Español"}]'
   */
  @Prop() urls: LangUrl[] | string;

  /**
   * If true, specifies that the toggle is being used on a page with a router and clicking on a link will not result in page navigation.
   */
  @Prop() routerLinks?: boolean = false;
    
  /**
   * The urls as a Javascript array of objects with href, lang, and label properties.
   */
  @State() formattedUrls: LangUrl[] = [];
  
    /**
   * The event used to track usage of the component. This is emitted when an
   * anchor link is clicked and disableAnalytics is not true.
   */
    @Event({
      eventName: 'component-library-analytics',
      composed: true,
      bubbles: true,
    })
    componentLibraryAnalytics: EventEmitter;
  
  /**
   * Event fired when a link is clicked. Includes the selected language's ISO code.
   */
  @Event()
  vaLanguageToggle: EventEmitter;
  
  // This method is fired whenever a link is clicked
  handleToggle(e: Event, langCode: string) {
    // don't navigate from current page
    if (this.routerLinks) {
      e.preventDefault();
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
                lang={language}
                hrefLang={language}
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
