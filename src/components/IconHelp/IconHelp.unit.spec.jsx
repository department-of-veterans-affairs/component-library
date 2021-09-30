import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';

import IconHelp from './IconHelp.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconHelp />', () => {
  it('Should Render', () => {
    const wrapper = shallow(
      <IconHelp
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="Help"
      />,
    );

    expect(wrapper.exists('.a-class')).to.equal(true);

    wrapper.unmount();
  });

  it('sets aria-label when a valid value for the ariaLabel prop is provided', () => {
    const ariaLabel = 'Help';
    const wrapper = mount(
      <IconHelp
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel={ariaLabel}
      />,
    );
    const IconHelpComponent = wrapper.find('IconHelp');
    expect(IconHelpComponent.props().ariaLabel).to.equal(ariaLabel);

    const IconBaseComponent = wrapper.find('IconBase');
    expect(IconBaseComponent.props().ariaLabel).to.equal(ariaLabel);

    wrapper.unmount();
  });

  it('should pass a basic aXe check', () =>
    axeCheck(
      <IconHelp
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="Help"
      />,
    ));
});
