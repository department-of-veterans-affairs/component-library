import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import FeaturedContent from './FeaturedContent.jsx';
import { axeCheck } from '../../helpers/test-helpers';

const headingText = "If I'm a Veteran, can I get VR&E benefits and services?";
const component = (
  <FeaturedContent headingLevel={3} headingText={`${headingText}`}>
    <p>
      You may be eligible for VR&E benefits and services if you’re a Veteran,
      and you meet all of the requirements listed below.
    </p>
    <p>
      <strong>All of these must be true. You:</strong>
    </p>
    <ul>
      <li>
        Didn’t receive a dishonorable discharge, <strong>and</strong>
      </li>
      <li>
        Have a service-connected disability rating of at least 10% from VA,
        <strong>and</strong>
      </li>
      <li>
        <a href="#">Apply for VR&amp;E services</a>
      </li>
    </ul>
  </FeaturedContent>
);
let wrapper;

describe('<FeaturedContent />', () => {
  before(() => {
    wrapper = shallow(component);
  });

  it('should render the component', () => {
    expect(wrapper.exists('.feature')).to.equal(true);
  });

  it('should render the correct section heading level', () => {
    expect(wrapper.exists('h3')).to.equal(true);
  });

  it('should render the correct section heading text', () => {
    expect(wrapper.find('h3').text()).to.equal(headingText);
  });

  it('should render props.children', () => {
    expect(wrapper.find('p').length).to.equal(2);
    expect(wrapper.find('ul').length).to.equal(1);
    expect(wrapper.find('li').length).to.equal(3);
  });

  it('should pass a basic aXe check', () => axeCheck(component));
});
