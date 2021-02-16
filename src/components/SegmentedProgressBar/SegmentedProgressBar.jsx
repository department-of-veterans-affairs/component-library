import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * Create a segmented progress bar for multi-page forms.
 *
 * @param {number} current - The index of the current chapter
 * @param {number} total   - The total number of chapters in the form
 */
export default class SegmentedProgressBar extends React.Component {
  constructor(props) {
    super(props);

    this.analyticsEvent = this.analyticsEvent.bind(this);
  }

  analyticsEvent() {
    dispatchAnalyticsEvent({
      componentName: 'SegmentedProgressBar',
      action: 'update',
      details: {
        current: this.props.current,
        total: this.props.total,
      },
    });
  }

  componentDidMount() {
    this.analyticsEvent();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current !== this.props.current) {
      this.analyticsEvent();
    }
  }

  render() {
    return (
      <div
        className="progress-bar-segmented"
        role="progressbar"
        aria-valuenow={this.props.current}
        aria-valuemin="0"
        aria-valuemax={this.props.total}
        tabIndex="0"
        aria-label={`Step ${this.props.current} of ${this.props.total}`}
      >
        {_.range(this.props.total).map(step => (
          <div
            key={step}
            className={`progress-segment ${
              this.props.current > step ? 'progress-segment-complete' : ''
            }`}
          />
        ))}
      </div>
    );
  }
}

SegmentedProgressBar.propTypes = {
  /**
   * The current segment in progress
   */
  current: PropTypes.number.isRequired,
  /**
   * The total number of segments in the progress bar
   */
  total: PropTypes.number.isRequired,
};
