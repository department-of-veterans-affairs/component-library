import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import dispatchAnalyticsEvent from '../../helpers/analytics';

export default function ProgressBar({ percent, label, disableAnalytics }) {
  useEffect(() => {
    if (!disableAnalytics && (percent === 0 || percent === 100)) {
      dispatchAnalyticsEvent({
        componentName: 'ProgressBar',
        action: 'change',
        details: {
          percent: percent,
          label: label,
        },
      });
    }
  });

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin="0"
      aria-valuemax="100"
      tabIndex="0"
      aria-label={label}
    >
      <div className="progress-bar-inner" style={{ width: `${percent}%` }} />
    </div>
  );
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
