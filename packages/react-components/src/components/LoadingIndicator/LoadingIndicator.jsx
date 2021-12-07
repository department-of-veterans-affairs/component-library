import PropTypes from 'prop-types';
import React from 'react';
import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * **Note:** This component is deprecated in favor of the `<va-loading-indicator>` Web Component
 */
export default class LoadingIndicator extends React.Component {
  constructor(props) {
    super(props);

    // This state variable is used as a constant to get a diff
    // between initial mount and unmount
    this.state = { loadingStartTime: Date.now() };
  }

  componentDidMount() {
    if (this.props.setFocus && this.spinnerDiv) {
      this.spinnerDiv.focus();
    }
  }

  componentWillUnmount() {
    if (this.props.enableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'LoadingIndicator',
        action: 'displayed',
        details: {
          displayTime: Date.now() - this.state.loadingStartTime,
          message: this.props.message,
        },
      });
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
  /**
   * An aXe label
   */
  label: PropTypes.string,
  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  enableAnalytics: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  setFocus: false,
  label: 'Loading',
};
