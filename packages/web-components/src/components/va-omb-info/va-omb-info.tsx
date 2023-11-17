import { Component, Host, h, Prop, State, Element } from '@stencil/core';

/**
 * @componentName OMB info
 * @maturityCategory use
 * @maturityLevel best_practice
 */
@Component({
  tag: 'va-omb-info',
  styleUrl: 'va-omb-info.css',
  shadow: true,
})
export class VaOmbInfo {
  @Element() el: HTMLElement;

  modalContents: HTMLDivElement | null = null;

  /**
   * If `true`, privacy act statement modal will be visible.
   */
  @State() visible: boolean;

  /* eslint-disable i18next/no-literal-string */
  /**
   * The name of the benefit displayed in the Respondent Burden section of the Privacy Act Statement.
   */
  @Prop() benefitType?: string = 'benefits';
  /* eslint-enable i18next/no-literal-string */

  /**
   * The form expiration date.
   */
  @Prop() expDate!: string;

  /**
   * The OMB control number or form number.
   */
  @Prop() ombNumber?: string;

  /**
   * Displays the Respondent Burden section in the Privacy Act Statement modal and how many minutes the form is expected to take.
   */
  @Prop() resBurden?: number;

  private toggleModalVisible = () => {
    this.visible = !this.visible;
  };

  private handleSlotChange = () => {
    this.modalContents = null;
  };

  // Redirects focus back to the modal, if the modal is open/visible
  private trapFocus() {
    const modal = this.el?.shadowRoot.querySelector('va-modal');
    const modalVisible = modal?.getAttribute('visible');

    if (modalVisible !== null && modalVisible !== 'false') {
      const modalCloseButton = modal?.shadowRoot.querySelector(
        'button.va-modal-close',
      ) as HTMLElement;
      modalCloseButton?.focus();
    }
  }

  componentWillLoad() {
    /* eslint-disable i18next/no-literal-string */
    this.modalContents = (
      <div>
        {this.resBurden && (
          <p>
            <strong>Respondent Burden:</strong> We need this information to
            determine your eligibility for {this.benefitType} (38 U.S.C. 3471).
            Title 38, United States Code, allows us to ask for this information.
            We estimate that you will need an average of {this.resBurden}{' '}
            minutes to review the instructions, find the information, and
            complete this form. The VA cannot conduct or sponsor a collection of
            information unless a valid OMB (Office of Management and Budget)
            control number is displayed. You are not required to respond to a
            collection of information if this number is not displayed. Valid OMB
            control numbers can be located on the OMB Internet Page at
            www.reginfo.gov/public/do/PRAMain. If desired, you can call{' '}
            <va-telephone contact="8008271000" international /> to get
            information on where to send comments or suggestions about this
            form.
          </p>
        )}
        <p>
          <strong>Privacy Act Notice:</strong> The VA will not disclose
          information collected on this form to any source other than what has
          been authorized under the Privacy Act of 1974 or title 38, Code of
          Federal Regulations, section 1.576 for routine uses (e.g., the VA
          sends educational forms or letters with a veteran’s identifying
          information to the Veteran’s school or training establishment to (1)
          assist the veteran in the completion of claims forms or (2) for the VA
          to obtain further information as may be necessary from the school for
          VA to properly process the Veteran’s education claim or to monitor his
          or her progress during training) as identified in the VA system of
          records, 58VA21/22/28, Compensation, Pension, Education, and
          Vocational Rehabilitation and Employment Records - VA, and published
          in the Federal Register. Your obligation to respond is required to
          obtain or retain
          {this.benefitType}. Giving us your SSN account information is
          voluntary. Refusal to provide your SSN by itself will not result in
          the denial of benefits. The VA will not deny an individual benefits
          for refusing to provide his or her SSN unless the disclosure of the
          SSN is required by a Federal Statute of law enacted before January 1,
          1975, and still in effect. The requested information is considered
          relevant and necessary to determine the maximum benefits under the
          law. While you do not have to respond, VA cannot process your claim
          for education assistance unless the information is furnished as
          required by existing law (38 U.S.C. 3471). The responses you submit
          are considered confidential (38 U.S.C. 5701). Any information provided
          by applicants, recipients, and others may be subject to verification
          through computer matching programs with other agencies.
        </p>
      </div>
    );
    /* eslint-enable i18next/no-literal-string */
  }

  render() {
    const {
      expDate,
      handleSlotChange,
      modalContents,
      ombNumber,
      resBurden,
      toggleModalVisible,
      visible,
    } = this;

    /* eslint-disable i18next/no-literal-string */
    return (
      <Host>
        {resBurden && (
          <div>
            Respondent burden: <strong>{resBurden} minutes</strong>
          </div>
        )}
        {ombNumber && (
          <div>
            OMB Control #: <strong>{ombNumber}</strong>
          </div>
        )}
        <div>
          Expiration date: <strong>{expDate}</strong>
        </div>
        <div>
          <va-button
            onClick={toggleModalVisible}
            onFocusin={() => this.trapFocus()}
            secondary
            text="View Privacy Act Statement"
          />
        </div>
        <va-modal
          large
          modalTitle="Privacy Act Statement"
          onCloseEvent={toggleModalVisible}
          visible={visible}
          ariaHiddenNodeExceptions={[this.el]}
        >
          <slot onSlotchange={handleSlotChange}></slot>
          {modalContents}
        </va-modal>
      </Host>
    );
  }
}
