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
  @Prop() pageSelect: (page) => void;

  /**
   * Fires when a page is selected
   */
  @Prop() trackEvent: (args) => void = (...args) => {
    if (!window.dataLayer) return;
    window.dataLayer.push(...args);
  };

  /**
   * TODO
   */
  @Prop() ariaLabelSuffix: string = ''; // might not need a default value here

  /**
   * TODO
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
   * Whether or not to show the last page number when the page count exceeds
   * `maxPageListLength`
   */
  @Prop() showLastPage: boolean = false;

  private handlePageSelect = (page, eventID) => {
    console.log({ page });
    // this.page = page;
    this.pageSelect(page);

    if (!this.enableAnalytics) return;

    this.trackEvent({
      'event': eventID,
      'paginate-page-number': page,
    });
  };

  private pageNumbers() {
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

  private handleKeyDown(e, pageNumber) {
    const keyCode = e.key;
    if (keyCode === 'Enter' || keyCode === ' ') {
      e.preventDefault();
      if (!pageNumber) return;
      this.handlePageSelect(pageNumber, 'nav-paginate-number');
    }
  }

  render() {
    const {
      ariaLabelSuffix,
      // className,
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
            key={pageNumber}
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
      <Host>
        <nav>
          <ul>
            {/* START PREV BUTTON */}
            {this.page > 1 && (
              <li>
                <button
                  aria-label={`Previous page ${this.ariaLabelSuffix}`}
                  class="button-prev"
                  onClick={() =>
                    this.handlePageSelect(
                      this.page - 1,
                      'nav-paginate-previous',
                    )
                  }
                  onKeyDown={e => this.handleKeyDown(e, this.page - 1)}
                  type="button"
                >
                  Prev
                </button>
              </li>
            )}
            {/* END PREV BUTTON */}

            <div class="pagination-inner">{renderPages}</div>

            {/* START ELLIPSIS AND LAST BUTTON */}
            {showLastPage && page < pages - maxPageListLength + 1 && (
              <Fragment>
                <li>
                  <button
                    aria-label="..."
                    onKeyDown={e => this.handleKeyDown(e, null)}
                    type="button"
                  >
                    ...
                  </button>
                </li>
                <li>
                  <button
                    aria-label={`Load last page ${this.ariaLabelSuffix}`}
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

            {/* START NEXT BUTTON */}
            {this.pages > this.page && (
              <li class="pagination-next">
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
        </nav>
      </Host>
    );
  }
}
