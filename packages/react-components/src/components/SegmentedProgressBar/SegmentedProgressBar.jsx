import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { range } from '../../helpers/lodash';
import dispatchAnalyticsEvent from '../../helpers/analytics';

/**
 * Create a segmented progress bar for multi-page forms.
 *
 * @param {number} current - The index of the current chapter
 * @param {number} total   - The total number of chapters in the form
 * @param {string} ariaLabel - An override for the default aria label
 */
export default function SegmentedProgressBar({
  current,
  total,
  enableAnalytics,
  ariaLabel = `Step ${current} of ${total}`,
}) {
  useEffect(() => {
    // Conditionally track events
    if (enableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'SegmentedProgressBar',
        action: 'change',
        details: {
          current: current,
          total: total,
        },
      });
    }
  });

  return (
    <div
      className="progress-bar-segmented"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin="0"
      aria-valuemax={total}
      tabIndex="0"
      aria-label={ariaLabel}
    >
      {range(total).map(step => (
        <div
          key={step}
          className={`progress-segment ${
            current > step ? 'progress-segment-complete' : ''
          }`}
        />
      ))}
    </div>
  );
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
  /**
   * Analytics tracking function(s) will be called. Form components
   * are disabled by default due to PII/PHI concerns.
   */
  enableAnalytics: PropTypes.bool,
  /**
   * An override for the default aria label.
   */
  ariaLabel: PropTypes.string,
};
