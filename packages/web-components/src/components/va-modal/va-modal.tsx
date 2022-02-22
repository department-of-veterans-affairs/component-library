import {
  Component,
  Element,
  Event,
  EventEmitter,
  Host,
  h,
  Prop,
  Watch,
  State,
} from '@stencil/core';
import focusLock from 'dom-focus-lock';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import { hideOthers } from 'aria-hidden';
import classnames from 'classnames';

@Component({
  tag: 'va-modal',
  styleUrl: 'va-modal.css',
  shadow: true,
})
export class VaModal {
  @Element() el: any;

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

  @Prop() clickToClose: boolean = false;
  @Prop() disableAnalytics: boolean = false;
  @Prop() headline: string;
  @Prop() hideCloseButton: boolean = false;
  @Prop() initialFocusSelector?: string;
  @Prop() primaryButton?: { text: string; action: () => void };
  @Prop() secondaryButton?: { text: string; action: () => void };
  @Prop() status: 'continue' | 'error' | 'info' | 'success' | 'warning';
  @Prop() visible: boolean = false;

  @State() undo: any;

  private handleClose(e) {
    console.log('handleClose', e);
    e.preventDefault();
    this.closeEvent.emit(e);
  }

  private handleDocumentKeyDown(event) {
    console.log('handleDocumentKeyDown');
    if (event.keyCode === 27) {
      this.handleClose(event);
    }
  }

  private handleDocumentClicked(event) {
    console.log('handleDocumentClicked');
    if (this.visible && !this.el.contains(event.target)) {
      console.log(event.target);
      this.closeEvent.emit();
    }
  }

  private setInitialModalFocus() {
    console.log('setInitialModalFocus');
    if (this.initialFocusSelector) {
      const focusableElement = this.el.shadowRoot.querySelector(
        this.initialFocusSelector,
      );
      if (focusableElement) {
        focusableElement.setAttribute('data-autofocus', 'true');
      }
    }
  }

  private setupModal() {
    console.log('setupModal');
    this.setInitialModalFocus();

    // Verify this is the correct element to target for these packages
    focusLock.on(this.el); // not working
    disableBodyScroll(this.el); // working
    this.undo = hideOthers(this.el); // working

    // NOTE: With this PR (https://github.com/department-of-veterans-affairs/vets-website/pull/11712)
    // we rely on the existence of `body.modal-open` to determine if a modal is
    // currently open and adjust programmatic scrolling if there is.
    document.body.classList.add('modal-open');
    document.addEventListener(
      'keydown',
      this.handleDocumentKeyDown.bind(this),
      false,
    );
    if (this.clickToClose) {
      document.addEventListener(
        'click',
        this.handleDocumentClicked.bind(this),
        true,
      );
    }
    // Conditionally track the event.
    if (!this.disableAnalytics) {
      const detail = {
        componentName: 'va-modal',
        action: 'show',
        details: {
          status: this.status,
          title: this.headline, // does this need to be updated to headline?
          primaryButtonText: this.primaryButton?.text,
          secondayButtonText: this.secondaryButton?.text,
        },
      };
      this.componentLibraryAnalytics.emit(detail);
    }
  }

  private teardownModal() {
    console.log('teardownModal');

    focusLock.off(this.el);
    clearAllBodyScrollLocks();
    this.undo();

    document.body.classList.remove('modal-open');
    document.removeEventListener(
      'keydown',
      this.handleDocumentKeyDown.bind(this),
      false,
    );
    if (this.clickToClose) {
      document.removeEventListener(
        'click',
        this.handleDocumentClicked.bind(this),
        true,
      );
    }
  }

  @Watch('visible')
  watchVisibleHandler(newVisible: boolean) {
    console.log('watchVisibleHandler');
    if (newVisible) return this.setupModal();
    this.teardownModal();
  }

  componentDidLoad() {
    if (this.visible) this.setupModal();
  }

  disconnectedCallback() {
    if (this.visible) {
      this.teardownModal();
    }
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
      <Host>
        <div
          class="va-modal"
          aria-labelledby={titleId}
          aria-modal
          role={ariaRole(status)}
        >
          <div class={wrapperClass}>
            {!hideCloseButton && (
              <button
                class="va-modal-close"
                type="button"
                aria-label={btnAriaLabel}
                onClick={this.handleClose.bind(this)}
              >
                <i class="fas fa-times-circle" aria-hidden="true" />
              </button>
            )}
            <div class={bodyClass}>
              <div role="document">
                {headline && (
                  <h1 id={titleId} class={titleClass} tabIndex={-1}>
                    {headline}
                  </h1>
                )}
                <slot></slot>
                {(primaryButton || secondaryButton) && (
                  <div class="alert-actions">
                    {primaryButton && (
                      <button class="usa-button" onClick={primaryButton.action}>
                        {primaryButton.text}
                      </button>
                    )}
                    {secondaryButton && (
                      <button
                        class="usa-button-secondary"
                        onClick={secondaryButton.action}
                      >
                        {secondaryButton.text}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
