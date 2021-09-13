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
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;
    });
  });

  describe('onClose', () => {
    let wrapper;
    const onCloseSpy = sinon.spy();
    const props = {
      type: PROMO_BANNER_TYPES.announcement,
      href: 'https://missionact.va.gov/',
      text: TEXT,
      onClose: onCloseSpy,
    };

    beforeEach(() => {
      wrapper = shallow(<PromoBanner {...props} />);
    });

    afterEach(() => {
      onCloseSpy.resetHistory();
      wrapper.unmount();
    });

    it('should call onClose when the "x" button is clicked', () => {
      // Click close button in content
      const closeButton = wrapper.find('.vads-c-promo-banner__close button');
      closeButton.simulate('click');

      expect(onCloseSpy.called).to.be.true;
    });

    it('should not call onClose when the link is clicked', () => {
      // Click link in content
      const testLink = wrapper.find('.vads-c-promo-banner__content-link');
      testLink.simulate('click');

      expect(onCloseSpy.called).not.to.be.true;
    });
  });
});
