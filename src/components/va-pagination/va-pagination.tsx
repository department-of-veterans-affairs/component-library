import {
  Component,
  Prop,
  State,
  Event,
  EventEmitter,
  Fragment,
  h,
} from '@stencil/core';

/**
 * Pagination is a component that displays a list of links that allow paging
 * through results
 * 
 * ## Accessibility
 * - The component has a wrapping `<nav>` with `aria-label="pagination"` included
 * - Links inside of a `<ul>` list
 * - Includes `aria-current="page"` on the current page link
 */
@Component({
  tag: 'va-pagination',
  styleUrl: 'va-pagination.css',
  scoped: true,
})
export class VaPagination {
  /**
   * This event is fired when a pagination link is selected
   */
  @Event({
    bubbles: true
  })
  pageSelect: EventEmitter;

  /**
   * The current page number
   */
  @Prop({ reflect: true }) page: number = 1;
  /**
   * The total number of pages
   */
  @Prop() total: number = 1;
  /**
   * Number of pages to show on the edges; maxes out at 3
   */
  @Prop() edges: number = 1;
  /**
   * The maximum number of pages to show at once. This includes the 2 edges & 2
   * ellipsis even when not visible. Best if this is an odd number to maintain
   * symmetry
   */
   @Prop() maxVisible: number = 9;
  /**
   * Text added to aria-labels. Any included `{page}` will be replaced with the
   * associated page number
   */
  @Prop() linkAriaLabel: string = 'Load page {page}';

  @State() currentPage: number = this.page;

  /**
   * Clamped props passed to functions
   * @typedef Options
   * @property {number} current - current page
   * @property {number} total - total pages
   * @property {number} edges - pages around first & last page
   * @property {number} visible - max number of visible pages
   */
  /**
   * Validate settings & return clamped results
   */
  private checkValidation = () => {
    const total = Math.max(this.total, 1);
    const current = Math.min(Math.max(this.currentPage, 1), total);

    // Set to a max of 3 to match the default of 9 maxVisible. We probably
    // wouldn't want to show more than 3 edge pages anyway. It would get really
    // messy on small screens
    const edges = Math.min(Math.max(this.edges, 0), 3);

    // edges * 2 + 2 ellipsis + 1 visible active link in the middle
    const minVisible = Math.min(edges * 2 + 2 + 1, total);
    const visible = Math.max(this.maxVisible, minVisible);

    return { total, current, edges, visible };
  }

  /**
   * Set current page state & emit pageSelect event
   */
  private onPageSelected = (page: number) => {
    this.currentPage = page;
    this.pageSelect.emit(page);
  };

  /**
   * Return common link properties
   */
  private getLinkProps = ({ page, current = false, className = '' }) => ({
    href: '#',
    class: className,
    'aria-label': (this.linkAriaLabel || '').replace(/\{page\}/g, page),
    'aria-current': current ? 'page' : null,
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      this.currentPage = page;
      this.onPageSelected(page);
    },
  });

  
  /**
   * Add ellipsis separator
   */
  private addEllipsis = () =>
   <li aria-hidden="true">
     <span class='ellipsis'>{'\u2026'}</span>
   </li>;

  /**
   * Build end (prev or next) link. Renders a span when there is no next page to
   * navigate to
   */
  private buildEndLink = (className: string|null, page: number) => {
    const isNext = className === 'next';
    const content = (
      <Fragment>
        <span class="vads-u-visibility--screen-reader">
          {isNext ? 'Next' : 'Previous'}
        </span>
        {!isNext && <span aria-hidden="true">{'\u2039\u00a0\u00a0'}</span>}
        <span class="hide-narrow">{isNext ? 'Next' : 'Prev'}</span>
        {isNext && <span aria-hidden="true">{'\u00a0\u00a0\u203a'}</span>}
      </Fragment>
    );
    return page ? (
      <li><a {...this.getLinkProps({ className, page })}>{content}</a></li>
    ) : (
      <li aria-hidden="true"><span class={className}>{content}</span></li>
    );
  };

  /**
   * Build page links
   */
  private buildLink = (index: number, current: number, total: number) => {
    let page = index + 1;
    if (page < 1) {
      page = 1;
    } else if (page >= total) {
      page = total;
    }
    const isCurr = page === current;
    const props = this.getLinkProps({
      page,
      current: isCurr,
      className: `va-pagination-link ${isCurr ? 'va-pagination-active' : ''}`,
    });
    return (
      <li class={isCurr ? 'va-pagination-current' : null}>
        <a {...props}>{page}</a>
      </li>
    );
  };

  /**
   * Calculates and build visible pages
   */
  private buildPager = ({ current, total, edges, visible }) => {
    let index : number;
    const pages = [];

    // max length - 2 edges - 2 ellipsis
    const display = visible - (edges * 2) - 2;

    const half = display / 2;
    const start = Math.floor(
      current > half
        ? Math.max(Math.min(current - half, total - display), 0)
        : 0
    );
    const end = Math.floor(
      current > half
        ? Math.min(current + half, total)
        : Math.min(display, total)
    );

    // build start edge links & add ellipsis
    if (start > 0 && edges > 0) {
      for (index = 0; index < Math.min(edges, start); index++) {
        pages.push(this.buildLink(index, current, total));
      }
      if (edges < start && (start - edges !== 1)) {
        pages.push(this.addEllipsis());
      } else if (start - edges === 1) {
        pages.push(this.buildLink(edges, current, total));
      }
    }

    // build middle links
    for (index = start; index < end; index++) {
      pages.push(this.buildLink(index, current, total));
    }

    // build ellipsis & ending edge links
    if (end < total && edges > 0) {
      if (
        total - edges > end &&
        (total - edges - end !== 1)
      ) {
        pages.push(this.addEllipsis());
      } else if (total - edges - end === 1) {
        pages.push(this.buildLink(end, current, total));
      }
      for (
        index = Math.max(total - edges, end);
        index < total;
        index++
      ) {
        pages.push(this.buildLink(index, current, total));
      }
    }
    return pages;
  };

  render() {
    const opts = this.checkValidation();
    const prevPage = opts.current - 1 >= 1 ? opts.current - 1 : null;
    const nextPage = opts.current + 1 <= opts.total ? opts.current + 1 : null;
    return (
      <nav aria-label="pagination">
        <ul>
          {this.buildEndLink('prev', prevPage)}
          {this.buildPager(opts)}
          {this.buildEndLink('next', nextPage)}
        </ul>
      </nav>
    );
  };
};
