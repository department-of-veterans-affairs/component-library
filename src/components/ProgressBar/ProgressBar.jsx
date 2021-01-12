import React from 'react';
import PropTypes from 'prop-types';

export default function ProgressBar({ percent, label }) {
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
};
