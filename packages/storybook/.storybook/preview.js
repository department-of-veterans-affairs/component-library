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
      order: [
        'About',
        ['Introduction'],
        'Components',
        'V1 Components',
        'Under development',
        'Deprecated',
      ],
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
    <div>
      <Story />
    </div>
  ),
];

// Sets up a mutation observer to ensure that the storybook docs-root container doesn't get hidden by modals
const observeDocsRoot = () => {
  // The target for the observer
  const targetNode = document.getElementById('docs-root');

  // Configuration options for the observer
  const config = {attributes: true, childList: false, subtree: false}

  // Callback function that 'resets' the aria-hidden attribute to false
  const callback = (
    /** @type {MutationRecord[]} */ mutationList
  ) => {
    for (const mutation of mutationList) {
      if (mutation.attributeName === 'aria-hidden' && targetNode?.getAttribute('aria-hidden') !== 'false') {
        targetNode?.setAttribute('aria-hidden', 'false');
      }
    }
  };

  // Create an observer instance
  const observer = new MutationObserver(callback);

  // Start observing
  if (targetNode) observer.observe(targetNode, config);
}

document.body.onload = function () {
  // Fix for React 17/NVDA bug where React root is read as "clickable"
  // https://github.com/nvaccess/nvda/issues/13262
  // https://github.com/facebook/react/issues/20895
  // document.querySelector('#root').setAttribute('role', 'presentation');

  observeDocsRoot();
};
