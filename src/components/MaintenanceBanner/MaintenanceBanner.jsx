// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
// Relative imports.
import AlertBox from '../AlertBox/AlertBox';

export const MAINTENANCE_BANNER = 'MAINTENANCE_BANNER';

// @WARNING: This is currently only used once in vets-website.
/**
 * Display a maintenance banner for a given time window.
 */
export class MaintenanceBanner extends Component {
  static propTypes = {
    /**
     * The content of the banner for downtime.
     */
    content: PropTypes.string.isRequired,
    /**
     * A 'moment' object used when downtime expires. Use `moment.utc()` to get the correct display time.
     */
    expiresAt: PropTypes.object.isRequired,
    /**
     * A unique ID that will be used for conditionally rendering the banner based on if the user has dismissed it already.
     */
    id: PropTypes.string.isRequired,
    /**
     * Usually this is just window.localStorage
     */
    localStorage: PropTypes.shape({
      getItem: PropTypes.func.isRequired,
      setItem: PropTypes.func.isRequired,
    }),
    /**
     * A 'moment' object used when downtime starts. Use `moment.utc()` to get the correct display time.
     */
    startsAt: PropTypes.object.isRequired,
    /**
     * The title of the banner for downtime.
     */
    title: PropTypes.string.isRequired,
    /**
     * The content of the banner for pre-downtime.
     */
    warnContent: PropTypes.string,
    /**
     * A 'moment' object used when pre-downtime starts. Use `moment.utc()` to get the correct display time.
     */
    warnStartsAt: PropTypes.object,
    /**
     * The title of the banner for pre-downtime.
     */
    warnTitle: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      dismissed:
        props.localStorage &&
        props.localStorage.getItem(MAINTENANCE_BANNER) === this.props.id,
    };
  }

  derivePostContent = () => {
    const { startsAt, expiresAt } = this.props;

    const startsAtET = startsAt.clone().subtract(4, 'hours');
    const expiresAtET = expiresAt.clone().subtract(4, 'hours');

    if (startsAt.isSame(expiresAt, 'day')) {
      return (
        <>
          <p>
            <strong>Date:</strong> {startsAtET.format('dddd MMMM D, YYYY')}
          </p>
          <p>
            <strong>Start/End time:</strong> {startsAtET.format('h:mm a')} to{' '}
            {expiresAtET.format('h:mm a')} ET
          </p>
        </>
      );
    }

    return (
      <>
        <p>
          <strong>Start:</strong>{' '}
          {startsAtET.format('dddd MMMM D, YYYY, [at] h:mm a')} ET
        </p>
        <p>
          <strong>End:</strong>{' '}
          {expiresAtET.format('dddd MMMM D, YYYY, [at] h:mm a')} ET
        </p>
      </>
    );
  };

  onCloseAlert = () => {
    if (this.props.localStorage) {
      this.props.localStorage.setItem(MAINTENANCE_BANNER, this.props.id);
    }
    this.setState({ dismissed: true });
  };

  render() {
    const { derivePostContent, onCloseAlert } = this;
    const { dismissed } = this.state;
    const {
      content,
      expiresAt,
      id,
      startsAt,
      title,
      warnContent,
      warnStartsAt,
      warnTitle,
    } = this.props;

    // Derive dates.
    const now = moment();
    const postContent = derivePostContent();

    // Escape early if the banner is dismissed.
    if (dismissed) {
      return null;
    }

    // Escape early if it's before when it should show.
    if (now.isBefore(warnStartsAt)) {
      return null;
    }

    // Escape early if it's after when it should show.
    if (now.isAfter(expiresAt)) {
      return null;
    }

    // Show pre-downtime.
    if (now.isBefore(startsAt)) {
      return (
        <div
          className="usa-alert-full-width vads-u-border-top--5px medium-screen:vads-u-border-top--10px vads-u-border-color--warning-message maintenance-banner"
          data-e2e-id="maintenance-banner-pre-downtime"
        >
          <AlertBox
            content={
              <>
                <p>{warnContent}</p>
                {postContent}
              </>
            }
            headline={warnTitle}
            onCloseAlert={onCloseAlert}
            status="warning"
          />
        </div>
      );
    }

    // Show downtime.
    return (
      <div
        className="usa-alert-full-width vads-u-border-top--5px medium-screen:vads-u-border-top--10px vads-u-border-color--secondary maintenance-banner"
        data-e2e-id="maintenance-banner-downtime"
      >
        <AlertBox
          content={
            <>
              <p>{content}</p>
              {postContent}
            </>
          }
          headline={title}
          onCloseAlert={onCloseAlert}
          status="error"
        />
      </div>
    );
  }
}

export default MaintenanceBanner;
