import '@department-of-veterans-affairs/formation/dist/formation.min.css';
import '@department-of-veterans-affairs/formation/dist/formation';
import { withHTML } from '@whitespace/storybook-addon-html/react';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/web-components/loader';
// Reference https://github.com/storybookjs/storybook/issues/6364#issuecomment-604586067
import '!style-loader!css-loader!sass-loader!./style.scss';

applyPolyfills().then(() => {
  defineCustomElements();
});

// This CustomEvent polyfill is for IE11:
// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#polyfill
(function () {
  if (typeof window.CustomEvent === 'function') return;

  function CustomEvent(event, params) {
    const customParams = params || {
      bubbles: false,
      cancelable: false,
      detail: null,
    };
    const evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(
      event,
      customParams.bubbles,
      customParams.cancelable,
      customParams.detail,
    );
    return evt;
  }

  window.CustomEvent = CustomEvent;
})();

const viewports = {
  xsmall: {
    name: 'XSmall Screen',
    styles: {
      height: '568px',
      width: '320px',
    },
    type: 'mobile',
  },
  small: {
    name: 'Small Screen',
    styles: {
      height: '896px',
      width: '481px',
    },
    type: 'mobile',
  },
  medium: {
    name: 'Medium',
    styles: {
      height: '1112px',
      width: '768px',
    },
    type: 'tablet',
  },
  smallDesktop: {
    name: 'Small Desktop',
    styles: {
      height: '1400px',
      width: '1008px',
    },
    type: 'desktop',
  },
  large: {
    name: 'Large',
    styles: {
      height: '1600px',
      width: '1601px',
    },
    type: 'desktop',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['About', ['Introduction']],
    },
  },
  viewport: {
    viewports,
    defaultViewport: 'small',
  },
  viewMode: 'docs',
};

export const decorators = [withHTML];

// Fix for React 17/NVDA bug where React root is read as "clickable"
// https://github.com/nvaccess/nvda/issues/13262
// https://github.com/facebook/react/issues/20895
document.body.onload = function () {
  document.querySelector('#root').setAttribute('role', 'presentation');
};
