// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Relative imports.
import AlertBox from '../AlertBox/AlertBox';

const EMERGENCY_BANNER_LOCALSTORAGE = 'EMERGENCY_BANNER';

// @WARNING: This is currently only used once in vets-website.
export class EmergencyBanner extends Component {
  static propTypes = {
    content: PropTypes.string.isRequired,
    localStorage: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired,
    }),
    recordEvent: PropTypes.func,
    showClose: PropTypes.bool,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    recordEvent: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      dismissed:
        props.localStorage &&
        props.localStorage.getItem(EMERGENCY_BANNER_LOCALSTORAGE) ===
          this.prepareEmergencyBannerID(),
    };
  }

  prepareEmergencyBannerID = () => `${this.props.title}:${this.props.content}`;

  dismiss = () => {
    if (this.props.localStorage) {
      this.props.localStorage.setItem(
        EMERGENCY_BANNER_LOCALSTORAGE,
        this.prepareEmergencyBannerID(),
      );
    }
    this.setState({ dismissed: true });
  };

  onClick = event => {
    if (event.target && event.target.nodeName === 'A') {
      this.props.recordEvent({
        event: 'nav-warning-alert-box-content-link-click',
        alertBoxHeading: this.props.title,
      });
    }
  };

  render() {
    const { showClose, title, content, type, visible } = this.props;

    const { dismissed } = this.state;

    // Escape early if the banner isn't visible or is dismissed.
    if (!visible || dismissed) {
      return null;
    }

    // Derive onCloseAlert depending on the environment.
    const onCloseAlert = showClose && this.dismiss;

    return (
      <div
        onClick={this.onClick}
        className={classnames(
          'usa-alert-full-width',
          'vads-u-border-top--5px',
          'medium-screen:vads-u-border-top--10px',
          'vads-c-emergency-banner',
          {
            'vads-u-border-color--warning-message': type !== 'error',
            'vads-u-border-color--secondary': type === 'error',
          },
        )}
        data-e2e-id="emergency-banner"
      >
        <AlertBox
          // eslint-disable-next-line react/no-danger
          content={<div dangerouslySetInnerHTML={{ __html: content }} />}
          headline={title}
          isVisible
          onCloseAlert={onCloseAlert}
          status={type}
        />
      </div>
    );
  }
}

export default EmergencyBanner;
