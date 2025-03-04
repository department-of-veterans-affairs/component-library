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

import { debounce, makeArray } from '../../utils/utils';

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
   * Will be true when va-pagination is 480 pixels or narrower
   * as measured by this.handleResizeEvent().
   */
  @State() isMobileViewport: Boolean = false;

  /**
   * Will be true when va-pagination is 640 pixels or narrower
   * as measured by this.handleResizeEvent().
   */
  @State() isTabletViewport: Boolean = false;

  /**
   * If the page total is less than or equal to this limit, show all pages.
   * The number has been reduced from 7 to 6 to show all more consistently
   * on small screens and zoomed in browser windows.
   */
  SHOW_ALL_PAGES: number = 6;

  /**
   * Mobile viewport width chosen based on USWDS "mobile-lg" spacing unit.
   * See https://designsystem.digital.gov/design-tokens/spacing-units/
   */
  MOBILE_VIEWPORT_WIDTH: number = 480;

  /**
   * Tabllet viewport width chosen based on USWDS "tablet" spacing unit.
   * See https://designsystem.digital.gov/design-tokens/spacing-units/
   */
  TABLET_VIEWPORT_WIDTH: number = 640;

  /**
   * Observe the host component so we can accurately
   * determine a mobile viewport or a zoomed in
   * browser window.
   */
  resizeObserver = new ResizeObserver(entries => {
    debounce(this.handleResizeEvent(entries));
  });

  private handleResizeEvent(entries: ResizeObserverEntry[]): void {
    const { MOBILE_VIEWPORT_WIDTH, TABLET_VIEWPORT_WIDTH } = this;

    for (let entry of entries) {
      if (entry.contentRect.width <= MOBILE_VIEWPORT_WIDTH) {
        this.isMobileViewport = true;
        this.isTabletViewport = false;
      }

      if (
        entry.contentRect.width > MOBILE_VIEWPORT_WIDTH &&
        entry.contentRect.width <= TABLET_VIEWPORT_WIDTH
      ) {
        this.isMobileViewport = false;
        this.isTabletViewport = true;
      }

      if (entry.contentRect.width > TABLET_VIEWPORT_WIDTH) {
        this.isMobileViewport = false;
        this.isTabletViewport = false;
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
      SHOW_ALL_PAGES,
    } = this;

    // Radius is half the length of the maxPageLength prop.
    // Use it as a reference from the selected page to find
    // start and end of the pages to render.
    const radius = Math.floor(maxPageListLength / 2);

    // If the unbounded flag is set we don't include the last page
    const unboundedChar = unbounded ? 0 : 1;

    let { isMobileViewport } = this;
    let start: number;
    let end: number;

    if (totalPages <= SHOW_ALL_PAGES) {
      // Use case #1: 6 or fewer pages
      console.log('Use case 1');
      return makeArray(1, totalPages);
    } else if (SHOW_ALL_PAGES < totalPages && totalPages <= maxPageListLength) {
      // Use case #2: Total pages is greater than 6 and less than or equal to
      // maxPageListLength. The logic has made affordances for max page list
      // lengths of 8 and below, and the default 10.

      start = 1;
      end = totalPages;

      switch (true) {
        case isMobileViewport &&
          maxPageListLength <= 8 &&
          currentPage <= radius:
          end = start + 3;
          break;
        case isMobileViewport && maxPageListLength <= 8 && currentPage > radius:
          start = start + 4;
          break;
        case isMobileViewport && currentPage <= radius:
          end = start + 4;
          break;
        case isMobileViewport && currentPage > radius:
          start = start + 5;
          break;
        default:
          start = 1;
          end = totalPages;
      }

      console.log('Use case 2');
      return makeArray(start, end);
    } else if (currentPage <= radius - 1) {
      // Use case #3: Current page is less than or equal to
      // half the visible pages minus one. This case always renders
      // [1] in pageNumbers array.

      start = 1;

      // End has three use cases with the isMobileViewport adjustment
      switch (true) {
        case maxPageListLength <= totalPages && isMobileViewport:
          end = maxPageListLength - 4 - unboundedChar;
          console.log('Use case 3b');
          break;
        case maxPageListLength < totalPages:
          end = maxPageListLength - 1 - unboundedChar;
          console.log('Use case 3c');
          break;
        default:
          console.log('Use case 3d');
          end = totalPages;
      }

      // Make sure the next page is showing
      if (end === currentPage) {
        end++;
      }

      return makeArray(start, end);
    } else if (currentPage + radius - 1 > totalPages) {
      // Use case #4: Current page plus radius minus one is greater than
      // than the total number of pages. This use case will appear as
      // current page gets close to the end.

      switch (true) {
        case totalPages - maxPageListLength >= 0 && isMobileViewport:
          console.log('Use case 4a');
          start = totalPages - (SHOW_ALL_PAGES - 2 - 1);
          break;
        case totalPages - maxPageListLength >= 0:
          console.log('Use case 4b');
          start = totalPages - (maxPageListLength - 2 - 1);
          break;
        default:
          start = 1;
      }

      // Make sure the previous page is showing
      if (start === currentPage) {
        start--;
      }

      // End will always be the last page
      end = totalPages;

      return makeArray(start, end);
    } else {
      // Use case #5: Continuous pages don't start at 1 or end at last page.
      // start must subtract 2 to account for showing the first page and ellipsis.
      start = currentPage - (radius - 2);
      end = currentPage + (radius - 1 - unboundedChar);

      switch (true) {
        case maxPageListLength <= 8 && isMobileViewport:
          console.log('Case 1');
          start = start + 1;
          end = end - 1;
          break;
        case maxPageListLength <= 10 && isMobileViewport:
          console.log('Case 2');
          start = start + 2;
          end = end - 2;
          break;
        case this.isTabletViewport:
          console.log('Case 3');
          start = currentPage - (radius - 3);
          end = currentPage + (radius - 2 - unboundedChar);
          break;
        default:
          console.log('Case default');
          start = currentPage - (radius - 2);
          end = currentPage + (radius - 1 - unboundedChar);
      }

      return makeArray(start, end);
    }
  };

  private handleKeyDown = (e: KeyboardEvent, pageNumber: number) => {
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

  private renderPreviousButton(
    arrowClasses: string,
    previousAriaLabel: string,
  ): JSX.Element {
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

  private renderFirstPage(
    itemClasses: string,
    ellipsisClasses: string,
  ): JSX.Element {
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
  ): Array<JSX.Element> {
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

  private renderLastPage(
    ellipsisClasses: string,
    itemClasses: string,
  ): JSX.Element {
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
  ): JSX.Element {
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
