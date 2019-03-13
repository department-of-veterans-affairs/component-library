import { expect } from 'chai';
import React from 'react';
import { axeCheck, mountToDiv } from '../../helpers/test-helpers';

import LoadingIndicator from './LoadingIndicator.jsx';

describe('<LoadingIndicator>', () => {
  it('should not focus if setFocus is not set', () => {
    const component = <LoadingIndicator message="Loading" />;
    const mountedComponent = mountToDiv(component, 'loadingContainer');

    expect(document.activeElement.classList.contains('loading-indicator')).to.be
      .false;
    mountedComponent.unmount();
  });

  it('should focus if setFocus is set', () => {
    const component = <LoadingIndicator setFocus message="Loading" />;
    const mountedComponent = mountToDiv(component, 'loadingContainer');

    expect(document.activeElement.classList.contains('loading-indicator')).to.be
      .true;
    mountedComponent.unmount();
  });

  it('should pass aXe check', () =>
    axeCheck(<LoadingIndicator message="Loading" />));
});
