import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toWords } from 'number-to-words';

export default class ProcessList extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;

    return (
      <div className="process schemaform-process">
        <ol role="list">
          {children.map((child, index) => (
            <li
              className={`process-step list-${toWords(index + 1)}`}
              key={index}
            >
              {child}
            </li>
          ))}
        </ol>
      </div>
    );
  }
}
