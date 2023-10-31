import { Component, Host, State, h } from '@stencil/core';
import arrowRightSvg from '../../assets/arrow-right-white.svg';
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
  @State() isOpen: boolean = false;
  parentNode: HTMLElement;

  setVisible() {
    this.isOpen = true;
  }

  setNotVisible() {
    this.isOpen = false;
  }

  private getParentNode() {
    this.parentNode = document.querySelector('div.va-crisis-line-container');
  }

  connectedCallback() {
    this.getParentNode();
  }

  render() {
    return (
      <Host>
        <div class="va-crisis-line-container">
          <button
            onClick={() => this.setVisible()}
            data-show="#modal-crisisline"
            class="va-crisis-line va-overlay-trigger"
            part="button"
          >
            <div class="va-crisis-line-inner">
              <span class="va-crisis-line-icon" aria-hidden="true"></span>
              <span class="va-crisis-line-text">
                Talk to the <strong>Veterans Crisis Line</strong> now
              </span>
              <img
                class="va-crisis-line-arrow"
                src={arrowRightSvg}
                aria-hidden="true"
              />
            </div>
          </button>
        </div>
        <va-modal
          clickToClose
          modalTitle="We’re here anytime, day or night – 24/7"
          onPrimaryButtonClick={() => this.setNotVisible()}
          onCloseEvent={() => this.setNotVisible()}
          visible={this.isOpen}
          large={true}
          uswds={true}
          ariaHiddenNodeExceptions={[this.parentNode]}
        >
          <p>
            If you are a Veteran in crisis or concerned about one, connect with
            our caring, qualified responders for confidential help. Many of them
            are Veterans themselves.
                </p>
                <ul class="va-crisis-panel-list">
                  <li>
                    <i
                      class="fa fa-phone va-crisis-panel-icon"
                      aria-hidden="true"
                    />
                    <span>
                      Call{' '}
                      <strong>
                        <va-telephone contact="988" /> and select 1
                      </strong>
                    </span>
                  </li>
                  <li>
                    <i
                      class="fa fa-mobile-alt va-crisis-panel-icon"
                      aria-hidden="true"
                    />
                    <span>
                      Text&nbsp;
                      <strong>
                        <va-telephone sms contact="838255" />
                      </strong>
                    </span>
                  </li>
                  <li>
                    <i
                      class="fa fa-comments va-crisis-panel-icon"
                      aria-hidden="true"
                    />
                    <a
                      class="no-external-icon"
                      href="https://www.veteranscrisisline.net/get-help-now/chat/"
                    >
                      Start a confidential chat
                    </a>
                  </li>
                  <li>
                    <i
                      class="fa fa-deaf va-crisis-panel-icon"
                      aria-hidden="true"
                    />
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
