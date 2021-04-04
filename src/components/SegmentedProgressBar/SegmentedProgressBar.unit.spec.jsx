import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import sinon from 'sinon';

import SegmentedProgressBar from './SegmentedProgressBar.jsx';

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

  describe('analytics event', function () {
    it('should be triggered when a SegmentedProgressBar is updated', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = shallow(<SegmentedProgressBar current={0} total={5} />);

      tree.setProps({ current: 1 });

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'SegmentedProgressBar',
            action: 'change',
            details: {
              current: 1,
              total: 5,
            },
          }),
        ),
      ).to.be.true;
    });
  });
});
