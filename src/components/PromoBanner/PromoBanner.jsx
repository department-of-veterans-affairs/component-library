import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

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

function PromoBanner({ type, onClose, render, href, text }) {
  const iconClasses = classnames(
    'fas',
    'fa-stack-1x',
    PROMO_BANNER_ICONS.get(type),
  );

  return (
    <div className="vads-c-promo-banner">
      <div className="vads-c-promo-banner__body">
        <div className="vads-c-promo-banner__content">
          <div className="vads-c-promo-banner__content-icon">
            <span className="fa-stack fa-lg">
              <i className="vads-u-color--white fa fa-circle fa-stack-2x" />
              <i className={iconClasses} />
            </span>
          </div>

          {render ? (
            render()
          ) : (
            <a
              className="vads-c-promo-banner__content-link"
              href={href}
              onClick={onClose}
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
  type: PropTypes.oneOf(Object.values(PROMO_BANNER_TYPES)).isRequired,
  onClose: PropTypes.func.isRequired,
  render: PropTypes.func,
  href: PropTypes.string,
  text: PropTypes.string,
};

export default PromoBanner;

export { PROMO_BANNER_TYPES };
