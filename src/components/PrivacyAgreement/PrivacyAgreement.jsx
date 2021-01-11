import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../Checkbox/Checkbox';

export default function PrivacyAgreement({ onChange, checked, showError }) {
  return (
    <div>
      <Checkbox
        required
        checked={checked}
        onValueChange={onChange}
        name="privacyAgreement"
        errorMessage={
          showError && !checked
            ? 'You must accept the privacy policy before continuing'
            : undefined
        }
        label={
          <span>
            I have read and accept the{' '}
            <a target="_blank" href="/privacy/">
              privacy policy
            </a>
          </span>
        }
      />
    </div>
  );
}

PrivacyAgreement.propTypes = {
  /**
   * Handler for when the checkbox is changed
   */
  onChange: PropTypes.func.isRequired,
  /**
   * If the checkbox is checked or not
   */
  checked: PropTypes.bool.isRequired,
  /**
   * Whether to show the "You must accept the privacy policy before continuing"
   * error message
   */
  showError: PropTypes.bool,
};
