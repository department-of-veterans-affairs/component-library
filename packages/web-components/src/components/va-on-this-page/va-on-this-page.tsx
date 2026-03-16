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
import { consoleDevError, getHeaderLevel } from '../../utils/utils';

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
  styleUrl: 'va-on-this-page.scss',
  shadow: true,
})
export class VaOnThisPage {
  @Element() el: HTMLElement;

  /**
   * Returns the DOM scope used to find headings for this instance.
   *
   * limit the scope to this component's parent container
   * so if there are multiple instances, each instance only builds links for its own section.
   */
  private getHeadingScope = (): ParentNode => {
    const article = this.el.closest('article');
    if (article?.querySelectorAll('va-on-this-page').length > 1) {
      return this.el.parentElement || article;
    }
    return article || this.el.parentElement || document;
  };

  /**
   * Determines whether an element is visible to the user.
   */
  private isVisibleElement = (node: HTMLElement): boolean => {
    return !node.classList?.contains('usa-sr-only') &&
           !node.classList?.contains('sr-only') &&
            node.style?.visibility !== 'hidden' &&
            node.style?.display !== 'none' &&
            node.checkVisibility();
  };

  /**
   * Creates the link label text from an h2.
   *
   * This filters out common screen-reader-only classes and invisible elements
   * so the visual link label matches what sighted users see on the page.
   */
  private getHeadingText = (heading: HTMLElement): string => {
    return heading.childNodes.length === 1 ? heading.textContent : 
      Array.from(heading.childNodes).map((node: ChildNode) => {
        if (node.nodeType === Node.TEXT_NODE) {
          return node.textContent;
        }
        const elementNode = node as HTMLElement;
        return this.isVisibleElement(elementNode) ? (elementNode.textContent || '') : '';
      }).join(' ');
  };

  /**
   * Finds a heading by id within the component scope first, then globally.
   *
   * Scoped lookup avoids collisions when duplicate ids exist on the same page
   */
  private getHeadingById = (id: string): HTMLHeadingElement | null => {
    const escapedId = id
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');
    const scopedHeading = this.getHeadingScope().querySelector<HTMLElement>(
      `[id="${escapedId}"]`,
    ) as HTMLHeadingElement;

    return (
      scopedHeading ||
      (document.getElementById(id) as HTMLHeadingElement)
    );
  };

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
   * Header level. Must be between 1 and 6
   */
  @Prop() headerLevel?: number = 2;

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
    const headingId = decodeURIComponent(anchor.hash.slice(1));
    const heading = this.getHeadingById(headingId);

    if (heading) {
      // Keep hash links as fallback, but prevent default jumping to a duplicate id elsewhere on the page.
      event.preventDefault();

      heading.scrollIntoView({ block: 'start' });
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
    // eslint-disable-next-line i18next/no-literal-string
    const HeaderLevel = getHeaderLevel(this.headerLevel) || 'h2';

    const h2s = Array.from(this.getHeadingScope().querySelectorAll<HTMLElement>('h2'))
      .filter(heading => {
        if (!heading.id) {
          consoleDevError(`${heading.textContent} is missing an id`);
        }
        return heading.id;
      })
      .map(heading => ({
        id: heading.id,
        text: this.getHeadingText(heading),
      }));

    return (
      <nav aria-labelledby="on-this-page">
        <HeaderLevel id="on-this-page">{i18next.t('on-this-page')}</HeaderLevel>
        <ul>
          {h2s.map(heading => (
            <li>
              <a href={`#${heading.id}`} onClick={handleOnClick}>
                <va-icon icon="arrow_downward"></va-icon>
                <span>{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
