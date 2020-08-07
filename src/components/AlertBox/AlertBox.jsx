import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

class AlertBox extends React.Component {
  componentDidMount() {
    this.scrollToAlert();
  }

  shouldComponentUpdate(nextProps) {
    const visibilityChanged = this.props.isVisible !== nextProps.isVisible;
    const contentChanged = this.props.content !== nextProps.content;
    const statusChanged = this.props.status !== nextProps.status;
    return visibilityChanged || contentChanged || statusChanged;
  }

  componentDidUpdate() {
    this.scrollToAlert();
  }

  scrollToAlert = () => {
    if (!this.props.isVisible || !this.props.scrollOnShow) {
      return;
    }

    const isInView = window.scrollY <= this._ref.offsetTop;

    if (this._ref && !isInView) {
      this._ref.scrollIntoView({
        block: this.props.scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  render() {
    if (!this.props.isVisible) return <div aria-live="polite" />;

    const alertClass = classNames(
      'usa-alert',
      `usa-alert-${this.props.status}`,
      { 'background-color-only': this.props.backgroundOnly },
      this.props.className,
    );

    const closeButton = this.props.onCloseAlert && (
      <button
        className="va-alert-close"
        aria-label={this.props.closeBtnAriaLabel}
        onClick={this.props.onCloseAlert}
      >
        <i className="fas fa-times-circle" aria-label="Close icon" />
      </button>
    );

    const alertHeading = this.props.headline;
    const alertText = this.props.content || this.props.children;
    const H = `h${this.props.level}`;

    return (
      <div
        className={alertClass}
        ref={ref => {
          this._ref = ref;
        }}
      >
        <div className="usa-alert-body">
          {alertHeading && <H className="usa-alert-heading">{alertHeading}</H>}
          {alertText && <div className="usa-alert-text">{alertText}</div>}
        </div>
        {closeButton}
      </div>
    );
  }
}

/* eslint-disable consistent-return */
AlertBox.propTypes = {
  /**
   * Determines the color and icon of the alert box.
   */
  status: PropTypes.oneOf([
    'info', // Blue border, black circled 'i'
    'error', // Red border, red circled exclamation
    'success', // Green border, green checkmark
    'warning', // Yellow border, black triangle exclamation
    'continue', // Green border, green lock
  ]).isRequired,

  /**
   * Show or hide the alert. Useful for alerts triggered by app interaction.
   */
  isVisible: PropTypes.bool,

  /**
   * Body content of the alert, which can also be passed via children.
   */
  content: PropTypes.node,

  /**
   * Optional headline.
   */
  headline: PropTypes.node,

  /**
   * Optional Close button aria-label.
   */
  closeBtnAriaLabel: PropTypes.string,

  /**
   * Close event handler if the alert  can be dismissed or closed.
   */
  onCloseAlert: PropTypes.func,

  /**
   * If true, page scrolls to alert when it is shown.
   */
  scrollOnShow: PropTypes.bool,

  /**
   * Defaults to 'start' but customizable.
   */
  scrollPosition: PropTypes.string,

  /**
   * Optional class name to add to the alert box.
   */
  className: PropTypes.string,

  /**
   * If true, renders an AlertBox with only a background color, without an
   * accented left edge or an icon
   */
  backgroundOnly: PropTypes.bool,

  /**
   * The header level to use with the headline prop, must be a number 1-6
   */
  level(props, propName) {
    const level = parseInt(props[propName], 10);
    if (Number.isNaN(level) || level < 1 || level > 6) {
      return new Error(
        `Invalid prop: AlertBox level must be a number from 1-6, was passed ${
          props[propName]
        }`,
      );
    }
  },
};
/* eslint-enable consistent-return */

AlertBox.defaultProps = {
  scrollPosition: 'start',
  isVisible: true,
  backgroundOnly: false,
  closeBtnAriaLabel: 'Close notification',
  level: 3,
};

export default AlertBox;
