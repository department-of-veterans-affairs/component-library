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
  State,
} from '@stencil/core';
import * as focusTrap from 'focus-trap';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { hideOthers } from 'aria-hidden';
import classnames from 'classnames';

@Component({
  tag: 'va-modal',
  styleUrl: 'va-modal.css',
  shadow: true,
})
export class VaModal {
  alertActions: HTMLDivElement;
  closeButton: HTMLButtonElement;
  contents: HTMLDivElement;
  dirty: boolean;
  trap: focusTrap.FocusTrap;

  @Element() el: HTMLElement;

  @Event({
    composed: true,
    bubbles: true,
  })
  closeEvent: EventEmitter;

  @Event({
    eventName: 'component-library-analytics',
    composed: true,
    bubbles: true,
  })
  componentLibraryAnalytics: EventEmitter;

  @Prop() clickToClose?: boolean = false;
  @Prop() disableAnalytics?: boolean = false;
  @Prop() headline?: string;
  @Prop() hideCloseButton?: boolean = false;
  @Prop() initialFocusSelector?: string;
  @Prop() primaryButton?: { text: string; action: () => void };
  @Prop() secondaryButton?: { text: string; action: () => void };
  @Prop() status?: 'continue' | 'error' | 'info' | 'success' | 'warning';
  @Prop() visible: boolean = false;

  @State() undo: any;

  @Listen('click')
  handleClick(e) {
    console.log('handleClick');
    if (!this.clickToClose) return;

    // event.target is always the shadow host
    // event.composedPath()[0] returns the node clicked when shadow root is open
    if (this.visible && e.composedPath()[0] === this.el) {
      this.closeEvent.emit(e);
    }
  }

  @Listen('keydown', { target: 'window' })
  handleKeyDown(e: KeyboardEvent) {
    console.log('handleKeyDown');
    if (!this.visible) return;

    const keyCode = e.key;
    if (keyCode === 'Escape') {
      this.handleClose(e);
    }
  }

  @Watch('visible')
  watchVisibleHandler() {
    this.dirty = true;
  }

  componentDidLoad() {
    if (this.visible) this.setupModal();
  }

  componentDidUpdate() {
    if (!this.dirty) return;

    this.dirty = false;
    if (this.visible) {
      this.setupModal();
    } else {
      this.teardownModal();
    }
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
    this.teardownModal();
  }

  private handleClose(e) {
    console.log('handleClose', e);
    e.preventDefault();
    this.closeEvent.emit(e);
  }

  private setupModal() {
    console.log('setupModal');
    this.trap = focusTrap.createFocusTrap(
      [this.el, this.alertActions, this.contents],
      {
        escapeDeactivates: false,
        fallbackFocus: this.contents,
        initialFocus: this.closeButton,
      },
    );
    this.trap.activate();
    disableBodyScroll(this.el);
    this.undo = hideOthers(this.el);

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
          title: this.headline, // does this need to be updated to details.headline?
          primaryButtonText: this.primaryButton?.text,
          secondayButtonText: this.secondaryButton?.text,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private teardownModal() {
    console.log('teardownModal');
    this.trap?.deactivate();
    clearAllBodyScrollLocks();
    this.undo?.();

    document.body.classList.remove('modal-open');
  }

  render() {
    const {
      headline,
      hideCloseButton,
      primaryButton,
      secondaryButton,
      status,
      visible,
    } = this;

    if (!visible) return null;

    const titleId = `${this.el.getAttribute('id') || 'va-modal'}-title`;
    const wrapperClass = classnames('va-modal-inner', {
      'usa-alert': status,
      [`usa-alert-${status}`]: status,
      'va-modal-alert': status,
    });
    const bodyClass = status ? 'usa-alert-body' : 'va-modal-body';
    const titleClass = classnames(
      status ? 'usa-alert-heading' : 'va-modal-title',
      'vads-u-font-size--h3',
    );
    // const contentClass = classnames({ 'usa-alert-text': status });
    const ariaRole = status => {
      if (status === 'warning' || status === 'error') {
        return 'alertdialog';
      }
      return 'dialog';
    };
    const btnAriaLabel = headline ? `close ${headline} modal` : 'close modal';

    return (
      <Host
        aria-labelledby={titleId}
        aria-modal
        class="va-modal"
        role={ariaRole(status)}
      >
        <div
          class={wrapperClass}
          ref={el => (this.contents = el as HTMLDivElement)}
          tabIndex={-1}
        >
          {!hideCloseButton && (
            <button
              aria-label={btnAriaLabel}
              class="va-modal-close"
              onClick={this.handleClose.bind(this)}
              ref={el => (this.closeButton = el as HTMLButtonElement)}
              type="button"
            >
              <i aria-hidden="true" class="fas fa-times-circle" />
            </button>
          )}
          <div class={bodyClass}>
            <div role="document">
              {headline && (
                <h1 class={titleClass} id={titleId} tabIndex={-1}>
                  {headline}
                </h1>
              )}
              <slot></slot>
              {(primaryButton || secondaryButton) && (
                <div
                  class="alert-actions"
                  ref={el => (this.alertActions = el as HTMLDivElement)}
                >
                  {primaryButton && (
                    <button
                      class="usa-button"
                      onClick={primaryButton.action}
                      type="button"
                    >
                      {primaryButton.text}
                    </button>
                  )}
                  {secondaryButton && (
                    <button
                      class="usa-button-secondary"
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
