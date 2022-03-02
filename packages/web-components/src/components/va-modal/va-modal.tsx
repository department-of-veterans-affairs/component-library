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
import classnames from 'classnames';

/**
 * @click Used to detect clicks outside of modal contents to close modal
 * @keydown Used to detect Escape key to close modal
 */
@Component({
  tag: 'va-modal',
  styleUrl: 'va-modal.css',
  shadow: true,
})
export class VaModal {
  alertActions: HTMLDivElement;
  closeButton: HTMLButtonElement;
  closeButtonContainer: HTMLDivElement;
  isVisibleDirty: boolean; // used to determine if visible has changed (workaround)
  focusTrap: FocusTrap;
  undoAriaHidden: Undo; // used to undo aria hidden on close

  @Element() el: HTMLElement;

  /**
   * Fires when modal is closed
   */
  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

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
   * Primary button text and action
   */
  @Prop() primaryButton?: any;

  /**
   * Secondary button text and action
   */
  @Prop() secondaryButton?: any;

  /*
   * Style of modal alert - info, error, success, warning
   */
  @Prop() status?: 'continue' | 'error' | 'info' | 'success' | 'warning';

  /**
   * If the modal is visible or not
   */
  @Prop() visible: boolean = false;

  @Listen('click')
  handleClick(e: MouseEvent) {
    if (!this.clickToClose) return;

    // event.target is always the shadow host
    // event.composedPath()[0] returns the node clicked when shadow root is open
    if (this.visible && e.composedPath()[0] === this.el) {
      this.handleClose(e);
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    if (!this.visible) return;

    const keyCode = e.key;
    if (keyCode === 'Escape') {
      this.handleClose(e);
    }
  }

  @Watch('visible')
  watchVisibleHandler() {
    // This is a workaround for determining when to call setupModal or teardownModal.
    // Elements are not yet available in the DOM due to `if (!visible) return null;`
    // See componentDidUpdate.
    this.isVisibleDirty = true;
  }

  componentDidLoad() {
    if (this.visible) this.setupModal();
  }

  /**
   *
   * Stencil's componentDidUpdate doesn't provide us with previous props to compare
   * and determine if we need to setup or destroy the modal. We can use a boolean
   * variable inside a Watch decorator as a workaround to determine if an update needs
   * to occur.
   */
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

  private handleClose(e) {
    this.closeEvent.emit(e);
  }

  /**
   * This method traps the focus inside our web component, prevents scrolling outside
   * the modal, and adds aria-hidden="true" to all elements outside the web component.
   * Fires analytics event unless disableAnalytics is true.
   */
  private setupModal() {
    const initialFocus = (this.el.querySelector(this.initialFocusSelector) ||
      this.el.shadowRoot.querySelector(
        this.initialFocusSelector,
      )) as HTMLElement;
    this.focusTrap = createFocusTrap(
      [this.el, this.alertActions, this.closeButtonContainer],
      {
        // trap is removed in teardownModal - disable escape key deactivating the focus trap
        escapeDeactivates: false,
        // the element we want to target immediately after opening modal
        initialFocus: initialFocus || this.closeButton,
      },
    );
    this.focusTrap.activate();
    disableBodyScroll(this.el);
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
          primaryButtonText: this.primaryButton?.text,
          secondayButtonText: this.secondaryButton?.text,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  /**
   * This method removes the focus trap, re-enables scrolling and
   * removes aria-hidden="true" from external elements.
   */
  private teardownModal() {
    this.focusTrap.deactivate();
    clearAllBodyScrollLocks();
    this.undoAriaHidden?.();

    document.body.classList.remove('modal-open');
  }

  render() {
    const {
      modalTitle,
      hideCloseButton,
      primaryButton,
      secondaryButton,
      status,
      visible,
    } = this;

    if (!visible) return null;

    const ariaLabel = `${modalTitle} modal` || 'Modal';
    const wrapperClass = classnames('va-modal-inner', {
      'va-modal-alert': status,
      [`va-modal-alert-${status}`]: status,
    });
    const bodyClass = status ? 'va-modal-alert-body' : 'va-modal-body';
    const titleClass = classnames(
      status ? 'va-modal-alert-title' : 'va-modal-title',
    );
    const contentClass = classnames({ 'va-modal-alert-text': status });
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
              <div class={contentClass}>
                <slot></slot>
              </div>
              {(primaryButton || secondaryButton) && (
                <div
                  class="alert-actions"
                  ref={el => (this.alertActions = el as HTMLDivElement)}
                >
                  {primaryButton && (
                    <button onClick={primaryButton.action} type="button">
                      {primaryButton.text}
                    </button>
                  )}
                  {secondaryButton && (
                    <button
                      class="button-secondary"
                      onClick={secondaryButton.action}
                      type="button"
                    >
                      {secondaryButton.text}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
