import { Component, Host, State, h } from '@stencil/core';
import arrowRightSvg from '../../assets/arrow-right-white.svg';
import { CONTACTS } from '../../../../react-components/src/components/Telephone/contacts';

@Component({
  tag: 'va-crisis-line-modal',
  styleUrl: 'va-crisis-line-modal.scss',
  shadow: true,
})
export class VACrisisLineModal {
  @State() isOpen: boolean = false;
  
  setVisible() {
    this.isOpen = true;
  }

  setNotVisible() {
    this.isOpen = false;
  }
  

  render() {
    return (
      <Host>
        <div class="va-crisis-line-container">
          <button onClick={()=>this.setVisible()} data-show="#modal-crisisline" class="va-crisis-line va-overlay-trigger">
            <div class="va-crisis-line-inner">
              <span class="va-crisis-line-icon" aria-hidden="true"></span>
              <span class="va-crisis-line-text" >Talk to the <strong>Veterans Crisis Line</strong> now</span>
              <img class="va-crisis-line-arrow" src={arrowRightSvg} aria-hidden="true"/>
            </div>
          </button>
        </div>
        <va-modal
          modalTitle="We’re here anytime, day or night – 24/7"
          onPrimaryButtonClick={() => this.setNotVisible()}
          onCloseEvent={() => this.setNotVisible()}
          visible={this.isOpen}
        >
          <div
      id="modal-crisisline"
      class="va-overlay va-modal va-modal-large"
      role="alertdialog"
    >
      <div class="va-crisis-panel va-modal-inner">
        <div class="va-overlay-body va-crisis-panel-body">
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
              {
                <a href="tel:988">
                  Call <strong>988 and select 1</strong>
                </a>
              }
            </li>
            <li>
              <i
                class="fa fa-mobile-alt va-crisis-panel-icon"
                aria-hidden="true"
              />
              <span>Text&nbsp;<va-telephone sms contact="838255" /></span>
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
                Call TTY if you have hearing loss <strong class="vads-u-margin-left--0p5">
                  <va-telephone tty contact={CONTACTS.CRISIS_TTY} />
                </strong>
              </p>
            </li>
          </ul>
          Get more resources at{' '}
          <a
            class="no-external-icon"
            href="https://www.veteranscrisisline.net/"
          >
            VeteransCrisisLine.net
          </a>
          .
        </div>
      </div>
    </div>
        </va-modal>
      </Host>
    );
  }

}