import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Listen,
  Prop,
  Watch,
} from '@stencil/core';
import { createFocusTrap, FocusTrap } from 'focus-trap';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { hideOthers, Undo } from 'aria-hidden';

/**
 * @click Used to detect clicks outside of modal contents to close modal.
 * @keydown Used to detect Escape key to close modal.
 */
@Component({
  tag: 'va-modal',
  styleUrl: 'va-modal.css',
  shadow: true,
})
export class VaModal {
  // This reference is required to allow focus trap to work properly.
  // Without it, keyboard navigation behavior may break and work unexpectedly.
  alertActions: HTMLDivElement;

  // This reference is used by focus trap to focus the close button on open
  // when initialFocusSelector is not specified.
  closeButton: HTMLButtonElement;

  // This reference is required to allow focus trap to work properly.
  // Without it, keyboard navigation behavior may break and work unexpectedly.
  closeButtonContainer: HTMLDivElement;

  // This boolean variable is used to determine if componentDidUpdate should
  // set up or tear down the modal.
  isVisibleDirty: boolean;

  focusTrap: FocusTrap;

  // This variable is used to undo aria-hidden on modal close.
  undoAriaHidden: Undo;

  @Element() el: HTMLElement;

  /**
   * Fires when modal is closed.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  /**
   * Fires when primary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  primaryButtonClick: EventEmitter;

  /**
   * Fires when secondary button is clicked.
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  secondaryButtonClick: EventEmitter;

  /**
   * The event used to track usage of the component. Fires when a
   * a page is selected if enable-analytics is true.
   */
  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  /**
   * Click outside modal will trigger closeEvent
   */
  @Prop() clickToClose?: boolean = false;

  /**
   * If true, analytics event won't be fired
   */
  @Prop() disableAnalytics?: boolean = false;

  /**
   * Title/header text for the modal
   */
  @Prop() modalTitle?: string;

  /**
   * Hide the close button that's normally in the top right
   */
  @Prop() hideCloseButton?: boolean = false;

  /**
   * Selector to explicitly specify which element should receive
   * focus when the modal is open, if the initially focused element
   * is not the first focusable element in the document
   */
  @Prop() initialFocusSelector?: string;

  /**
   * Primary button text
   */
  @Prop() primaryButtonText?: string;

  /**
   * Secondary button text
   */
  @Prop() secondaryButtonText?: string;

  /*
   * Style of modal alert - info, error, success, warning
   */
  @Prop() status?: 'continue' | 'error' | 'info' | 'success' | 'warning';

  /**
   * If the modal is visible or not
   */
  @Prop() visible: boolean = false;

  // This click event listener is used to close the modal when clickToClose
  // is true and the user clicks the overlay outside of the modal contents.
  @Listen('click')
  handleClick(e: MouseEvent) {
    if (!this.clickToClose) return;

    // event.target is always the shadow host
    // event.composedPath()[0] returns the node clicked when shadow root is open
    if (this.visible && e.composedPath()[0] === this.el) {
      this.handleClose(e);
    }
  }

  // This keydown event listener is used to close the modal when the user hits
  // the Escape key.
  @Listen('keydown', { target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    if (!this.visible) return;

    const keyCode = e.key;
    if (keyCode === 'Escape') {
      this.handleClose(e);
    }
  }

  // This is a workaround for determining when to call setupModal or teardownModal.
  // Elements are not yet available in the DOM due to `if (!visible) return null;`.
  // See componentDidUpdate.
  @Watch('visible')
  watchVisibleHandler() {
    this.isVisibleDirty = true;
  }

  componentDidLoad() {
    if (this.visible) this.setupModal();
  }

  // Stencil's componentDidUpdate doesn't provide us with previous props to compare
  // and determine if we need to setup or destroy the modal. We can use a boolean
  // variable inside a Watch decorator as a workaround to determine if an update needs
  // to occur.
  componentDidUpdate() {
    if (!this.isVisibleDirty) return;

    this.isVisibleDirty = false;
    if (this.visible) {
      this.setupModal();
    } else {
      this.teardownModal();
    }
  }

  disconnectedCallback() {
    this.teardownModal();
  }

  private handleClose(e: KeyboardEvent | MouseEvent) {
    this.closeEvent.emit(e);
  }

  private handlePrimaryButtonClick(e: MouseEvent) {
    this.primaryButtonClick.emit(e);
  }

  private handleSecondaryButtonClick(e: MouseEvent) {
    this.secondaryButtonClick.emit(e);
  }

  // This method traps the focus inside our web component, prevents scrolling outside
  // the modal, and adds aria-hidden="true" to all elements outside the web component.
  // Fires analytics event unless disableAnalytics is true.
  private setupModal() {
    // If an initialFocusSelector is provided, the element will be focused on modal open
    // if it exists. You are able to focus elements in both light and shadow DOM.
    const initialFocus = (this.el.querySelector(this.initialFocusSelector) ||
      this.el.shadowRoot.querySelector(
        this.initialFocusSelector,
      )) as HTMLElement;

    // These containers and their order are required to ensure predictable keyboard
    // navigation within the focus trap.
    this.focusTrap = createFocusTrap(
      [this.el, this.alertActions, this.closeButtonContainer],
      {
        // This is set to false because we don't want the user to disable the focus trap using
        // the escape key.
        escapeDeactivates: false,

        // This is used to determine what element to focus on modal open.
        // If initialFocusSelector is specified, focus will be received by that element.
        // If initialFocusSelector is specified and the element isn't found, focus will be received by
        // the close button if it exists.
        // If initialFocusSelector is not specified, focus will be received by the close button if it exists.
        // If hideCloseButton is true, focus will be received by the first focusable element in the modal.
        initialFocus: initialFocus || this.closeButton,
      },
    );

    // Traps focus inside modal
    this.focusTrap.activate();

    // Prevents scrolling outside modal
    disableBodyScroll(this.el);

    // Sets aria-hidden="true" to all elements outside of the modal.
    // This is used to limit the screen reader to content inside the modal.
    this.undoAriaHidden = hideOthers(this.el);

    // NOTE: With this PR (https://github.com/department-of-veterans-affairs/vets-website/pull/11712)
    // we rely on the existence of `body.modal-open` to determine if a modal is
    // currently open and adjust programmatic scrolling if there is.
    document.body.classList.add('modal-open');

    // Conditionally track the event.
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-modal',
        action: 'show',
        details: {
          status: this.status,
          title: this.modalTitle,
          primaryButtonText: this.primaryButtonText,
          secondayButtonText: this.secondaryButtonText,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  // This method removes the focus trap, re-enables scrolling and
  // removes aria-hidden="true" from external elements.
  private teardownModal() {
    this.focusTrap.deactivate();
    clearAllBodyScrollLocks();
    this.undoAriaHidden();

    document.body.classList.remove('modal-open');
  }

  render() {
    const {
      modalTitle,
      hideCloseButton,
      primaryButtonClick,
      primaryButtonText,
      secondaryButtonClick,
      secondaryButtonText,
      status,
      visible,
    } = this;

    if (!visible) return null;

    const ariaLabel = `${modalTitle} modal` || 'Modal';
    const wrapperClass = status
      ? 'va-modal-inner va-modal-alert'
      : 'va-modal-inner';
    const bodyClass = status ? 'va-modal-alert-body' : 'va-modal-body';
    const titleClass = status ? 'va-modal-alert-title' : 'va-modal-title';
    const ariaRole = status => {
      if (status === 'warning' || status === 'error') {
        return 'alertdialog';
      }
      return 'dialog';
    };
    const btnAriaLabel = modalTitle
      ? `Close ${modalTitle} modal`
      : 'Close modal';

    return (
      <Host
        aria-label={ariaLabel}
        aria-modal="true"
        class="va-modal"
        role={ariaRole(status)}
      >
        <div class={wrapperClass} tabIndex={-1}>
          {!hideCloseButton && (
            <div ref={el => (this.closeButtonContainer = el as HTMLDivElement)}>
              <button
                aria-label={btnAriaLabel}
                class="va-modal-close"
                onClick={e => this.handleClose(e)}
                ref={el => (this.closeButton = el as HTMLButtonElement)}
                type="button"
              >
                <i aria-hidden="true" />
              </button>
            </div>
          )}
          <div class={bodyClass}>
            <div role="document">
              {modalTitle && (
                <h1 class={titleClass} tabIndex={-1}>
                  {modalTitle}
                </h1>
              )}

              <slot></slot>
            </div>
            {((primaryButtonClick && primaryButtonText) ||
              (secondaryButtonClick && secondaryButtonText)) && (
              <div
                class="alert-actions"
                ref={el => (this.alertActions = el as HTMLDivElement)}
              >
                {primaryButtonClick && primaryButtonText && (
                  <button
                    onClick={e => this.handlePrimaryButtonClick(e)}
                    type="button"
                  >
                    {primaryButtonText}
                  </button>
                )}
                {secondaryButtonClick && secondaryButtonText && (
                  <button
                    class="button-secondary"
                    onClick={e => this.handleSecondaryButtonClick(e)}
                    type="button"
                  >
                    {secondaryButtonText}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
