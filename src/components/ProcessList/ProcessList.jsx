import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toWords } from 'number-to-words';

class ProcessList extends Component({ children }) {
  constructor(props) {
    super(props);
    this.handleBreadcrumbLinkClick = this.handleBreadcrumbLinkClick.bind(this);
  }
  render() {
    <div className="process schemaform-process">
      <ol>
      {this.renderBreadcrumbLinks()}
        {children.map((child, index) => (
          <li className={`process-step list-${toWords(index + 1)}`} key={index}>
            {child}
          </li>
        ))}
      </ol>
    </div>
  };
}

ProcessList.propTypes = {
  /**
   * Child elements (content)
   */
  children: PropTypes.array,
};
