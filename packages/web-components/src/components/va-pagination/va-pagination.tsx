import {
  Component,
  Event,
  EventEmitter,
  Fragment,
  Host,
  h,
  Prop,
  State,
  Element,
  forceUpdate,
  getAssetPath,
} from '@stencil/core';
import classnames from 'classnames';
import { i18next } from '../..';
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
   * Will be true when va-pagination is 641 pixes or wider
   * as measured by this.handleResizeEvent().
   */
  @State() isMobileViewport: Boolean = false;

  /**
   * Local state to manage max page numbers on small screens
   * and zoomed layouts. Six seems to be the sweet spot, so we will
   * use that as a magic number on mobile viewports where two ellises
   * are required.
   */
  @State() maxPageListLengthState: number = this.maxPageListLength;

  /**
   * If the page total is less than or equal to this limit, show all pages.
   * The number has been reduced from 7 to 6 to show all more consistently
   * on small screens and zoomed in browser windows.
   */
  SHOW_ALL_PAGES: number = 6;

  /**
   * Small pagination width chosen based on USWDS "tablet" spacing unit.
   * See https://designsystem.digital.gov/design-tokens/spacing-units/
   */
  SMALL_PAGINATION_WIDTH: number = 640;

  /**
   * Observe the host component so we can accurately
   * determine a mobile viewport or a zoomed in
   * browser window.
   */
  resizeObserver = new ResizeObserver(entries => {
    this.handleResizeEvent(entries);
  });

  private handleResizeEvent(entries: ResizeObserverEntry[]): void {
    // TODO: Add a debounce?
    const { SMALL_PAGINATION_WIDTH } = this;

    for (let entry of entries) {
      if (entry.contentRect.width <= SMALL_PAGINATION_WIDTH) {
        this.isMobileViewport = true;
      }

      if (entry.contentRect.width > SMALL_PAGINATION_WIDTH) {
        this.isMobileViewport = false;
      }
    }
  }

  private handlePageSelect = (page: number, eventID: string) => {
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

    // Radius is half the length of the visible pages
    const radius = Math.floor(maxPageListLength / 2);

    // If the unbounded flag is set we don't include the last page
    const unboundedChar = unbounded ? 0 : 1;

    let { isMobileViewport, maxPageListLengthState, SHOW_ALL_PAGES } = this;
    let start: number;
    let end: number;

    // The smallest breakpoint can show at most 6 pages, including ellipses
    if (isMobileViewport) maxPageListLengthState = SHOW_ALL_PAGES;

    // Use cases
    if (totalPages <= this.SHOW_ALL_PAGES) {
      // Use case #1 - 6 or less total pages.
      // This use case will override all other functions.

      return makeArray(1, totalPages);
    } else if (currentPage <= radius + 1) {
      // Use case #2 - Current page is less than radius + 1.
      // This use case always renders [1] in pageNumbers array.

      start = 1;
      end =
        maxPageListLengthState >= totalPages
          ? totalPages
          : maxPageListLengthState - 1 - unboundedChar;

      // Make sure the next page is showing
      if (end === currentPage) {
        end++;
      }

      return makeArray(start, end);
    } else if (currentPage + radius >= totalPages) {
      // Use case #3 - Current page is greater than radius
      start =
        totalPages - maxPageListLengthState > 0
          ? // Subtract 2 to account for having to add ellipsis and first page
            totalPages - (maxPageListLengthState - 2 - 1)
          : 1;
      end = totalPages;

      // Make sure the previous page is showing
      if (start === currentPage) {
        start--;
      }

      return makeArray(start, end);
    } else {
      // Use case #4 - Continuous pages don't start at 1 or end at last page.
      // start must subtract 2 to account for showing the first page and ellipsis.
      start = currentPage - (radius - 2);

      // Assume end is the last page
      if (currentPage + radius > totalPages) {
        end = totalPages;
      } else {
        // Assume end is not the last page. Subtract 1 to account for showing the
        // ellipsis and subtract another 1 if showing the last page (unbounded = false).
        end = currentPage + (radius - 1 - unboundedChar);
      }

      if (this.isMobileViewport) {
        // Reduce the middle range to ensure first, last, and ellipses don't overflow
        start = start + 2;
        end = end - 2;
      }

      return makeArray(start, end);
    }
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
    this.resizeObserver.observe(this.el);
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
    this.resizeObserver.disconnect();
  }

  /**
   * =========================================
   * Pagination render functions
   * =========================================
   */
  private renderPreviousButton(
    arrowClasses: string,
    previousAriaLabel: string,
  ): void {
    // Skip rendering if the viewport is too narrow to show Previous button
    if (this.isMobileViewport) return null;

    // No previous page
    if (this.page === 1) return null;

    return (
      <li class={arrowClasses}>
        <a
          aria-label={previousAriaLabel}
          onClick={() =>
            this.handlePageSelect(this.page - 1, 'nav-paginate-number')
          }
          onKeyDown={e => this.handleKeyDown(e, this.page - 1)}
          class="usa-pagination__link usa-pagination__previous-page"
          href="javascript:void(0)"
        >
          <div id="previous-arrow-icon"></div>
          <span class="usa-pagination__link-text">{i18next.t('previous')}</span>
        </a>
      </li>
    );
  }

  private renderFirstPage(itemClasses: string, ellipsisClasses: string): void {
    // Return early if [1] is in the pageNumbers array.
    // This also prevents the first ellipsis being rendered.
    if (this.pageNumbers().includes(1)) return null;

    return (
      <Fragment>
        <li class={itemClasses}>
          <a
            onClick={() => this.handlePageSelect(1, 'nav-paginate-number')}
            onKeyDown={e => this.handleKeyDown(e, 1)}
            href="javascript:void(0)"
            class="usa-pagination__button"
            aria-label="page 1, first page"
          >
            1
          </a>
        </li>
        <li class={ellipsisClasses}>
          <span class="usa-sr-only">Ellipsis indicating non-visible pages</span>
          <span aria-hidden="true">…</span>
        </li>
      </Fragment>
    );
  }

  private renderMiddlePages(
    ariaLabelSuffix: string,
    itemClasses: string,
  ): Array<number> {
    const renderedMiddlePages = this.pageNumbers().map(pageNumber => {
      const anchorClasses = classnames({
        'usa-pagination__button': true,
        'usa-current': this.page === pageNumber,
      });

      let pageAriaLabel = ariaLabelSuffix
        ? `page ${pageNumber} ${ariaLabelSuffix}`
        : `page ${pageNumber}`;

      if (pageNumber === 1) {
        pageAriaLabel = `${pageAriaLabel}, first page`;
      }

      if (pageNumber === this.pages) {
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
            aria-current={this.page === pageNumber ? 'page' : null}
            aria-label={pageAriaLabel}
          >
            {pageNumber}
          </a>
        </li>
      );
    });

    return renderedMiddlePages;
  }

  private renderLastPage(ellipsisClasses: string, itemClasses: string): void {
    // Last page has already been rendered with renderMiddlePages
    if (this.pageNumbers().includes(this.pages)) return null;

    let lastEllipsis = null;
    let lastPageButton = null;

    if (this.pages > this.SHOW_ALL_PAGES) {
      lastEllipsis = (
        <li class={ellipsisClasses}>
          <span class="usa-sr-only">Ellipsis indicating non-visible pages</span>
          <span aria-hidden="true">…</span>
        </li>
      );
    }

    if (!this.unbounded && this.pages > this.SHOW_ALL_PAGES) {
      lastPageButton = (
        <li class={itemClasses}>
          <a
            onClick={() =>
              this.handlePageSelect(this.pages, 'nav-paginate-number')
            }
            onKeyDown={e => this.handleKeyDown(e, this.pages)}
            href="javascript:void(0)"
            class="usa-pagination__button"
            aria-label={`page ${this.pages}, last page`}
          >
            {this.pages}
          </a>
        </li>
      );
    }

    return (
      <Fragment>
        {lastEllipsis}
        {lastPageButton}
      </Fragment>
    );
  }

  private renderNextPageButton(
    arrowClasses: string,
    nextAriaLabel: string,
  ): void {
    // Skip rendering if the viewport is too narrow to show Next button
    if (this.isMobileViewport) return null;

    // Return early if we're on the last page or current page was entered incorrectly
    if (this.page >= this.pages) return null;

    return (
      <li class={arrowClasses}>
        <a
          aria-label={nextAriaLabel}
          onClick={() =>
            this.handlePageSelect(this.page + 1, 'nav-paginate-number')
          }
          onKeyDown={e => this.handleKeyDown(e, this.page + 1)}
          class="usa-pagination__link usa-pagination__next-page"
          href="javascript:void(0)"
        >
          <span class="usa-pagination__link-text">{i18next.t('next')}</span>
          <div id="next-arrow-icon"></div>
        </a>
      </li>
    );
  }
  /**
   * =========================================
   * End pagination render functions
   * =========================================
   */

  render() {
    const { ariaLabelSuffix, pages } = this;

    // Return early if there's no need to render pagination
    if (pages === 1) return null;

    const previousAriaLabel = ariaLabelSuffix
      ? `Previous page ${ariaLabelSuffix}`
      : 'Previous page';

    const nextAriaLabel = ariaLabelSuffix
      ? `Next page ${ariaLabelSuffix}`
      : 'Next page';

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

    return (
      <Host>
        <nav class="usa-pagination" aria-label="Pagination">
          <ul class="usa-pagination__list">
            {this.renderPreviousButton(arrowClasses, previousAriaLabel)}
            {this.renderFirstPage(itemClasses, ellipsisClasses)}
            {this.renderMiddlePages(ariaLabelSuffix, itemClasses)}
            {this.renderLastPage(ellipsisClasses, itemClasses)}
            {this.renderNextPageButton(arrowClasses, nextAriaLabel)}
          </ul>
        </nav>
      </Host>
    );
  }
}
