import { expect } from 'chai';
import React from 'react';
import sinon from 'sinon';
import { axeCheck, mountToDiv } from '../../helpers/test-helpers';

import LoadingIndicator from './LoadingIndicator.jsx';

describe('<LoadingIndicator>', () => {
  it('should not focus if setFocus is not set', () => {
    const component = (
      <LoadingIndicator message="Loading" label="aria label here" />
    );
    const mountedComponent = mountToDiv(component, 'loadingContainer');

    expect(document.activeElement.classList.contains('loading-indicator')).to.be
      .false;
    mountedComponent.unmount();
  });

  it('should focus if setFocus is set', () => {
    const component = (
      <LoadingIndicator setFocus message="Loading" label="aria label here" />
    );
    const mountedComponent = mountToDiv(component, 'loadingContainer');

    expect(document.activeElement.classList.contains('loading-indicator')).to.be
      .true;
    mountedComponent.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<LoadingIndicator message="Loading" label="aria label here" />));

  describe('analytics event', function () {
    it('should be triggered when component is unmounted', () => {
      const component = (
        <LoadingIndicator message="Loading" label="aria label here" />
      );
      const handleAnalyticsEvent = sinon.spy();

      const mountedComponent = mountToDiv(component, 'loadingContainer');

      global.document.body.addEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      mountedComponent.unmount();

      global.document.body.removeEventListener(
        'component-library-analytics',
        handleAnalyticsEvent,
      );

      expect(
        handleAnalyticsEvent.calledWith(
          sinon.match.has('detail', {
            componentName: 'LoadingIndicator',
            action: 'displayed',
            details: {
              displayTime: sinon.match.number,
              message: 'Loading',
            },
          }),
        ),
      ).to.be.true;
    });
  });
});
