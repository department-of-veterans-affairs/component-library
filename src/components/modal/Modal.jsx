import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

const ESCAPE_KEY = 27;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastFocus: null,
    };
  }

  componentDidMount() {
    if (this.props.visible) {
      this.setupModal();
    }
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
    this.applyFocusToModal();
    document.body.classList.add('modal-open');
    document.addEventListener('keyup', this.handleDocumentKeyUp, false);
    document.addEventListener('focus', this.handleDocumentFocus, true);
    if (this.props.clickToClose) {
      document.addEventListener('click', this.handleDocumentClicked, true);
    }
  }

  teardownModal() {
    if (this.state.lastFocus) {
      this.state.lastFocus.focus();
    }
    document.body.classList.remove('modal-open');
    document.removeEventListener('keyup', this.handleDocumentKeyUp, false);
    document.removeEventListener('focus', this.handleDocumentFocus, true);
    if (this.props.clickToClose) {
      document.removeEventListener('click', this.handleDocumentClicked, true);
    }
  }

  handleDocumentKeyUp = (event) => {
    if (event.keyCode === ESCAPE_KEY) {
      this.handleClose(event);
    }
  }

  handleClose = (e) => {
    e.preventDefault();
    this.props.onClose();
  }

  handleDocumentFocus = (event) => {
    if (this.props.visible && !this.element.contains(event.target)) {
      event.stopPropagation();
      this.applyFocusToModal();
    }
  }

  handleDocumentClicked = (event) => {
    if (this.props.visible && !this.element.contains(event.target)) {
      this.props.onClose();
    }
  }

  applyFocusToModal() {
    const focusableElement = this.element.querySelector(this.props.focusSelector);
    if (focusableElement) {
      this.setState({ lastFocus: document.activeElement });
      focusableElement.focus();
    }
  }

  render() {
    const { id, title, visible } = this.props;
    const alertClass = classNames(
      'usa-alert',
      `usa-alert-${this.props.status}`
    );

    const titleClass = classNames(
      'va-modal-title',
      `va-modal-title-${this.props.status}`
    );

    const modalCss = classNames('va-modal', this.props.cssClass);
    const modalTitle = title && (
      <div className={alertClass}>
        <h3 id={`${id}-title`} className={titleClass}>{title}</h3>
      </div>
    );

    if (!visible) { return <div/>; }

    let closeButton;
    if (!this.props.hideCloseButton) {
      closeButton = (<button
        className="va-modal-close"
        type="button"
        aria-label="Close this modal"
        onClick={this.handleClose}>
        <i className="fas fa-times" aria-hidden="true"></i>
      </button>);
    }

    return (
      <div className={modalCss} id={id} role="alertdialog" aria-labelledby={`${id}-title`}>
        <div className="va-modal-inner" ref={el => { this.element = el; }}>
          {modalTitle}
          {closeButton}
          <div className="va-modal-body" role="document">
            <div>
              {this.props.contents || this.props.children}
            </div>
            <div className="alert-actions">
              {this.props.primaryButton && <button className="usa-button" onClick={this.props.primaryButton.action}>{this.props.primaryButton.text}</button>}
              {this.props.secondaryButton && <button className="usa-button-secondary" onClick={this.props.secondaryButton.action}>{this.props.secondaryButton.text}</button>}
            </div>
          </div>

        </div>
      </div>
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
   * primary button text and action
   */
  primaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
  /**
   * secondary button text and action
   */
  secondaryButton: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
  /*
   * Style of modal alert - info, error, success, warning
   */
  status: PropTypes.oneOf([
    'info',
    'error',
    'success',
    'warning'
  ]),
  /**
   * Title/header text for the modal
   */
  title: PropTypes.string,
  /**
   * Hide the close button that's normally in the top right
   */
  hideCloseButton: PropTypes.bool,
  /**
   * Selector to use to find elements to focus on when the
   * modal is opened
   */
  focusSelector: PropTypes.string
};

Modal.defaultProps = {
  clickToClose: false,
  focusSelector: 'button, input, select, a'
};

export default Modal;
