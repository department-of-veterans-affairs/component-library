import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import { FocusOn } from 'react-focus-on';
import dispatchAnalyticsEvent from '../../helpers/analytics';

const ESCAPE_KEY = 27;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDocumentClicked = this.handleDocumentClicked.bind(this);
  }

  componentDidMount() {
    if (this.props.visible) this.setupModal();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.setupModal();
    } else if (prevProps.visible && !this.props.visible) {
      this.teardownModal();
    }
  }

  componentWillUnmount() {
    if (this.props.visible) {
      this.teardownModal();
    }
  }

  setupModal() {
    this.setInitialModalFocus();
    // NOTE: With this PR (https://github.com/department-of-veterans-affairs/vets-website/pull/11712)
    // we rely on the existence of `body.modal-open` to determine if a modal is
    // currently open and adjust programmatic scrolling if there is.
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', this.handleDocumentKeyDown, false);
    if (this.props.clickToClose) {
      document.addEventListener('click', this.handleDocumentClicked, true);
    }
    // Conditionally track the event.
    if (!this.props.disableAnalytics) {
      dispatchAnalyticsEvent({
        componentName: 'Modal',
        action: 'show',
        details: {
          status: this.props.status,
          title: this.props.title,
          primaryButtonText: this.props.primaryButton?.text,
          secondaryButtonText: this.props.secondaryButton?.text,
        },
      });
    }
  }

  teardownModal() {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', this.handleDocumentKeyDown, false);
    if (this.props.clickToClose) {
      document.removeEventListener('click', this.handleDocumentClicked, true);
    }
  }

  handleDocumentKeyDown(event) {
    if (event.keyCode === ESCAPE_KEY) {
      this.handleClose(event);
    }
  }

  handleClose(e) {
    e.preventDefault();
    this.props.onClose();
  }

  handleDocumentClicked(event) {
    if (this.props.visible && !this.element.contains(event.target)) {
      this.props.onClose();
    }
  }

  setInitialModalFocus() {
    if (this.props.initialFocusSelector) {
      const focusableElement = this.element.querySelector(
        this.props.initialFocusSelector,
      );
      if (focusableElement) {
        focusableElement.setAttribute('data-autofocus', 'true');
      }
    }
  }

  renderAlertActions() {
    const { primaryButton, secondaryButton } = this.props;
    if (!primaryButton && !secondaryButton) return null;

    return (
      <div className="alert-actions">
        {primaryButton && (
          <button className="usa-button" onClick={primaryButton.action}>
            {primaryButton.text}
          </button>
        )}
        {secondaryButton && (
          <button
            className="usa-button-secondary"
            onClick={secondaryButton.action}
          >
            {secondaryButton.text}
          </button>
        )}
      </div>
    );
  }

  render() {
    if (!this.props.visible) return null;

    const { id, status, title } = this.props;
    const titleId = `${id || 'va-modal'}-title`;
    const content = this.props.contents || this.props.children;

    const modalClass = classNames('va-modal', this.props.cssClass);

    const wrapperClass = classNames('va-modal-inner', {
      'usa-alert': status,
      [`usa-alert-${status}`]: status,
      'va-modal-alert': status,
    });

    const bodyClass = status ? 'usa-alert-body' : 'va-modal-body';
    const titleClass = status ? 'usa-alert-heading' : 'va-modal-title';
    const contentClass = classNames({ 'usa-alert-text': status });
    const ariaRole = status => {
      if (status === 'warning' || status === 'error') {
        return 'alertdialog';
      }
      return 'dialog';
    };

    const closeButton = !this.props.hideCloseButton && (
      <button
        className="va-modal-close"
        type="button"
        aria-label="close"
        onClick={this.handleClose}
      >
        <i className="fas fa-times-circle" aria-hidden="true" />
      </button>
    );

    return (
      <FocusOn returnFocus>
        <div
          className={modalClass}
          id={id}
          role={ariaRole(status)}
          aria-labelledby={titleId}
          aria-modal
        >
          <div
            className={wrapperClass}
            ref={el => {
              this.element = el;
            }}
          >
            {closeButton}
            <div className={bodyClass}>
              <div role="document">
                {title && (
                  <h1 id={titleId} className={titleClass} tabIndex="-1">
                    {title}
                  </h1>
                )}
                {content && <div className={contentClass}>{content}</div>}
              </div>
              {this.renderAlertActions()}
            </div>
          </div>
        </div>
      </FocusOn>
    );
  }
}

Modal.propTypes = {
  /**
   * If the modal is visible or not
   */
  visible: PropTypes.bool.isRequired,
  /**
   * Handler for when the modal is closed
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Click outside modal will call onClose prop
   */
  clickToClose: PropTypes.bool,
  /**
   * Child elements (content) of modal when displayed
   */
  children: PropTypes.node,
  /**
   * Contents of modal when displayed. You can also pass the contents as children, which is preferred
   */
  contents: PropTypes.node,
  /**
   * CSS class to set on the modal
   */
  cssClass: PropTypes.string,
  /**
   * Id of the modal, used for aria attributes
   */
  id: PropTypes.string,
  /**
   * Primary button text and action
   */
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
  /**
   * Secondary button text and action
   */
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
  /*
   * Style of modal alert - info, error, success, warning
   */
  status: PropTypes.oneOf(['info', 'error', 'success', 'warning', 'continue']),
  /**
   * Title/header text for the modal
   */
  title: PropTypes.string,
  /**
   * Hide the close button that's normally in the top right
   */
  hideCloseButton: PropTypes.bool,
  /**
   * Selector to use to find elements that should be focusable
   * within the modal
   */
  focusSelector: PropTypes.string,
  /**
   * Selector to explicitly specify which element should receive
   * focus when the modal is open, if the initially focused element
   * is not the first focusable element in the document
   */
  initialFocusSelector: PropTypes.string,
  /**
   * Analytics tracking function(s) will be called
   */
  disableAnalytics: PropTypes.bool,
};

Modal.defaultProps = {
  visible: false,
  clickToClose: false,
  focusSelector: 'button, input, select, a',
};

export default Modal;
