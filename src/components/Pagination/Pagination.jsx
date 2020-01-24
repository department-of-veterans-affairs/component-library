// Node modules.
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import range from 'lodash/range';

class Pagination extends Component {
  static propTypes = {
    ariaLabelSuffix: PropTypes.string,
    className: PropTypes.string,
    maxPageListLength: PropTypes.number.isRequired,
    onPageSelect: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    pages: PropTypes.number.isRequired,
    showLastPage: PropTypes.bool,
  };

  static defaultProps = {
    ariaLabelSuffix: '',
    maxPageListLength: 10,
  };

  next = () => {
    let nextPage;
    if (this.props.pages > this.props.page) {
      nextPage = (
        <a
          aria-label={`Load next page ${this.props.ariaLabelSuffix}`}
          onClick={() => {this.props.onPageSelect(this.props.page + 1);}}
          onKeyDown={e => this.handleKeyDown(e, this.props.page + 1)}
          tabIndex="0">
          Next
        </a>
      );
    }
    return nextPage;
  }

  prev = () => {
    let prevPage;
    if (this.props.page > 1) {
      prevPage = (
        <a
          aria-label={`Load previous page ${this.props.ariaLabelSuffix}`}
          onClick={() => {this.props.onPageSelect(this.props.page - 1);}}
          onKeyDown={e => this.handleKeyDown(e, this.props.page - 1)}
          tabIndex="0">
          <abbr title="Previous">Prev</abbr>
        </a>
      );
    }
    return prevPage;
  }

  last = () => {
    const {
      maxPageListLength,
      page: currentPage,
      pages: totalPages,
      showLastPage
    } = this.props;

    let lastPage;
    if (showLastPage && currentPage < totalPages - maxPageListLength + 1) {
      lastPage = (
        <span>
          <a aria-label="...">
            ...
          </a>
          <a aria-label={`Load last page ${this.props.ariaLabelSuffix}`} onClick={() => {this.props.onPageSelect(totalPages);}}>
            {totalPages}
          </a>
        </span>
      );
    }
    return lastPage;
  }

  pageNumbers = () => {
    const {
      maxPageListLength,
      page: currentPage,
      pages: totalPages,
      showLastPage
    } = this.props;

    // Make space for "... (last page number)" if not in range of the last page.
    const showEllipsisAndLastPage =
      showLastPage &&
      currentPage < totalPages - maxPageListLength + 1;

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

    return range(start, end);
  }

  handleKeyDown = (e, pageNumber) => {

    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 || keyCode === 32) {
      e.preventDefault();
      this.props.onPageSelect(pageNumber)
    }
  }

  render() {
    const { ariaLabelSuffix, className, onPageSelect, page, pages } = this.props;

    // Do not render if there's only 1 page.
    if (pages === 1) {
      return <div/>;
    }

    const pageList = this.pageNumbers().map((pageNumber) => {
      const pageClass = classNames({
        'va-pagination-active': page === pageNumber
      });

      return (
        <a
          key={pageNumber}
          className={pageClass}
          aria-label={`Load page ${pageNumber} ${ariaLabelSuffix}`}
          onClick={() => onPageSelect(pageNumber)}
          onKeyDown={e => this.handleKeyDown(e, pageNumber)}
          tabIndex="0">
          {pageNumber}
        </a>
      );
    });

    return (
      <div className={classNames({
        'va-pagination': true,
        [className]: className,
      })}>
        <span className="va-pagination-prev">{this.prev()}</span>
        <div className="va-pagination-inner">
          {pageList} {this.last()}
        </div>
        <span className="va-pagination-next">{this.next()}</span>
      </div>
    );
  }
}

export default Pagination;
