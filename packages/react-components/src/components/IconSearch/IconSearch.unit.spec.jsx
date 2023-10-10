import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import IconSearch from './IconSearch.jsx';
import { axeCheck } from '../../helpers/test-helpers';

describe('<IconSearch />', () => {
  it('Should Render', () => {
    const wrapper = shallow(
      <IconSearch
        cssClass="a-class"
        color="#000000"
        id="search"
        role="img"
        ariaLabel="Search"
      />,
    );

    expect(wrapper.exists('.a-class')).to.equal(true);

    wrapper.unmount();
  });

  it('sets the aria-label attribute when the ariaLabel prop is given', () => {
    const ariaLabel = 'Search';

    const icon = ReactTestUtils.renderIntoDocument(
      <IconSearch
        cssClass="a-class"
        color="#000000"
        id="search"
        role="img"
        ariaLabel={ariaLabel}
      />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(ariaLabel);
  });

  it('does not include the aria-label attribute when the ariaLabel prop is not given', () => {
    const icon = ReactTestUtils.renderIntoDocument(
      <IconSearch cssClass="a-class" color="#000000" id="search" role="img" />,
    );
    var svg = ReactTestUtils.findRenderedDOMComponentWithTag(icon, 'svg');
    expect(svg.getAttribute('aria-label')).to.equal(null);
  });

  it.skip('should pass a basic aXe check', () =>
    axeCheck(
      <IconSearch
        cssClass="a-class"
        color="#000000"
        id="search"
        role="img"
        ariaLabel="Search"
      />,
    ));
});
