import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import PrivacyAgreement from './PrivacyAgreement.jsx';

describe('<PrivacyAgreement/>', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <PrivacyAgreement
        checked
        onChange={e => {
          e.target.checked;
        }}
      />,
    );
  });
  it('should render', () => {
    expect(wrapper.text()).to.eql(
      'I have read and accept the privacy policy(*Required)',
    );
  });

  it('should pass aXe check', () =>
    axeCheck(<PrivacyAgreement checked onChange={() => {}} />));
  it('Checkbox should be checked if props.checked = true', () => {
    const checkBox = wrapper.find('[type="checkbox"]').props();
    expect(checkBox.checked).to.be.true;
    expect(checkBox.onChange).to.be.a('function');
  });
  it('should show errorMessage when its passed as a prop', () => {
    wrapper.setProps({ checked: false, showError: true });
    const checkBox = wrapper.find('Checkbox');
    expect(checkBox.prop('errorMessage')).to.eql(
      'You must accept the privacy policy before continuing',
    );
    // should have error classes
    expect(checkBox.find('.usa-input-error')).to.have.lengthOf(1);
    expect(checkBox.find('.usa-input-error-label')).to.have.lengthOf(1);
    expect(checkBox.find('.usa-input-error-message')).to.have.lengthOf(1);
    return axeCheck(
      <PrivacyAgreement showError checked={false} onChange={() => {}} />,
    );
  });
  it('no error styles when errorMessage undefined', () => {
    // No error classes.
    const checkBox = wrapper.find('Checkbox');
    expect(checkBox.find('.usa-input-error')).to.have.lengthOf(0);
    expect(checkBox.find('.usa-input-error-label')).to.have.lengthOf(0);
    expect(checkBox.find('.usa-input-error-message')).to.have.lengthOf(0);
  });
});
