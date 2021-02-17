import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import dispatchAnalyticsEvent from '../../helpers/analytics';

const PROMO_BANNER_TYPES = {
  announcement: 'announcement',
  news: 'news',
  emailSignup: 'email-signup',
};

const PROMO_BANNER_ICONS = new Map([
  [PROMO_BANNER_TYPES.announcement, 'fa-bullhorn'],
  [PROMO_BANNER_TYPES.news, 'fa-newspaper'],
  [PROMO_BANNER_TYPES.emailSignup, 'fa-envelope'],
]);

function PromoBanner({ type, onClose, render, href, target, text }) {
  const iconClasses = classnames(
    'fas',
    'fa-stack-1x',
    PROMO_BANNER_ICONS.get(type),
  );

  const onCloseWithAnalytics = () => {
    dispatchAnalyticsEvent({
      componentName: 'PromoBanner',
      action: 'linkClick',
      details: {
        text,
        href,
        target,
        type,
      },
    });
    return onClose && onClose();
  };

  return (
    <div className="vads-c-promo-banner">
      <div className="vads-c-promo-banner__body">
        <div className="vads-c-promo-banner__icon">
          <span className="fa-stack fa-lg">
            <i className="vads-u-color--white fa fa-circle fa-stack-2x" />
            <i className={iconClasses} />
          </span>
        </div>

        <div className="vads-c-promo-banner__content">
          {render ? (
            render()
          ) : (
            <a
              className="vads-c-promo-banner__content-link"
              href={href}
              target={target}
              onClick={onCloseWithAnalytics}
            >
              {text} <i className="fas fa-angle-right" />
            </a>
          )}
        </div>

        <div className="vads-c-promo-banner__close">
          <button
            type="button"
            aria-label="Dismiss this announcement"
            onClick={onClose}
            className="va-button-link vads-u-margin-top--1"
          >
            <i className="fas fa-times-circle vads-u-font-size--lg" />
          </button>
        </div>
      </div>
    </div>
  );
}

PromoBanner.propTypes = {
  /**
   * Controls which icon gets used
   */
  type: PropTypes.oneOf(Object.values(PROMO_BANNER_TYPES)).isRequired,

  /**
   * Callback function meant to change parent state so that `<PromoBanner>` gets dismissed
   */
  onClose: PropTypes.func.isRequired,

  /**
   * Function for rendering custom markup instead of the `<a>` with `text` in it
   */
  render: PropTypes.func,

  /**
   * `href` attribute for the `<a>` tag. Only gets used if `render` is _not_ used
   */
  href: PropTypes.string,

  /**
   * `target` attribute for the `<a>` tag. Only gets used if `render` is _not_ used
   */
  target: PropTypes.string,

  /**
   * Content for the `<a>` tag. Only gets used if `render` is _not_ used
   */
  text: PropTypes.string,
};

export default PromoBanner;

export { PROMO_BANNER_TYPES };
