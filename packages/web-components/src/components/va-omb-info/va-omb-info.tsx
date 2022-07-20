import { Component, Host, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'va-omb-info',
  styleUrl: 'va-omb-info.css',
  shadow: true,
})
export class VaOmbInfo {
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

  render() {
    const {
      benefitType,
      expDate,
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
            Respondent burden: <span>{resBurden} minutes</span>
          </div>
        )}
        {ombNumber && (
          <div>
            OMB Control #: <span>{ombNumber}</span>
          </div>
        )}
        <div>
          Expiration date: <span>{expDate}</span>
        </div>
        <div>
          <button onClick={toggleModalVisible}>Privacy Act Statement</button>
        </div>
        {/* <slot></slot> */}
        <va-modal
          modalTitle="Privacy Act Statement"
          onCloseEvent={toggleModalVisible}
          visible={visible}
        ></va-modal>
      </Host>
    );
  }
}
