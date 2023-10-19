// Node modules.
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Relative imports.
import AlertBox from '../AlertBox/AlertBox';
import {
  formatDate,
  isDateAfter,
  isDateBefore,
  isDateSameDay,
} from '../../helpers/format-date';

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
     * A Date object used when downtime expires.
     */
    expiresAt: PropTypes.instanceOf(Date).isRequired,
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
     * A Date object used when downtime starts.
     */
    startsAt: PropTypes.instanceOf(Date).isRequired,
    /**
     * The title of the banner for downtime.
     */
    title: PropTypes.string.isRequired,
    /**
     * The content of the banner for pre-downtime.
     */
    warnContent: PropTypes.string,
    /**
     * A Date object used when pre-downtime starts.
     */
    warnStartsAt: PropTypes.instanceOf(Date),
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

    if (isDateSameDay(startsAt, expiresAt)) {
      return (
        <>
          <p>
            <strong>Date:</strong> {formatDate(startsAt, 'dateFull')}
          </p>
          <p>
            <strong>Start/End time:</strong> {formatDate(startsAt, 'timeShort')}{' '}
            to {formatDate(expiresAt, 'timeShort')} ET
          </p>
        </>
      );
    }

    return (
      <>
        <p>
          <strong>Start:</strong> {formatDate(startsAt)} ET
        </p>
        <p>
          <strong>End:</strong> {formatDate(expiresAt)} ET
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
    const now = new Date();
    const postContent = derivePostContent();

    // Escape early if the banner is dismissed.
    if (dismissed) {
      return null;
    }

    // Escape early if it's before when it should show.
    if (isDateBefore(now, warnStartsAt)) {
      return null;
    }

    // Escape early if it's after when it should show.
    if (isDateAfter(now, expiresAt)) {
      return null;
    }

    // Show pre-downtime.
    if (isDateBefore(now, startsAt)) {
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
