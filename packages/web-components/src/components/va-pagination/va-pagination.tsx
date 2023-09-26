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
import i18next from 'i18next';
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
   * Only relevant if uswds is true.
   */

  @Prop() unbounded?: boolean = false;

  /**
  * Whether or not the component will use USWDS v3 styling.
  */
  @Prop() uswds?: boolean = false;

  /**
   * If the page total is less than or equal to this limit, show all pages.
   * Only relevant for uswds.
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
  private pageNumbersUswds = () => {
    const {
      maxPageListLength,
      page: currentPage,
      pages: totalPages,
      unbounded
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
    if ( currentPage <= radius + 1 ) {
      start = 1;
      end = maxPageListLength >= totalPages
        ? totalPages
        : maxPageListLength - 1 - unboundedChar;
      return makeArray(start, end);
    }

    // continuous pages end at last page
    if (currentPage + radius >= totalPages) {
      end = totalPages;
      start = totalPages - maxPageListLength > 0
        //subtract 2 to account for having to add ellipsis and first page
        ? totalPages - (maxPageListLength - 2 - 1)
        : 1;
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
  }

  private pageNumbers = () => {
    const {
      maxPageListLength,
      page: currentPage,
      pages: totalPages,
      showLastPage,
    } = this;

    // Make space for "... (last page number)" if not in range of the last page.
    const showEllipsisAndLastPage =
      showLastPage && currentPage < totalPages - maxPageListLength + 1;

    const limit = showEllipsisAndLastPage
      ? maxPageListLength - 2
      : maxPageListLength;

    let end;
    let start;

    // If there are more pages returned than the limit to show
    // cap the upper range at limit + the page number.
    if (totalPages > limit) {
      start = currentPage;
      end = limit + currentPage;
      // treat the last pages specially
      if (start >= totalPages - limit + 1) {
        start = totalPages - limit + 1;
        end = totalPages + 1;
      }
    } else {
      start = 1;
      end = totalPages + 1;
    }
    return Array.from({ length: end - start }, (_, i) => i + start);
  }

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
      const path = `${getAssetPath('/assets/sprite.svg')}#${icon}`;
      // eslint-disable-next-line i18next/no-literal-string
      return `<svg
      class="usa-icon"
      aria-hidden="true"
      role="img">
        <use href=${path}></use>
      </svg>`;
    }

    const prevIconDiv = this.el.shadowRoot?.querySelector("#previous-arrow-icon");
    if (prevIconDiv) {
      prevIconDiv.innerHTML = makeSvgString('navigate_before');
    }

    const nextIconDiv = this.el.shadowRoot?.querySelector("#next-arrow-icon");
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
    const { ariaLabelSuffix, page, pages, maxPageListLength, showLastPage, uswds } =
      this;

    if (pages === 1) {
      return <div />;
    }

    const previousAriaLabel = ariaLabelSuffix ? `Previous page ${ariaLabelSuffix}` : 'Previous page';
    const nextAriaLabel = ariaLabelSuffix ? `Next page ${ariaLabelSuffix}` : 'Next page';
    const lastPageAriaLabel = ariaLabelSuffix ? `Page ${pages} ${ariaLabelSuffix}` : `Page ${pages}`;
    if (uswds) {
      const pageNumbersToRender = this.pageNumbersUswds();
      const itemClasses = classnames({
        'usa-pagination__item': true,
        'usa-pagination__page-no': true
      });
      const ellipsisClasses = classnames({
        'usa-pagination__item': true,
        'usa-pagination__overflow': true
      });
      const arrowClasses = classnames({
        'usa-pagination__item': true,
        'usa-pagination__arrow': true
      });

      const previousButton = page > 1
        ?
        <Fragment>
          <li class={arrowClasses} aria-label={previousAriaLabel}>
            <a
              onClick={() => this.handlePageSelect(page - 1, 'nav-paginate-number')}
              onKeyDown={e => this.handleKeyDown(e, page - 1)}
              class="usa-pagination__link usa-pagination__previous-page"
              href="javascript:void(0)"
            >
              <div id="previous-arrow-icon"></div>
              <span class="usa-pagination__link-text">{i18next.t('previous')}</span>
            </a>
          </li>
          {!pageNumbersToRender.includes(1) &&
          <Fragment>
            <li class={itemClasses}>
              <a
                onClick={() => this.handlePageSelect(1, 'nav-paginate-number')}
                onKeyDown={e => this.handleKeyDown(e, 1)}
                href="javascript:void(0)"
                class="usa-pagination__button">1</a>
            </li>
            <li class={ellipsisClasses} aria-label="ellipsis indicating non-visible pages">
              <span>...</span>
            </li>
          </Fragment>}
        </Fragment>
        : null;

      const renderPages = pageNumbersToRender.map(pageNumber => {
        const anchorClasses = classnames({
          'usa-pagination__button': true,
          'usa-current': page === pageNumber
        })

        return (
          <li class={itemClasses}>
            <a
              onClick={() => this.handlePageSelect(pageNumber, 'nav-paginate-number')}
              onKeyDown={e => this.handleKeyDown(e, pageNumber)}
              href="javascript:void(0)"
              class={anchorClasses}
            >
              {pageNumber}
            </a>
          </li>
        )
      });

      const nextButton = page < pages
        ?
        <Fragment>
          {pages > this.SHOW_ALL_PAGES &&
            <li class={ellipsisClasses} aria-label="ellipsis indicating non-visible pages">
            <span>...</span>
          </li>}
          {!this.unbounded && pages > this.SHOW_ALL_PAGES &&
          <li class={itemClasses}>
              <a
                onClick={() => this.handlePageSelect(pages, 'nav-paginate-number')}
                onKeyDown={e => this.handleKeyDown(e, pages)}
                href="javascript:void(0)"
                class="usa-pagination__button"
              >
                {pages}
              </a>
          </li>}
          <li class={arrowClasses} aria-label={nextAriaLabel}>
            <a
              onClick={() => this.handlePageSelect(page + 1, 'nav-paginate-number')}
              onKeyDown={e => this.handleKeyDown(e, page + 1)}
              class="usa-pagination__link usa-pagination__next-page"
              href="javascript:void(0)"
            >
              <span class="usa-pagination__link-text">{i18next.t('next')}</span>
              <div id="next-arrow-icon"></div>
            </a>
          </li>
        </Fragment>
        : null;

      return (
        <Host>
          <nav class="usa-pagination" aria-label="Pagination">
            <ul class="usa-pagination__list">
              {previousButton}
              {renderPages}
              {nextButton}
            </ul>
          </nav>
        </Host>
      )
    } else {
      const renderPages = this.pageNumbers().map(pageNumber => {
        const pageClass = classnames({
          'button-active': page === pageNumber,
          'button-inner': true,
        });

        const pageAriaLabel = ariaLabelSuffix ? `Page ${pageNumber} ${ariaLabelSuffix}` : `Page ${pageNumber}`;

        return (
          <li>
            <button
              aria-current={page === pageNumber ? 'true' : null}
              aria-label={pageAriaLabel}
              class={pageClass}
              onClick={() =>
                this.handlePageSelect(pageNumber, 'nav-paginate-number')
              }
              onKeyDown={e => this.handleKeyDown(e, pageNumber)}
              type="button"
            >
              {pageNumber}
            </button>
          </li>
        );
      });

      return (
        <Host role="navigation" aria-label="Pagination">
          <ul class="pagination-prev">
            {/* START PREV BUTTON */}
            {this.page > 1 && (
              <li>
                <button
                  aria-label={previousAriaLabel}
                  class="button-prev"
                  onClick={() =>
                    this.handlePageSelect(this.page - 1, 'nav-paginate-previous')
                  }
                  onKeyDown={e => this.handleKeyDown(e, this.page - 1)}
                  type="button"
                >
                  Previous
                </button>
              </li>
            )}
            {/* END PREV BUTTON */}
          </ul>

          <ul class="pagination-inner">
            {renderPages}
            {/* START ELLIPSIS AND LAST BUTTON */}
            {showLastPage && page < pages - maxPageListLength + 1 && (
              <Fragment>
                <li>
                  <span>...</span>
                </li>
                <li>
                  <button
                    aria-label={lastPageAriaLabel}
                    class="button-inner"
                    onClick={() =>
                      this.handlePageSelect(pages, 'nav-paginate-number')
                    }
                    onKeyDown={e => this.handleKeyDown(e, pages)}
                    type="button"
                  >
                    {pages}
                  </button>
                </li>
              </Fragment>
            )}
            {/* END ELLIPSIS AND LAST BUTTON */}
          </ul>

          <ul class="pagination-next">
            {/* START NEXT BUTTON */}
            {this.pages > this.page && (
              <li>
                <button
                  aria-label={nextAriaLabel}
                  class="button-next"
                  onClick={() =>
                    this.handlePageSelect(this.page + 1, 'nav-paginate-next')
                  }
                  onKeyDown={e => this.handleKeyDown(e, this.page + 1)}
                  type="button"
                >
                  Next
                </button>
              </li>
            )}
            {/* END NEXT BUTTON */}
          </ul>
        </Host>
      );
    }
  }
}
