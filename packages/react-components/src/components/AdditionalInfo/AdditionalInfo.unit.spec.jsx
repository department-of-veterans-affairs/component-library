import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import sinon from 'sinon';
import AdditionalInfo from './AdditionalInfo.jsx';
import ExpandingGroup from '../ExpandingGroup/ExpandingGroup';

describe('<AdditionalInfo/>', () => {
  describe('component', () => {
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
  });

  describe('expand keyboard test', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = mount(<AdditionalInfo triggerText="test" />).setState({
        open: false,
      });
    });

    it('should open and close', () => {
      const additionalInfoButton = wrapper.find('.additional-info-button');
      additionalInfoButton.simulate('keydown', { key: ' ' });
      expect(wrapper.state().open).to.equal(true);
      additionalInfoButton.simulate('keydown', { key: ' ' });
      expect(wrapper.state().open).to.equal(false);
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe('analytics event', () => {
    let wrapper;
    let handleAnalyticsEvent;

    const triggerText = 'This is test triggerText.';

    beforeEach(() => {
      wrapper = mount(<AdditionalInfo triggerText={triggerText} />).setState({
        open: false,
      });

      handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );
    });

    afterEach(() => {
      wrapper.unmount();

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );
    });

    it('should include the correct expand action', () => {
      const addtionalInfoButton = wrapper.find('.additional-info-button');
      addtionalInfoButton.simulate('click');

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.hasNested('detail.action', 'expand'),
        ),
      ).to.be.true;
    });

    it('should include the correct collapse action', () => {
      wrapper = mount(<AdditionalInfo triggerText="{triggerText}" />).setState({
        open: true,
      });

      const addtionalInfoButton = wrapper.find('.additional-info-button');
      addtionalInfoButton.simulate('click');

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.hasNested('detail.action', 'collapse'),
        ),
      ).to.be.true;
    });

    it('should include triggerText when present', () => {
      const addtionalInfoButton = wrapper.find('.additional-info-button');

      addtionalInfoButton.simulate('click');

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.hasNested('detail.details.triggerText', triggerText),
        ),
      ).to.be.true;
    });
  });
});
