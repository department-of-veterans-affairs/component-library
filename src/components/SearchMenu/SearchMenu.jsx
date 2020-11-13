import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

import IconSearch from '../IconSearch/IconSearch';
import DropDownPanel from '../DropDownPanel/DropDownPanel';

class SearchMenu extends React.Component {
  constructor(props) {
    super(props);
    this.searchFieldRef = React.createRef();
  }

  componentDidUpdate() {
    this.searchFieldRef.current.focus();
  }

  toggleSearchForm = () => {
    this.props.clickHandler();
  };

  makeForm = () => (
    <form
      acceptCharset="UTF-8"
      action="https://search.vets.gov/search"
      id="search"
      method="get"
    >
      <div className="csp-inline-patch-header">
        <input name="utf8" type="hidden" value="&#x2713;" />
      </div>
      <input
        id="affiliate"
        name="affiliate"
        type="hidden"
        value="vets.gov_search"
      />
      <label htmlFor="query" className="usa-sr-only">
        Search:
      </label>

      <div className="va-flex">
        <input
          autoComplete="off"
          ref={this.searchFieldRef}
          className="usagov-search-autocomplete"
          id="query"
          name="query"
          type="text"
        />
        <button type="submit">
          <IconSearch color="#fff" role="presentation" />
          <span className="usa-sr-only">Search</span>
        </button>
      </div>
    </form>
  );

  render() {
    const buttonClasses = classNames(
      this.props.cssClass,
      'va-btn-withicon',
      '',
    );

    const icon = <IconSearch color="#fff" role="presentation" />;

    return (
      <DropDownPanel
        buttonText="Search"
        clickHandler={this.props.clickHandler}
        cssClass={buttonClasses}
        id="searchmenu"
        icon={icon}
        isOpen={this.props.isOpen}
      >
        {this.makeForm()}
      </DropDownPanel>
    );
  }
}

SearchMenu.propTypes = {
  /**
   * CSS class for the search menu
   */
  cssClass: PropTypes.string,
  /**
   * Whether the search menu is open
   */
  isOpen: PropTypes.bool,
  /**
   * Handler for when the menu is clicked
   */
  clickHandler: PropTypes.func,
};

export default SearchMenu;
