import PropTypes from 'prop-types';
import React from 'react';

export default class LoadingIndicator extends React.Component {
  componentDidMount() {
    if (this.props.setFocus && this.spinnerDiv) {
      this.spinnerDiv.focus();
    }
  }
  render() {
    const { message } = this.props;
    const { label } = this.props;

    return (
      <div className="loading-indicator-container">
        <div
          ref={div => {
            this.spinnerDiv = div;
          }}
          className="loading-indicator"
          role="progressbar"
          aria-label={label}
          aria-valuetext={message}
          tabIndex="0"
        />
        {message}
      </div>
    );
  }
}

LoadingIndicator.propTypes = {
  /**
   * The message visible on screen when loading
   */
  message: PropTypes.string.isRequired,
  /**
   * Set to true if the loading indicator should capture focus
   */
  setFocus: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  setFocus: false,
};
