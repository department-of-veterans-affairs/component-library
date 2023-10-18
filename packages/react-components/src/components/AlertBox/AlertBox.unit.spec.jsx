import React from 'react';
import { shallow, mount } from 'enzyme';
import { axeCheck } from '../../helpers/test-helpers';
import { expect } from 'chai';
import sinon from 'sinon';

import AlertBox from './AlertBox.jsx';

// Placeholder for required "content" element
const Content = <p />;
const Headline = 'Headline';
const CloseBtnAriaLabelOptional = 'Close notification optional';
function closeAlert() {
  //
}

describe('<AlertBox />', () => {
  it('should be an empty div if invisible', () => {
    const wrapper = shallow(
      <AlertBox content={Content} status="info" isVisible={false} />,
    );
    expect(wrapper.html()).to.equal('<div aria-live="polite"></div>');
    wrapper.unmount();
  });

  it('should have the expected classnames', () => {
    const wrapper = shallow(
      <AlertBox content={Content} status="info" isVisible />,
    );
    expect(wrapper.find('.usa-alert').hasClass('usa-alert-info')).to.equal(
      true,
    );
    expect(
      wrapper.find('.usa-alert').hasClass('background-color-only'),
    ).to.equal(false);
    wrapper.unmount();
  });

  it('should have have `background-color-only` class added when `backgroundOnly` is `true`', () => {
    const wrapper = shallow(
      <AlertBox content={Content} status="info" isVisible backgroundOnly />,
    );
    expect(
      wrapper.find('.usa-alert').hasClass('background-color-only'),
    ).to.equal(true);
    wrapper.unmount();
  });

  it('should apply classes set via `className`', () => {
    const wrapper = shallow(
      <AlertBox content={Content} status="info" isVisible className="foo" />,
    );
    expect(wrapper.find('.usa-alert').hasClass('foo')).to.equal(true);
    wrapper.unmount();
  });

  it('should use level prop for headline element', () => {
    const wrapper = shallow(
      <AlertBox
        content={Content}
        status="info"
        level={4}
        headline="Testing"
        isVisible
        className="foo"
      />,
    );
    expect(wrapper.find('.usa-alert-heading').is('h4')).to.equal(true);
    wrapper.unmount();
  });

  it('should pass aXe check when visible', () =>
    axeCheck(<AlertBox content={Content} status="info" isVisible />));

  it('should pass aXe check when not visible', () =>
    axeCheck(<AlertBox content={Content} status="info" isVisible={false} />));

  it('should pass aXe check without a headline', () =>
    axeCheck(<AlertBox content={Content} status="info" isVisible />));

  it('should pass aXe check with a headline', () =>
    axeCheck(
      <AlertBox
        headline={Headline}
        content={Content}
        status="info"
        isVisible
      />,
    ));

  it('should pass aXe check when it has a close button', () =>
    axeCheck(
      <AlertBox
        headline={Headline}
        content={Content}
        onCloseAlert={closeAlert()}
        status="info"
        isVisible
      />,
    ));

  it('should pass aXe check when it has a close button with optional aria-label', () =>
    axeCheck(
      <AlertBox
        headline={Headline}
        content={Content}
        closeBtnAriaLabel={CloseBtnAriaLabelOptional}
        onCloseAlert={closeAlert()}
        status="info"
        isVisible
      />,
    ));

  it('should pass aXe check when `backgroundOnly` is `true`', () =>
    axeCheck(
      <AlertBox
        headline={Headline}
        content={Content}
        status="info"
        backgroundOnly
      />,
    ));

  describe('analytics event', function () {
    let wrapper;

    const HeadlineWithLink = (
      <>
        Headline <a href="https://www.va.gov/">with a link</a>
      </>
    );

    beforeEach(() => {
      wrapper = mount(
        <AlertBox headline={HeadlineWithLink} status="info" backgroundOnly>
          <div>
            This is content
            <a href="https://www.va.gov/" id="test-link-1">
              with a link
            </a>
            .
          </div>
        </AlertBox>,
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should be triggered when link in AlertBox content is clicked', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      // Click link in content
      const testLink = wrapper.find('.usa-alert-text a');
      testLink.simulate('click');

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'AlertBox',
            action: 'linkClick',
            details: {
              clickLabel: 'with a link',
              headline: HeadlineWithLink,
              status: 'info',
              backgroundOnly: true,
              closeable: false,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;
    });

    it('should be triggered when link in AlertBox headline is clicked', () => {
      const handleAnalyticsEvent = sinon.spy();

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      // Click link in headline
      const testLink = wrapper.find('.usa-alert-heading a');
      testLink.simulate('click');

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'AlertBox',
            action: 'linkClick',
            details: {
              clickLabel: 'with a link',
              headline: HeadlineWithLink,
              status: 'info',
              backgroundOnly: true,
              closeable: false,
            },
            version: sinon.match.string,
          }),
        ),
      ).to.be.true;
    });
  });
});
