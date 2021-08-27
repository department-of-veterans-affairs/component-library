// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
// Relative imports.
import AlertBox from '../AlertBox/AlertBox';

const DISMISSED_BANNERS_LOCAL_STORAGE = 'DISMISSED_BANNERS';

export class Banner extends Component {
  static propTypes = {
    // A raw HTML string.
    content: PropTypes.string.isRequired,
    // Usually this is just window.localStorage or window.sessionStorage.
    storage: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired,
    }),
    // A function to track clicks (e.g. Google Analytics' `dataLayer.push`).
    recordEvent: PropTypes.func,
    // Enable the close functionality. The banner will be closed until storage is cleared.
    showClose: PropTypes.bool,
    // The title of the banner.
    title: PropTypes.string.isRequired,
    // If type is equal to 'error', it will show a red emergency banner outline.
    type: PropTypes.string.isRequired,
    // A boolean that when false makes it so the banner does not render.
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    recordEvent: () => {},
  };

  constructor(props) {
    super(props);

    // Derive dismissed banners from storage.
    const dismissedBannersString = props.storage?.getItem(
      DISMISSED_BANNERS_LOCAL_STORAGE,
    );
    const dismissedBanners = dismissedBannersString
      ? JSON.parse(dismissedBannersString)
      : [];

    this.state = {
      dismissedBanners,
    };
  }

  prepareBannerID = () => `${this.props.title}:${this.props.content}`;

  dismiss = () => {
    const { content, recordEvent, storage, title } = this.props;
    const { dismissedBanners } = this.state;

    // Derive the current banner ID.
    const currentBannerID = this.prepareBannerID();

    // Escape early if the banner is already dismissed.
    if (dismissedBanners.includes(currentBannerID)) {
      return;
    }

    // Add the banner ID to the list of dismissed banners.
    if (storage) {
      // Derive the updated dismissed banners.
      const updatedDismissedBanners = [...dismissedBanners, currentBannerID];

      // Set it in local storage.
      storage.setItem(
        DISMISSED_BANNERS_LOCAL_STORAGE,
        JSON.stringify(updatedDismissedBanners),
      );

      // Update dismissedBanners in state.
      this.setState({ dismissedBanners: updatedDismissedBanners });
    }

    // Track the dismiss event.
    if (recordEvent) {
      recordEvent({
        event: 'int-alert-box-close',
        'alert-box-headline': title,
      });
    }
  };

  onClick = event => {
    if (event.target && event.target.nodeName === 'A') {
      this.props?.recordEvent({
        event: 'nav-warning-alert-box-content-link-click',
        alertBoxHeading: this.props.title,
      });
    }
  };

  render() {
    const { showClose, title, content, type, visible } = this.props;
    const { dismissedBanners } = this.state;

    // Derive if the banner is dismissed.
    const isBannerDismissed = dismissedBanners?.includes(
      this.prepareBannerID(),
    );

    // Escape early if the banner isn't visible or is dismissed.
    if (!visible || isBannerDismissed) {
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
            // 'info', primary-alt border, black circled 'i'
            'vads-u-border-color--primary-alt': type === 'info' || !type,
            // 'error', Red border, red circled exclamation
            'vads-u-border-color--secondary': type === 'error',
            // 'success', Green border, green checkmark
            // 'continue', Green border, green lock
            'vads-u-border-color--green-light':
              type === 'success' || type === 'continue',
            // 'warning', Yellow border, black triangle exclamation
            'vads-u-border-color--warning-message': type === 'error',
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

export default Banner;
