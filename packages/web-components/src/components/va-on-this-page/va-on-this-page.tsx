import {
  Component,
  Element,
  Event,
  EventEmitter,
  forceUpdate,
  h,
  Prop
} from '@stencil/core';
import { i18next } from '../..';
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
 * @translations English
 * @translations Spanish
 * @translations Tagalog
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

  /**
   * Handler for removing tabindex and role attributes on blur.
   */
  private handleHeadingBlur = (event: FocusEvent) => {
    const heading = event.target as HTMLHeadingElement;
    heading.removeAttribute('tabindex');
    heading.removeAttribute('role');
  };

  /**
   * Moves focus to the heading element corresponding to the clicked anchor link.
   * This is added to fix known issues with screen readers like VoiceOver.
   *
   * @param event - The mouse click event from the anchor element
   * @remarks
   * Temporarily setting the tabindex to -1 fixes a VoiceOver bug that mishandles focus.
   * Adding role="text" fixes a screen reader bug that causes duplicate text announcements.
   * Both should be removed after the bugs are fixed in the screen readers.
   */
  private moveFocusToHeading = (event: MouseEvent) => {
    const anchor = event.currentTarget as HTMLAnchorElement;
    const heading = document.getElementById(anchor.hash.slice(1)) as HTMLHeadingElement;

    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.setAttribute('role', 'text');
      heading.focus();
      heading.addEventListener('blur', this.handleHeadingBlur, { once: true });
    }
  };

  private handleOnClick = event => {
    this.moveFocusToHeading(event);

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
        <ul>
          <li id="on-this-page">{i18next.t('on-this-page')}</li>
          {h2s.map(heading => (
            <li>
              <a href={`#${heading.id}`} onClick={handleOnClick}>
                <va-icon icon="arrow_downward"></va-icon>
                <span>{heading.innerText}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
