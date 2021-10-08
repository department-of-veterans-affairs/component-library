import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
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

  it('sets the aria-label attribute when the ariaLabel prop is given', () => {
    const ariaLabel = 'Help';

    const icon = ReactTestUtils.renderIntoDocument(
      <IconHelp
        cssClass="a-class"
        color="#000000"
        id="help"
        role="img"
        ariaLabel={ariaLabel}
      />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(ariaLabel);
  });

  it('does not include the aria-label attribute when the ariaLabel prop is not given', () => {
    const icon = ReactTestUtils.renderIntoDocument(
      <IconHelp cssClass="a-class" color="#000000" id="help" role="img" />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(null);
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
