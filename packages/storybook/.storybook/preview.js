import '@department-of-veterans-affairs/formation/dist/formation.min.css';
import './style.scss';
import '@department-of-veterans-affairs/formation/dist/formation';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/component-library';

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
      order: ['About', ['Introduction'], 'Components', 'Under development', 'Deprecated'],
    },
  },
  viewport: {
    viewports,
    defaultViewport: 'small',
  },
  viewMode: 'docs',
};

export const decorators = [
  Story => (
    <main lang="en">
      <Story />
    </main>
  ),
];

// Fix for React 17/NVDA bug where React root is read as "clickable"
// https://github.com/nvaccess/nvda/issues/13262
// https://github.com/facebook/react/issues/20895
document.body.onload = function () {
  document.querySelector('#root').setAttribute('role', 'presentation');

  (() => {
    const oldPushState = history.pushState;
    history.pushState = function pushState() {
      const ret = oldPushState.apply(this, arguments);
      window.dispatchEvent(new Event('pushstate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };

    const oldReplaceState = history.replaceState;
    history.replaceState = function replaceState() {
      const ret = oldReplaceState.apply(this, arguments);
      window.dispatchEvent(new Event('replacestate'));
      window.dispatchEvent(new Event('locationchange'));
      return ret;
    };

    window.addEventListener('popstate', () => {
      window.dispatchEvent(new Event('locationchange'));
    });
  })();

  if (location.href.includes('uswds')) {
    document.documentElement.style.fontSize = '16px';
    document.body.style.fontSize = '16px';
    document.querySelector('.maturity .usa-label').style.fontSize = '16px';
  } else {
    document.documentElement.style.fontSize = '10px';
    document.body.style.fontSize = '1.6rem';
    document.querySelector('.maturity .usa-label').style.fontSize = '1.6rem';
  }

  window.addEventListener('locationchange', (event) => {
    if (location.href.includes('uswds')) {
      document.documentElement.style.fontSize = '16px';
      document.body.style.fontSize = '16px';
      document.querySelectorAll('.maturity .usa-label').style.fontSize = '16px';
    } else {
      document.documentElement.style.fontSize = '10px';
      document.body.style.fontSize = '1.6rem';
      document.querySelector('.maturity .usa-label').style.fontSize = '1.6rem';
    }
  });
};
