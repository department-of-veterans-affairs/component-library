import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import sinon from 'sinon';

import ProgressBar from './ProgressBar.jsx';

describe('<ProgressBar/>', () => {
  it('should render', () => {
    const tree = shallow(<ProgressBar percent={35} />);
    expect(tree.find('.progress-bar-inner')).to.have.length(1);
    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<ProgressBar percent={35} label="aria label here" />));

  describe('analytics event', function () {
    it('should be triggered when a ProgressBar is mounted at 0%', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = mount(
        <ProgressBar percent={0} label="This is my ProgressBar." />,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'ProgressBar',
            action: 'change',
            details: {
              percent: 0,
              label: 'This is my ProgressBar.',
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });

    it('should be triggered when a ProgressBar updates to 100%', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      const tree = mount(
        <ProgressBar percent={42} label="This is my ProgressBar." />,
      );

      tree.setProps({ percent: 100 });

      // We should onnly see the 100% event

      expect(
        handleAnalyticsEvent.calledOnceWith(
          sinon.match.has('detail', {
            componentName: 'ProgressBar',
            action: 'change',
            details: {
              percent: 100,
              label: 'This is my ProgressBar.',
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      tree.unmount();
    });
  });
});
