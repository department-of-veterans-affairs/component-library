import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import sinon from 'sinon';

import SegmentedProgressBar from './SegmentedProgressBar.jsx';
import { testAnalytics } from '../../helpers/test-helpers';

describe('<SegmentedProgressBar/>', () => {
  it('should render', () => {
    const tree = shallow(<SegmentedProgressBar current={2} total={5} />);
    expect(tree.find('.progress-segment')).to.have.length(5);
    expect(tree.find('.progress-segment-complete').length).to.equal(2);
    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(
      <SegmentedProgressBar current={2} total={5} label="aria label here" />,
    ));

  describe('optional aria label event', () => {
    it('should replace the aria label when an ariaLabel prop is passed', () => {
      const wrapper = mount(
        <SegmentedProgressBar
          current={2}
          total={5}
          ariaLabel={'Step 2: Basic Info'}
        />,
      );
      expect(wrapper.find(SegmentedProgressBar).prop('ariaLabel')).to.equal(
        'Step 2: Basic Info',
      );
    });

    it('should pass aXe check', () =>
      axeCheck(
        <SegmentedProgressBar
          current={2}
          total={5}
          ariaLabel="aria label here"
        />,
      ));

    it('should pass aXe check', () =>
      axeCheck(<SegmentedProgressBar current={2} total={5} />));
  });

  describe('analytics event', function () {
    it('should be triggered when a SegmentedProgressBar is mounted', () => {
      let tree;

      const spy = testAnalytics(tree, () => {
        tree = mount(
          <SegmentedProgressBar current={0} total={5} enableAnalytics />,
        );
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'SegmentedProgressBar',
            action: 'change',
            details: {
              current: 0,
              total: 5,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      tree.unmount();
    });

    it('should be triggered when a SegmentedProgressBar is updated', () => {
      const tree = mount(
        <SegmentedProgressBar current={0} total={5} enableAnalytics />,
      );

      const spy = testAnalytics(tree, () => {
        tree.setProps({ current: 1 });
      });

      expect(
        spy.calledWith(
          sinon.match.has('detail', {
            componentName: 'SegmentedProgressBar',
            action: 'change',
            details: {
              current: 1,
              total: 5,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      tree.unmount();
    });
  });
});
