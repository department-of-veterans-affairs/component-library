import { Component, Host, h, Prop, Fragment } from '@stencil/core';
import classnames from 'classnames';

declare const window: Window &
  typeof globalThis & {
    dataLayer: any;
  };

@Component({
  tag: 'va-pagination',
  styleUrl: 'va-pagination.css',
  shadow: true,
})
export class VaPagination {
  /**
   * Fires when a page is selected
   */
  @Prop() pageSelect: any;

  /**
   * Fires when a page is selected if enable-analytics is true
   */
  @Prop() trackEvent: any;

  /**
   * Aria-label suffix text for buttons
   */
  @Prop() ariaLabelSuffix: string = '';

  /**
   * Whether or not an analytics event will be fired
   */
  @Prop() enableAnalytics: boolean = true;

  /**
   * The maximum number of pages to show at once
   */
  @Prop() maxPageListLength: number = 10;

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
  @Prop() showLastPage: boolean;

  /**
   * A class to provide additional styling to the outer container element
   */
  @Prop() className: string;

  private handleTrackEvent = (...args) => {
    if (!this.trackEvent) {
      if (!window.dataLayer) return;
      window.dataLayer.push(...args);
    } else {
      this.trackEvent(...args);
    }
  };

  private handlePageSelect = (page, eventID) => {
    this.pageSelect(page);
    if (!this.enableAnalytics) return;

    this.handleTrackEvent({
      'event': eventID,
      'paginate-page-number': page,
    });
  };

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
  };

  private handleKeyDown = (e, pageNumber) => {
    const keyCode = e.key;
    if (keyCode === 'Enter' || keyCode === ' ') {
      e.preventDefault();
      if (!pageNumber) return;
      this.handlePageSelect(pageNumber, 'nav-paginate-number');
    }
  };

  render() {
    const {
      ariaLabelSuffix,
      className,
      page,
      pages,
      maxPageListLength,
      showLastPage,
    } = this;

    if (pages === 1) {
      return <div />;
    }

    const renderPages = this.pageNumbers().map(pageNumber => {
      const pageClass = classnames({
        'button-active': page === pageNumber,
        'button-inner': true,
      });

      return (
        <li>
          <button
            aria-current={page === pageNumber ? 'true' : null}
            aria-label={`Page ${pageNumber} ${ariaLabelSuffix}`}
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
      <Host class={className ?? undefined} role="navigation">
        <ul class="pagination-prev">
          {/* START PREV BUTTON */}
          {this.page > 1 && (
            <li>
              <button
                aria-label={`Previous page ${this.ariaLabelSuffix}`}
                class="button-prev"
                onClick={() =>
                  this.handlePageSelect(this.page - 1, 'nav-paginate-previous')
                }
                onKeyDown={e => this.handleKeyDown(e, this.page - 1)}
                type="button"
              >
                Prev
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
                <button
                  aria-label="..."
                  class="button-inner"
                  onKeyDown={e => this.handleKeyDown(e, null)}
                  type="button"
                >
                  ...
                </button>
              </li>
              <li>
                <button
                  aria-label={`Load last page ${this.ariaLabelSuffix}`}
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
                aria-label={`Next page ${this.ariaLabelSuffix}`}
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
