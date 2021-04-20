import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { axeCheck } from '../../helpers/test-helpers';
import PromoBanner, { PROMO_BANNER_TYPES } from './PromoBanner.jsx';

const TEXT =
  'Learn how you can get easier access to health care with the MISSION Act';

describe('<PromoBanner>', () => {
  let defaultProps = null;

  beforeEach(() => {
    defaultProps = {
      type: PROMO_BANNER_TYPES.announcement,
      onClose() {},
      href: 'https://missionact.va.gov/',
      text: TEXT,
    };
  });

  it('should render', () => {
    const tree = shallow(<PromoBanner {...defaultProps} />);
    expect(tree.text()).to.contain(TEXT);
    tree.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<PromoBanner {...defaultProps} />));

  describe('analytics event', function () {
    let wrapper;

    beforeEach(() => {
      wrapper = shallow(<PromoBanner {...defaultProps} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should be triggered when link in PromoBanner content is clicked', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      // Click link in content
      const testLink = wrapper.find('.vads-c-promo-banner__content-link');
      testLink.simulate('click');

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'PromoBanner',
            action: 'linkClick',
            details: {
              text: defaultProps.text,
              href: defaultProps.href,
              target: defaultProps.target,
              type: defaultProps.type,
            },
          }),
        ),
      ).to.be.true;
    });
  });
});
