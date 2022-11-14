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

/**
 * Detect if the URL has changed. When the URL has changed, the
 * custom event `locationchange` will dispatch.
 * The native events `hashchange` and `popstate` are not reliable.
 */
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

/**
 * The dynamic CSS added when the URL has `uswds` in it.
 * body, html, .usa-label, button
 */
function addUswdsStyles() {
  
  document.documentElement.style.fontSize = '16px';
  document.body.style.fontSize = '16px';
  const label = document.querySelector('.usa-label');
  if (label) {
    label.style.padding = '1px 6px';
    label.style.fontSize = '16px';
  }
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.padding = '10px 20px';
  });
}

/**
 * The dynamic CSS added when the URL does not have `uswds` in it.
 * These styles are from Formation.
 * body, html, .usa-label, button
 */
function addFormationStyles() {
  document.documentElement.style.fontSize = '10px';
  document.body.style.fontSize = '1.6rem';
  const label = document.querySelector('.usa-label');
  if (label) {
    label.style.padding = '0.1rem 0.7rem';
    label.style.fontSize = '1.5rem';
  }
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.style.padding = '1rem 2rem';
  });
}

// Fix for React 17/NVDA bug where React root is read as "clickable"
// https://github.com/nvaccess/nvda/issues/13262
// https://github.com/facebook/react/issues/20895
document.body.onload = function () {
  document.querySelector('#root').setAttribute('role', 'presentation');

  console.log('location.href has uswds?', location.href.includes('uswds'));

  // Initial page load dynamic styles.
  location.href.includes('uswds') ? addUswdsStyles() : addFormationStyles();

  window.addEventListener('locationchange', (event) => {
    console.log('** location.href has uswds?', location.href.includes('uswds'))
    if (location.href.includes('uswds')) {
      addUswdsStyles();
    } else {
      addFormationStyles();
    }
  });
};
