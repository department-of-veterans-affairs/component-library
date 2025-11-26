import { Component, Host, State, h, Element, Listen, Prop } from '@stencil/core';
import { CONTACTS_WITH_EXTENSION } from '../../contacts';

/**
 * @componentName Crisis Line Modal
 * @maturityCategory caution
 * @maturityLevel available
 **/

@Component({
  tag: 'va-crisis-line-modal',
  styleUrl: 'va-crisis-line-modal.scss',
  shadow: true,
})

export class VACrisisLineModal {
  
  @Element() el: HTMLElement;

  /** Tracks the element that owns the modal rendering to prevent multiple modals. */
  private static modalOwner: HTMLElement | null = null;

  /** Internal flag: this instance will render the modal (determined by DOM query). */
  private allowModalRender: boolean = false;

  /**
   * Phone number for the crisis line. Defaults to 988.
   */
  @Prop() phoneNumber?: string = '988';

  /**
   * Phone extension for the crisis line. Defaults to 1.
   */
  @Prop() phoneExtension?: string = '1';

  /**
   * Text number for the crisis line. Defaults to 838255.
   */
  @Prop() textNumber?: string = '838255';

  /**
   * URL for the chat service. Defaults to Veterans Crisis Line chat.
   */
  @Prop() chatUrl?: string = 'https://www.veteranscrisisline.net/get-help-now/chat/';

  /**
   * TTY number for the crisis line. Defaults to 711.
   */
  @Prop() ttyNumber?: string = CONTACTS_WITH_EXTENSION.CRISIS_MODAL_TTY.phoneNumber || '711';

  /**
   * TTY extension for the crisis line. Defaults to 988.
   */
  @Prop() ttyCrisisExtension?: string = CONTACTS_WITH_EXTENSION.CRISIS_MODAL_TTY.extension || '988';

  /**
   * Determines what to render:
   * - `'trigger'`: Renders only the trigger button (no modal in DOM). Use the document event to open a separate modal instance.
   * - `'modal'`: Renders only the modal (no trigger button). Dispatch the custom event `vaCrisisLineModalOpen` on `document` to open it.
   * - `null` or `undefined`: Renders both trigger and modal (default behavior).
   */
  @Prop() mode?: 'trigger' | 'modal' = undefined;

  @State() isOpen: boolean = false;

  /**
   * Local state to track if the shift key is pressed
   */
  @State() shifted: boolean = false;

  /**
   * Listen for the global document event to open the modal. Any code can trigger:
   * `document.dispatchEvent(new CustomEvent('vaCrisisLineModalOpen'))` to open a modal instance.
   */
  @Listen('vaCrisisLineModalOpen', { target: 'document' })
  handleGlobalOpen() {
    if (this.allowModalRender) {
      this.open();
    }
  }

  open() {
    this.setVisible();
  }

  setVisible() {
    this.isOpen = true;
  }

  setNotVisible() {
    this.isOpen = false;
  }

  /**
   * Before first render decide if this instance should render the modal.
   * It will render only if:
   *  - `mode` is 'modal' OR `mode` is undefined/null
   *  - AND no other crisis line modal has already marked itself as a modal renderer.
   * Ownership is tracked via a static property to prevent race conditions.
   */
  componentWillLoad() {
    if (!VACrisisLineModal.modalOwner && this.mode !== 'trigger') {
      this.allowModalRender = true;
      VACrisisLineModal.modalOwner = this.el;
    }
  }

  /**
   * If the owning instance disconnects, remove the marker so a newly added instance can provide a modal.
   */
  disconnectedCallback() {
    if (VACrisisLineModal.modalOwner === this.el) {
      VACrisisLineModal.modalOwner = null;
    }
  }

  // This keydown event listener tracks if the shift key is held down while changing focus
  @Listen('keydown', { target: 'window' })
  trackShiftKey(e: KeyboardEvent) {
    this.shifted = e.shiftKey;
  }

  // Redirects focus back to the modal, if the modal is open/visible
  private trapFocus() {
    const modal = this.el?.shadowRoot.querySelector('va-modal');
    const modalVisible = modal?.getAttribute('visible');

    if (modalVisible !== null && modalVisible !== 'false') {
      let focusedChild;
      const query = this.shifted
        ? '.last-focusable-child'
        : '[role="document"]';
      if (this.shifted) {
        focusedChild = modal?.querySelector(query) as HTMLElement;
      } else {
        focusedChild = modal?.shadowRoot.querySelector(query) as HTMLElement;
      }

      focusedChild?.focus();
    }
  }

  render() {
    const {
      phoneNumber,
      phoneExtension,
      textNumber,
      chatUrl,
      ttyNumber,
      ttyCrisisExtension,
      mode
    } = this;

    const showTrigger = mode !== 'modal';
    const showModal = this.allowModalRender && mode !== 'trigger';

    return (
      <Host>
        {showTrigger && (
          <div class="va-crisis-line-container">
            <button
              onClick={() => document.dispatchEvent(new CustomEvent('vaCrisisLineModalOpen'))}
              onFocusin={() => this.trapFocus()}
              data-show="#modal-crisisline"
              class="va-crisis-line va-overlay-trigger"
              part="button"
            >
              <div class="va-crisis-line-inner">
                <span class="va-crisis-line-icon" aria-hidden="true"></span>
                <span class="va-crisis-line-text">
                  Talk to the <strong>Veterans Crisis Line</strong> now
                </span>
                <va-icon
                  class="va-icon__right-arrow"
                  icon="navigate_next"
                  size={3}
                ></va-icon>
              </div>
            </button>
          </div>
        )}
        {showModal && (
          <va-modal
            modalTitle="We’re here anytime, day or night – 24/7"
            onPrimaryButtonClick={() => this.setNotVisible()}
            onCloseEvent={() => this.setNotVisible()}
            visible={this.isOpen}
            large={true}
          >
            <p>
              If you are a Veteran in crisis or concerned about one, connect with
              our caring, qualified responders for confidential help. Many of them
              are Veterans themselves.
            </p>
            <ul class="va-crisis-panel-list">
              <li>
                <va-icon class="va-clm__icon" icon="phone" size={3}></va-icon>
                <span>Call{' '}<strong><va-telephone contact={phoneNumber} />{phoneExtension ? ` and select ${phoneExtension}` : null}</strong></span>
              </li>
              <li>
                <va-icon
                  icon="phone_iphone"
                  class="va-clm__icon"
                  size={3}
                ></va-icon>
                <span>Text&nbsp;<strong><va-telephone sms contact={textNumber} /></strong></span>
              </li>
              <li>
                <va-icon icon="chat" class="va-clm__icon" size={3}></va-icon>
                <a class="no-external-icon" href={chatUrl}>
                  Start a confidential chat
                </a>
              </li>
              <li>
                <va-icon icon="tty" class="va-clm__icon" size={3}></va-icon>
                <p>For TTY, call{' '}
                <strong>
                  <va-telephone contact={ttyNumber} />
                  {ttyCrisisExtension ? ` then ${ttyCrisisExtension}` : null}
                </strong>
                </p>
              </li>
            </ul>
            <p>
              Get more resources at{' '}
              <a
                class="no-external-icon"
                href="https://www.veteranscrisisline.net/"
              >
                VeteransCrisisLine.net
              </a>
            </p>
          </va-modal>
        )}
      </Host>
    );
  }
}
