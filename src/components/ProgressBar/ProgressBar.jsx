import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dispatchAnalyticsEvent from '../../helpers/analytics';

class ProgressBar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.analyticsEvent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.percent !== this.props.percent) {
      this.analyticsEvent();
    }
  }

  analyticsEvent = () => {
    // Conditionally track events
    if (!this.props.disableAnalytics) {
      if (this.props.percent === 0 || this.props.percent === 100) {
        dispatchAnalyticsEvent({
          componentName: 'ProgressBar',
          action: 'change',
          details: {
            percent: this.props.percent,
            label: this.props.label,
          },
        });
      }
    }
  };

  render() {
    return (
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow={this.props.percent}
        aria-valuemin="0"
        aria-valuemax="100"
        tabIndex="0"
        aria-label={this.props.label}
      >
        <div
          className="progress-bar-inner"
          style={{ width: `${this.props.percent}%` }}
        />
      </div>
    );
  }
}

ProgressBar.propTypes = {
  /**
   * Percent of progress made. 0 to 100.
   */
  percent: PropTypes.number.isRequired,

  /**
   * A text label uses for aria-label
   */
  label: PropTypes.string,
  /**
   * Analytics tracking function(s) will not be called
   */
  disableAnalytics: PropTypes.bool,
};

ProgressBar.defaultProps = {
  label: 'Working',
};

export default ProgressBar;
