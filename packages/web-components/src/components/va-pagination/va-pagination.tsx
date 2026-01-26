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
   * The current page number
   */
  @Prop() page: number;

  /**
   * The total number of pages
   */
  @Prop() pages: number;

  /**
   * Don't show the last page if the unbounded flag is set
   */
  @Prop() unbounded?: boolean = false;

  /**
   * Max number of pages based on USWDS guidance for pagination:
   * See https://designsystem.digital.gov/components/pagination/#behaviors
   */
  SHOW_ALL_PAGES: number = 7;

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
      page: currentPage,
      pages: totalPages,
      unbounded,
      SHOW_ALL_PAGES,
    } = this;

    // Radius is fixed at 5 to account for USWDS guidance there
    // should be no more than 7 pagination "slots" on the page
    // at one time. 5 reduces the logic to three configurations:
    // first, last, middle, with respect to ellipses.
    const radius = 5;

    // Account for the unbounded flag in start and end numbering
    const unboundedChar = unbounded ? 0 : 1;

    let start: number;
    let end: number;

    if (totalPages <= SHOW_ALL_PAGES) {
      // Use case #1: 7 or fewer total pages
      return makeArray(1, totalPages);
    } else if (currentPage <= radius - 1) {
      // Use case #2: Current page is less than or equal to 4
      start = 1;
      end = start + SHOW_ALL_PAGES - 2 - unboundedChar;

      // Make sure the next page is showing
      if (end === currentPage) {
        end++;
      }

      return makeArray(start, end);
    } else if (currentPage + radius - 1 > totalPages) {
      // Use case #3: Current page plus 4 is greater than total pages
      start = totalPages - (SHOW_ALL_PAGES - 2 - 1);

      // Make sure the previous page is showing
      if (start === currentPage) {
        start--;
      }

      // End will always be the last page
      end = totalPages;

      return makeArray(start, end);
    } else {
      // Use case #4: Continuous pages don't start at 1 or end at last page
      start = currentPage - 1;
      end = unbounded ? currentPage + 2 : currentPage + 1;

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


  connectedCallback() {
    i18next.on('languageChanged', () => {
      forceUpdate(this.el);
    });
  }

  disconnectedCallback() {
    i18next.off('languageChanged');
  }

  private renderPreviousButton(
    arrowClasses: string,
    previousAriaLabel: string,
  ): JSX.Element {
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
          <va-icon icon="navigate_before" />
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
            aria-label={`1 of ${this.pages} pages, first page`}
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
        /* eslint-disable-next-line i18next/no-literal-string */
        ? `${pageNumber} of ${this.pages} pages ${ariaLabelSuffix}`
        /* eslint-disable-next-line i18next/no-literal-string */
        : `${pageNumber} of ${this.pages} pages`;

      if (pageNumber === 1) {
        /* eslint-disable-next-line i18next/no-literal-string */
        pageAriaLabel = `1 of ${this.pages} pages, first page`;
      }

      if (pageNumber === this.pages) {
        /* eslint-disable-next-line i18next/no-literal-string */
        pageAriaLabel = `${pageNumber} of ${this.pages} pages, last page`;
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
            aria-label={`${this.pages} of ${this.pages} pages, last page`}
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
          <va-icon icon="navigate_next" />
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
