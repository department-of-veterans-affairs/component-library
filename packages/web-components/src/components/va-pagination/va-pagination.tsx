import {
  Component,
  Event,
  EventEmitter,
  Fragment,
  Host,
  h,
  Prop,
  Element,
  forceUpdate,
  getAssetPath,
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../../i18n/i18n-setup';
import { Build } from '@stencil/core';

import { makeArray } from '../../utils/utils';

if (Build.isTesting) {
  // Make i18next.t() return the key instead of the value
  i18next.init({ lng: 'cimode' });
}

/**
 * @componentName Pagination
 * @maturityCategory use
 * @maturityLevel deployed
 */

@Component({
  tag: 'va-pagination',
  styleUrl: 'va-pagination.scss',
  assetsDirs: ['../assets'],
  shadow: true,
})
export class VaPagination {
  @Element() el: HTMLElement;
  /**
   * Fires when a page is selected
   */
  @Event() pageSelect: EventEmitter;

  /**
   * The event used to track usage of the component. Fires when a
   * a page is selected if enable-analytics is true.
   */
  @Event({
    bubbles: true,
    composed: true,
    eventName: 'component-library-analytics',
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Aria-label suffix text for buttons
   */
  @Prop() ariaLabelSuffix?: string = '';

  /**
   * Whether or not an analytics event will be fired
   */
  @Prop() enableAnalytics?: boolean = true;

  /**
   * The maximum number of pages to show at once
   */
  @Prop() maxPageListLength?: number = 10;

  /**
   * The current page number
   */
  @Prop() page: number;

  /**
   * The total number of pages
   */
  @Prop() pages: number;

  /**
   * Display last page number when the page count exceeds
   * `maxPageListLength`
   */
  @Prop() showLastPage?: boolean = false;

  /**
   * Don't show last page when the page count exceeds
   * `maxPageListLength` (but do show the ellipsis).
   */

  @Prop() unbounded?: boolean = false;

  /**
   * If the page total is less than or equal to this limit, show all pages.
   */
  SHOW_ALL_PAGES: number = 7;

  private handlePageSelect = (page, eventID) => {
    this.pageSelect.emit({ page });

    // Reset focus to the active page button.
    (this.el?.shadowRoot?.activeElement as HTMLElement)?.blur();

    if (this.enableAnalytics) {
      const detail = {
        componentName: 'va-pagination',
        action: 'linkClick',
        details: {
          'event': eventID,
          'page-number': page,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  };

  /**
   * Generate a list of the continuous page numbers to render, i.e.
   * the page numbers to render not including the first and/or last page
   */
  private pageNumbers = () => {
    const {
      maxPageListLength,
      page: currentPage,
      pages: totalPages,
      unbounded,
    } = this;

    // radius is half the length of the visible pages
    // use as a reference from the selected page to find
    // start and end of the pages to render
    const radius = Math.floor(maxPageListLength / 2);

    //if the unbounded flag is set we don't include the last page
    const unboundedChar = unbounded ? 0 : 1;

    let start;
    let end;

    if (totalPages <= this.SHOW_ALL_PAGES) {
      return makeArray(1, totalPages);
    }

    // continuous pages start at 1
    if (currentPage <= radius + 1) {
      start = 1;
      end =
        maxPageListLength >= totalPages
          ? totalPages
          : maxPageListLength - 1 - unboundedChar;
      if (end === currentPage) {
        // make sure the next page is showing
        end++;
      }
      return makeArray(start, end);
    }

    // continuous pages end at last page
    if (currentPage + radius >= totalPages) {
      end = totalPages;
      start =
        totalPages - maxPageListLength > 0
          ? //subtract 2 to account for having to add ellipsis and first page
            totalPages - (maxPageListLength - 2 - 1)
          : 1;
      if (start === currentPage) {
        // make sure the previous page is showing
        start--;
      }
      return makeArray(start, end);

      // continuous pages don't start at 1 or end at last page
    } else {
      // subtract 2 to account for having to show the ellipsis and the "first" page
      start = currentPage - (radius - 2);
      if (currentPage + radius > totalPages) {
        end = totalPages;
      } else {
        // subtract 1 to account for having to show the ellipsis
        // and subtract another 1 if showing the "last" page (unbounded = false)
        end = currentPage + (radius - 1 - unboundedChar);
      }
    }

    return makeArray(start, end);
  };

  private handleKeyDown = (e, pageNumber) => {
    const keyCode = e.key;
    if (keyCode === 'Enter' || keyCode === ' ') {
      e.preventDefault();
      if (!pageNumber) return;

      /* eslint-disable-next-line i18next/no-literal-string */
      this.handlePageSelect(pageNumber, 'nav-paginate-number');
    }
  };

  /**
   * Adding SVGs here because if SVGs are included in the render method,
   * the result is to render the page in xhtml not html
   * and errors result.
   */
  addIcons() {
    function makeSvgString(icon: string) {
      const path = `${getAssetPath('/img/sprite.svg')}#${icon}`;
      // eslint-disable-next-line i18next/no-literal-string
      return `<svg
      class="usa-icon"
      aria-hidden="true"
      role="img">
        <use href=${path}></use>
      </svg>`;
    }

    const prevIconDiv = this.el.shadowRoot?.querySelector(
      '#previous-arrow-icon',
    );
    if (prevIconDiv) {
      prevIconDiv.innerHTML = makeSvgString('navigate_before');
    }

    const nextIconDiv = this.el.shadowRoot?.querySelector('#next-arrow-icon');
    if (nextIconDiv) {
      nextIconDiv.innerHTML = makeSvgString('navigate_next');
    }
  }

  componentDidRender() {
    this.addIcons();
  }

  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  render() {
    const {
      ariaLabelSuffix,
      page,
      pages,
    } = this;

    if (pages === 1) {
      return <div />;
    }

    const previousAriaLabel = ariaLabelSuffix
      ? `Previous page ${ariaLabelSuffix}`
      : 'Previous page';
    const nextAriaLabel = ariaLabelSuffix
      ? `Next page ${ariaLabelSuffix}`
      : 'Next page';

    const pageNumbersToRender = this.pageNumbers();
    const itemClasses = classnames({
      'usa-pagination__item': true,
      'usa-pagination__page-no': true,
      'va-pagination__item': true,
    });
    const ellipsisClasses = classnames({
      'usa-pagination__item': true,
      'usa-pagination__overflow': true,
      'va-pagination__item': true,
    });
    const arrowClasses = classnames({
      'usa-pagination__item': true,
      'usa-pagination__arrow': true,
    });

    const previousButton =
      page > 1 ? (
        <Fragment>
          <li class={arrowClasses} aria-label={previousAriaLabel}>
            <a
              onClick={() =>
                this.handlePageSelect(page - 1, 'nav-paginate-number')
              }
              onKeyDown={e => this.handleKeyDown(e, page - 1)}
              class="usa-pagination__link usa-pagination__previous-page"
              href="javascript:void(0)"
            >
              <div id="previous-arrow-icon"></div>
              <span class="usa-pagination__link-text">
                {i18next.t('previous')}
              </span>
            </a>
          </li>
          {!pageNumbersToRender.includes(1) && (
            <Fragment>
              <li class={itemClasses}>
                <a
                  onClick={() =>
                    this.handlePageSelect(1, 'nav-paginate-number')
                  }
                  onKeyDown={e => this.handleKeyDown(e, 1)}
                  href="javascript:void(0)"
                  class="usa-pagination__button"
                  aria-label="page 1, first page"
                >
                  1
                </a>
              </li>
              <li
                class={ellipsisClasses}
                aria-label="ellipsis indicating non-visible pages"
              >
                <span>…</span>
              </li>
            </Fragment>
          )}
        </Fragment>
      ) : null;

    const renderPages = pageNumbersToRender.map(pageNumber => {
      const anchorClasses = classnames({
        'usa-pagination__button': true,
        'usa-current': page === pageNumber,
      });

      let pageAriaLabel = ariaLabelSuffix
        ? `page ${pageNumber} ${ariaLabelSuffix}`
        : `page ${pageNumber}`;
      if (pageNumber === 1) {
        pageAriaLabel = `${pageAriaLabel}, first page`;
      }
      if (pageNumber === pages) {
        pageAriaLabel = `${pageAriaLabel}, last page`;
      }
      return (
        <li class={itemClasses}>
          <a
            onClick={() =>
              this.handlePageSelect(pageNumber, 'nav-paginate-number')
            }
            onKeyDown={e => this.handleKeyDown(e, pageNumber)}
            href="javascript:void(0)"
            class={anchorClasses}
            aria-current={page === pageNumber ? 'page' : null}
            aria-label={pageAriaLabel}
          >
            {pageNumber}
          </a>
        </li>
      );
    });
    const endEllipsisAndLastPage =
      pageNumbersToRender.indexOf(pages) === -1 ? (
        <Fragment>
          {pages > this.SHOW_ALL_PAGES && (
            <li
              class={ellipsisClasses}
              aria-label="ellipsis indicating non-visible pages"
            >
              <span>…</span>
            </li>
          )}
          {!this.unbounded && pages > this.SHOW_ALL_PAGES && (
            <li class={itemClasses}>
              <a
                onClick={() =>
                  this.handlePageSelect(pages, 'nav-paginate-number')
                }
                onKeyDown={e => this.handleKeyDown(e, pages)}
                href="javascript:void(0)"
                class="usa-pagination__button"
                aria-label={`page ${pages}, last page`}
              >
                {pages}
              </a>
            </li>
          )}
        </Fragment>
      ) : null;

    const nextButton =
      page < pages ? (
        <Fragment>
          <li class={arrowClasses} aria-label={nextAriaLabel}>
            <a
              onClick={() =>
                this.handlePageSelect(page + 1, 'nav-paginate-number')
              }
              onKeyDown={e => this.handleKeyDown(e, page + 1)}
              class="usa-pagination__link usa-pagination__next-page"
              href="javascript:void(0)"
            >
              <span class="usa-pagination__link-text">
                {i18next.t('next')}
              </span>
              <div id="next-arrow-icon"></div>
            </a>
          </li>
        </Fragment>
      ) : null;

    return (
      <Host>
        <nav class="usa-pagination" aria-label="Pagination">
          <ul class="usa-pagination__list">
            {previousButton}
            {renderPages}
            {endEllipsisAndLastPage}
            {nextButton}
          </ul>
        </nav>
      </Host>
    );
  }
}
