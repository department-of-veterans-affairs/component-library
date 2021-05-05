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
   * @returns Options
   */
  private checkValidation = () => {
    const opts = {
      current: this.currentPage < 1 ? 1 : this.currentPage,
      total: this.total < 1 ? 1 : this.total,
      edges: this.edges < 0 ? 0 : this.edges,
      visible: this.maxVisible,
    }
    if (opts.current > opts.total) {
      opts.current = opts.total;
    }
    // Set to a max of 3 to match the default of 9 maxVisible. We probably
    // wouldn't want to show more than 3 edge pages anyway. It would get really
    // messy on small screens
    if (opts.edges > 3) {
      opts.edges = 3;
    }
    // edges * 2 + 2 ellipsis + 1 visible active link in the middle
    let minVisible = opts.edges * 2 + 2 + 1;
    if (minVisible > opts.total) {
      minVisible = opts.total;
    }
    if (minVisible > opts.visible) {
      opts.visible = minVisible;
    }
    return opts;
  }

  /**
   * Set current page state & emit pageSelect event
   * @param page - user selected page
   */
  private onPageSelected = (page: number) => {
    this.currentPage = page;
    this.pageSelect.emit(page);
  };

  /**
   * Key down event handler - this allows the user to hold down the key to
   * quickly navigate through the pages
   * @param key - event.key
   * @param page - page associated with the interaction
   */
  private handleKeyDown = (key: string, page: number) => {
    const activate = ['Enter', ' ', 'Spacebar' /* IE11 */];
    if (activate.includes(key)) {
      this.onPageSelected(page);
    }
  };

  /**
   * Return common link properties
   * @param page - page associated with the link
   * @param current - "page" indicates that the link is for the current page
   *   otherwise set to null so the attribute isn't included
   * @param className - custom link class
   */
  private getLinkProps = ({
    page,
    current = '',
    className = '',
  }) => ({
    href: '#',
    class: className,
    'data-page': page,
    'aria-label': (this.linkAriaLabel || '').replace(/\{page\}/g, page),
    'aria-current': current ? 'page' : null,
    onClick: (event: MouseEvent) => {
      event.preventDefault();
      this.currentPage = page;
      this.onPageSelected(page);
    },
    onKeyDown: (event: KeyboardEvent) => this.handleKeyDown(event.key, page)
  });

  /**
   * Add previous link. Renders a span when there is no previous page to
   * navigate to
   * @param Options
   * @returns {JSX} previous link
   */
  private addPrevLink = ({ current }) => {
    const prevPage = current - 1 >= 1 ? current - 1 : null;
    const content = (
      <Fragment>
        <span class="vads-u-visibility--screen-reader">Previous</span>
        <span aria-hidden="true">{'\u2039\u00a0\u00a0'}
          <span class="hide-narrow">Prev</span>
        </span>
      </Fragment>
    );
    if (prevPage === null) {
      return <li aria-hidden="true"><span class="prev">{content}</span></li>;
    }
    const props = this.getLinkProps({
      page: prevPage,
      className: 'prev',
    });
    return <li><a {...props}>{content}</a></li>;
  };

    /**
   * Add next link. Renders a span when there is no next page to navigate to
   * @param Options
   * @returns {JSX} next link
   */
  private addNextLink = ({ current, total }) => {
    const nextPage = current + 1 <= total
      ? current + 1
      : null;
    const content = (
      <Fragment>
        <span class="hide-narrow">Next</span>
        {'\u00a0\u00a0\u203a'}
      </Fragment>
    );
    if (nextPage === null) {
      return <li aria-hidden="true"><span class="next">{content}</span></li>;
    }
    const props = this.getLinkProps({
      page: nextPage,
      className: 'next',
    });
    return <li><a {...props}>{content}</a></li>;
  };

  /**
   * Add ellipsis separator
   * @returns {JSX} ellipsis separator
   */
  private addEllipsis = () =>
    <li aria-hidden="true">
      <span class='ellipsis'>{'\u2026'}</span>
    </li>;

  /**
   * Build page links
   * @param index - Current page index to build 
   * @param Options
   * @returns {JSX} page link
   */
  private buildLink = (index: number, { current, total }) => {
    let page = index + 1;
    if (page < 1) {
      page = 1;
    } else if (page >= total) {
      page = total;
    }
    const isCurrent = page === current;
    const props = this.getLinkProps({
      page,
      current: isCurrent ? 'page' : '',
      className: `va-pagination-link ${isCurrent ? 'va-pagination-active' : ''}`,
    });
    return (
      <li class={isCurrent ? 'va-pagination-current' : null}>
        <a {...props}>{page}</a>
      </li>
    );
  };

  /**
   * Calculates and build visible pages
   * @param Options
   * @returns {JSX} all visible page links
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
        pages.push(this.buildLink(index, { current, total }));
      }
      if (edges < start && (start - edges !== 1)) {
        pages.push(this.addEllipsis());
      } else if (start - edges === 1) {
        pages.push(this.buildLink(edges, { current, total }));
      }
    }

    // build middle links
    for (index = start; index < end; index++) {
      pages.push(this.buildLink(index, { current, total }));
    }

    // build ellipsis & ending edge links
    if (end < total && edges > 0) {
      if (
        total - edges > end &&
        (total - edges - end !== 1)
      ) {
        pages.push(this.addEllipsis());
      } else if (total - edges - end === 1) {
        pages.push(this.buildLink(end, { current, total }));
      }
      for (
        index = Math.max(total - edges, end);
        index < total;
        index++
      ) {
        pages.push(this.buildLink(index, { current, total }));
      }
    }
    return pages;
  };

  render() {
    const opts = this.checkValidation();
    return (
      <nav aria-label="pagination">
        <ul>
          {this.addPrevLink(opts)}
          {this.buildPager(opts)}
          {this.addNextLink(opts)}
        </ul>
      </nav>
    );
  };
};
