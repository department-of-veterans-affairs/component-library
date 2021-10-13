// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Relative imports.
import { VaAlert } from 'web-components/react-bindings';

const DISMISSED_BANNERS_KEY = 'DISMISSED_BANNERS';

export class Banner extends Component {
  static propTypes = {
    /**
     * A raw HTML string.
     * */
    content: PropTypes.string.isRequired,
    /**
     * Usually this is just window.localStorage or window.sessionStorage. If you provide sessionStorage to the component, it will only use sessionStorage
     * (and vice versa for localStorage).
     * An array of dismissed banners will be stored in storage under the DISMISSED_BANNERS_KEY. This is used to determine if a banner has been dismissed.
     * In order to clear dismissed banners, you will need to clear the storage you provided (e.g. localStorage or sessionStorage) manually.
     * (It is not desired for a user to clear their storage via Banner functionality at this time).
     * */
    storage: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired,
    }),
    /**
     * A function to track clicks (e.g. Google Analytics' `dataLayer.push`).
     * */
    recordEvent: PropTypes.func,
    /**
     * Enable the close functionality. The banner will be closed until storage is cleared.
     * */
    showClose: PropTypes.bool,
    /**
     * The title of the banner.
     * */
    title: PropTypes.string.isRequired,
    /**
     * The type of the banner. One of 'info', 'error', 'success', 'continue', or 'warning'. This affects both the icon of the AlertBox and the top border color.
     * */
    type: PropTypes.string.isRequired,
    /**
     * A boolean that when false makes it so that the banner does not render.
     * */
    visible: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    recordEvent: () => {},
  };

  constructor(props) {
    super(props);

    // Derive dismissed banners from storage.
    const dismissedBannersString = props.storage?.getItem(
      DISMISSED_BANNERS_KEY,
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
    const { recordEvent, storage, title } = this.props;
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
        DISMISSED_BANNERS_KEY,
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
    const { content, showClose, storage, title, type, visible } = this.props;
    const { dismissedBanners } = this.state;

    // Derive if the banner is dismissed.
    const isBannerDismissed =
      showClose &&
      storage &&
      dismissedBanners?.includes(this.prepareBannerID());

    // Escape early if the banner isn't visible or is dismissed.
    if (!visible || isBannerDismissed) {
      return null;
    }

    // Derive onCloseAlert depending on the environment.
    const onCloseAlert = showClose && storage ? this.dismiss : undefined;

    return (
      <div data-e2e-id="emergency-banner" onClick={this.onClick}>
        <VaAlert
          visible
          full-width
          closeable={showClose}
          onClose={onCloseAlert}
          status={type}
        >
          <h3 slot="headline">{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </VaAlert>
      </div>
    );
  }
}

export default Banner;
