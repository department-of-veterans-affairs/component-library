import { Component, Host, State, h, Element, Listen, Prop, Watch } from '@stencil/core';
import { CONTACTS_WITH_EXTENSION } from '../../contacts';

/**
 * @componentName Crisis Line Modal
 * @maturityCategory caution
 * @maturityLevel available
 */

@Component({
  tag: 'va-crisis-line-modal',
  styleUrl: 'va-crisis-line-modal.scss',
  shadow: true,
})
export class VACrisisLineModal {
  @Element() el: HTMLElement;

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
   * Selector for an external button that should trigger the modal.
   * When provided, the internal trigger button will not be rendered.
   * Accepts ID (#myButton), class (.my-button), or attribute selector.
   */
  @Prop() triggerRef?: string;

  @State() isOpen: boolean = false;

  /**
   * Local state to track if the shift key is pressed
   */
  @State() shifted: boolean = false;

  private triggerElement: HTMLElement | null = null;

  @Watch('triggerRef')
  onTriggerRefChange(newValue: string) {
    this.attachTriggerListeners(newValue);
  }

  componentDidLoad() {
    if (this.triggerRef) {
      this.attachTriggerListeners(this.triggerRef);
    }
  }

  disconnectedCallback() {
    this.detachTriggerListeners();
  }

  private attachTriggerListeners(selector: string) {
    this.detachTriggerListeners();
    
    if (!selector) return;

    // Find element by ID, class, or other selector
    const element = selector.startsWith('#')
      ? document.getElementById(selector.slice(1))
      : document.querySelector(selector);
    
    if (element instanceof HTMLElement) {
      this.triggerElement = element;
      this.triggerElement.addEventListener('click', this.onExternalTriggerClick);
      this.triggerElement.addEventListener('focusin', this.onExternalTriggerFocus);
    }
  }

  private detachTriggerListeners() {
    if (this.triggerElement) {
      this.triggerElement.removeEventListener('click', this.onExternalTriggerClick);
      this.triggerElement.removeEventListener('focusin', this.onExternalTriggerFocus);
      this.triggerElement = null;
    }
  }

  private onExternalTriggerClick = () => {
    this.open();
  };

  private onExternalTriggerFocus = () => {
    this.trapFocus();
  };

 open() {
    this.setVisible();
  }

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
    const {
      phoneNumber,
      phoneExtension,
      textNumber,
      chatUrl,
      ttyNumber,
      ttyCrisisExtension,
      triggerRef
    } = this;
    return (
      <Host>
        {!triggerRef && (
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
        )}
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
      </Host>
    );
  }
}
