import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IconUser from './IconUser.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconUser />', () => {
  it('Should Render', () => {
    const wrapper = shallow(
      <IconUser
        cssClass="a-class"
        color="#000000"
        id="user"
        role="img"
        ariaLabel="user"
      />,
    );

    expect(wrapper.exists('.a-class')).to.equal(true);

    wrapper.unmount();
  });

  it('sets the aria-label attribute when the ariaLabel prop is given', () => {
    const ariaLabel = 'user';

    const icon = ReactTestUtils.renderIntoDocument(
      <IconUser
        cssClass="a-class"
        color="#000000"
        id="user"
        role="img"
        ariaLabel={ariaLabel}
      />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(ariaLabel);
  });

  it('does not include the aria-label attribute when the ariaLabel prop is not given', () => {
    const icon = ReactTestUtils.renderIntoDocument(
      <IconUser cssClass="a-class" color="#000000" id="user" role="img" />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(null);
  });

  it('should pass a basic aXe check', () =>
    axeCheck(
      <IconUser
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel="user"
      />,
    ));
});
