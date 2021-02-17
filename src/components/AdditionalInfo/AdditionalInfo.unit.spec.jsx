import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';

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

  describe('analytics event', () => {
    it('should include the correct expand action', () => {
      const handleExpandAnalyticsEvent = e => {
        expect(e.detail).to.deep.eql({
          componentName: 'AdditionalInfo',
          action: 'expand',
          details: {
            triggerText: 'This is test triggerText.',
          },
        });
      };

      global.document.body.addEventListener(
        'component-library-analytics',
        handleExpandAnalyticsEvent,
      );

      const wrapper = mount(
        <AdditionalInfo triggerText="This is test triggerText." />,
      ).setState({
        open: false,
      });

      const addtionalInfoButton = wrapper.find('.additional-info-button');

      addtionalInfoButton.simulate('click');

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleExpandAnalyticsEvent,
      );

      wrapper.unmount();
    });

    it('should include the correct collapse action', () => {
      const handleExpandAnalyticsEvent = e => {
        expect(e.detail).to.deep.eql({
          componentName: 'AdditionalInfo',
          action: 'collapse',
          details: {
            triggerText: 'This is test triggerText.',
          },
        });
      };

      global.document.body.addEventListener(
        'component-library-analytics',
        handleExpandAnalyticsEvent,
      );

      const wrapper = mount(
        <AdditionalInfo triggerText="This is test triggerText." />,
      ).setState({
        open: true,
      });

      const addtionalInfoButton = wrapper.find('.additional-info-button');

      addtionalInfoButton.simulate('click');

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleExpandAnalyticsEvent,
      );

      wrapper.unmount();
    });

    // it('should include triggerText when present', done => {
    //   const handleAnalyticsEvent = e => {
    //     expect(e.detail).to.eql({
    //       componentName: 'AdditionalInfo',
    //       action: 'expand',
    //       details: {
    //         triggerText: 'This is test triggerText.',
    //       },
    //     });
    //     done();
    //   };

    //   global.document.body.addEventListener(
    //     'component-library-analytics',
    //     handleAnalyticsEvent,
    //   );

    //   const wrapper = mount(
    //     <AdditionalInfo triggerText="This is test triggerText." />,
    //   ).setState({
    //     open: true,
    //   });

    //   global.document.body.removeEventListener(
    //     'component-library-analytics',
    //     handleAnalyticsEvent,
    //   );
    //   wrapper.unmount();
    // });
  });
});
