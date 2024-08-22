import { Component, Host, State, h, Element, Listen } from '@stencil/core';
import { CONTACTS } from '../../contacts';

/**
 * @componentName Crisis Line Modal
 * @maturityCategory caution
 * @maturityLevel candidate
 */

@Component({
  tag: 'va-crisis-line-modal',
  styleUrl: 'va-crisis-line-modal.scss',
  shadow: true,
})
export class VACrisisLineModal {
  @Element() el: HTMLElement;

  @State() isOpen: boolean = false;

  /**
   * Local state to track if the shift key is pressed
   */
  @State() shifted: boolean = false;

  setVisible() {
    this.isOpen = true;
  }

  setNotVisible() {
    this.isOpen = false;
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
    return (
      <Host>
        <div class="va-crisis-line-container">
          <button
            onClick={() => this.setVisible()}
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
              <span>
                Call{' '}
                <strong>
                  <va-telephone contact="988" /> and select 1
                </strong>
              </span>
            </li>
            <li>
              <va-icon
                icon="phone_iphone"
                class="va-clm__icon"
                size={3}
              ></va-icon>
              <span>
                Text&nbsp;
                <strong>
                  <va-telephone sms contact="838255" />
                </strong>
              </span>
            </li>
            <li>
              <va-icon icon="chat" class="va-clm__icon" size={3}></va-icon>
              <a
                class="no-external-icon"
                href="https://www.veteranscrisisline.net/get-help-now/chat/"
              >
                Start a confidential chat
              </a>
            </li>
            <li>
              <va-icon icon="tty" class="va-clm__icon" size={3}></va-icon>
              <p>
                Call TTY if you have hearing loss{' '}
                <strong>
                  <va-telephone tty contact={CONTACTS.CRISIS_TTY} />
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
      </Host>
    );
  }
}
