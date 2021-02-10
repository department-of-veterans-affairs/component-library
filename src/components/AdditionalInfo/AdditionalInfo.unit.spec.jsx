import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';

import AdditionalInfo from './AdditionalInfo.jsx';
import ExpandingGroup from '../ExpandingGroup/ExpandingGroup';

describe('<AdditionalInfo/>', () => {
  let wrapper;
  // for the sake of more tests could be written
  // declared beforeEach and assigned to wrapper
  beforeEach(() => {
    wrapper = mount(<AdditionalInfo triggerText="test" />).setState({
      open: true,
    });
  });

  it('should render', () => {
    expect(wrapper.text()).to.contain('test');
    expect(wrapper.find('h4').length).to.equal(0);
  });
  it('should pass aXe check', () =>
    axeCheck(<AdditionalInfo triggerText="test" />));
  it('should render title container as heading', () => {
    wrapper = mount(
      <AdditionalInfo tagName={'h4'} triggerText="test" />,
    ).setState({
      open: true,
    });
    expect(wrapper.find('h4').length).to.equal(1);
    wrapper.unmount();
  });
  it('renders both children when open is true', () => {
    const first = wrapper.find('ExpandingGroup').props();
    expect(first.open).to.be.true;
    return axeCheck(
      <ExpandingGroup open={first.open}>
        <div className="child1" />
        <div className="child2" />
      </ExpandingGroup>,
    );
  });

  describe('dataLayer', () => {

    beforeEach(() => {
      global.window.dataLayer = [];
    })

    it('should add triggerText when present', () => {
      expect(
        global.window.dataLayer.find(
          ev => ev.event === 'int-additional-info-expand',

        ),
      ).not.to.exist;
      
      const tree = mount(<AdditionalInfo triggerText="This is test triggerText." />).setState({
        open: true,
      });

      console.log(global.window.dataLayer);

      expect(
        global.window.dataLayer.find(
          ev => ev.event === 'int-additional-info-expand' &&
          ev["additional-info-triggerText"] === "This is test triggerText."
        ),
      ).to.exist;
    });
  });

});
