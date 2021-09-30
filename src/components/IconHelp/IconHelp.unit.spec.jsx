import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

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
