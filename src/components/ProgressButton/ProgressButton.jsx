import PropTypes from 'prop-types';
import React from 'react';
import { uniqueId } from 'lodash';

/**
 * A component for the continue button to navigate through panels of questions.
 */

class ProgressButton extends React.Component {
  UNSAFE_componentWillMount() {
    this.id = uniqueId();
  }

  render() {
    const beforeText = this.props.beforeText ? (
      <span className="button-icon" aria-hidden="true">
        {this.props.beforeText}
        &nbsp;
      </span>
    ) : (
      ''
    );
    const afterText = this.props.afterText ? (
      <span className="button-icon" aria-hidden="true">
        &nbsp;
        {this.props.afterText}
      </span>
    ) : (
      ''
    );

    const className =
      [this.props.buttonClass, this.props.disabled ? 'usa-button-disabled' : '']
        .filter(Boolean)
        .join(' ') || null;

    return (
      <button
        type={this.props.submitButton ? 'submit' : 'button'}
        disabled={this.props.disabled}
        className={className}
        id={`${this.id}-continueButton`}
        onClick={this.props.onButtonClick}
        aria-label={this.props.ariaLabel || null}
        aria-describedby={this.props.ariaDescribedby || null}
      >
        {beforeText}
        {this.props.buttonText}
        {afterText}
      </button>
    );
  }
}

ProgressButton.propTypes = {
  /**
   * Function called when the button is clicked.
   */
  onButtonClick: PropTypes.func,

  /**
   * The text on the button
   */
  buttonText: PropTypes.string.isRequired,

  /**
   * CSS class(es) to apply to the button
   */
  buttonClass: PropTypes.string,

  /**
   * A character to appear before the button text. This is wrapped in a `span.button-icon`.
   */
  beforeText: PropTypes.string,

  /**
   * A character to appear after the button text. This is wrapped in a `span.button-icon`.
   */
  afterText: PropTypes.string,

  /**
   * Whether the button is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Text read by a screenreader instead of content within the button
   */
  ariaLabel: PropTypes.string,

  /*
   * Element ID containing additional content read by a screenreader
   */
  ariaDescribedby: PropTypes.string,

  /**
   * Whether the button is a submit button
   */
  submitButton: PropTypes.bool,
};

export default ProgressButton;
