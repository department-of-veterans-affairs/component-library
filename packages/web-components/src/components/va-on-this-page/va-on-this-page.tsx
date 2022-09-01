import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Prop
} from '@stencil/core';
import i18next from 'i18next';
import { Build } from '@stencil/core';
import { consoleDevError } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * This component will render links based on the content around it. It scans the document for any `<h2>`
 * elements that contain an `id` inside of an `<article>` and will create a list of links to the headings.
 */

/**
 * @componentName On this page
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-on-this-page',
  styleUrl: 'va-on-this-page.css',
  shadow: true,
})
export class VaOnThisPage {
  @Element() el: HTMLElement;

  /**
   * The event used to track usage of the component. This is emitted when the
   * user clicks on a link and enableAnalytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * If true, analytics event will not be fired
   */
  @Prop() disableAnalytics?: boolean = false;

  private handleOnClick = event => {
    if (this.disableAnalytics) return;
    this.componentLibraryAnalytics.emit({
      componentName: 'va-on-this-page',
      action: 'click',
      details: {
        'click-text':
          event.composedPath()?.[0]?.textContent ||
          event.path?.[0]?.textContent,
      },
    });
  };

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  render() {
    const { handleOnClick } = this;

    const h2s = Array.from(document.querySelectorAll('article h2')).filter(
      heading => {
        if (!heading.id) {
          consoleDevError(`${heading.textContent} is missing an id`);
        }
        return heading.id;
      },
    ) as Array<HTMLElement>;

    return (
      <nav aria-labelledby="on-this-page">
        <dl>
          <dt id="on-this-page">{i18next.t('on-this-page')}</dt>
          <dd role="definition">
            {h2s.map(heading => (
              <a href={`#${heading.id}`} onClick={handleOnClick}>
                <i aria-hidden="true" class="fas fa-arrow-down"></i>
                {heading.innerText}
              </a>
            ))}
          </dd>
        </dl>
      </nav>
    );
  }
}
