import '@department-of-veterans-affairs/formation/dist/formation.min.css';
import './style.scss';
import '@department-of-veterans-affairs/formation/dist/formation';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/component-library';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';
import { addons } from '@storybook/addons';
import { themes } from '@storybook/theming';

applyPolyfills().then(() => {
  defineCustomElements();
});

// window.document.body.addEventListener('change', event => {
//   console.log('click event: ', event);
// });

// Add a MutationObserver to track changes to the body's className
const observeBodyClassName = () => {
  const targetNode = document.body;

  // Configuration options for the observer
  const config = { attributes: true, attributeFilter: ['class'] };

  // Callback function to handle className changes
  const callback = mutationList => {
    for (const mutation of mutationList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        const newClassName = targetNode.className;
        console.log('Body className changed to:', newClassName);

        // Example: Check if the className is "dark" or "light"
        if (newClassName.includes('dark')) {
          console.log('Dark mode activated');
        } else if (newClassName.includes('light')) {
          console.log('Light mode activated');
        }
      }
    }
  };

  // Create an observer instance
  const observer = new MutationObserver(callback);

  // Start observing the target node
  observer.observe(targetNode, config);
};

// Call the function to start observing
observeBodyClassName();

addons.getChannel().on(window.parent.document.body.className, isDarkMode => {
  console.log('GET CHANNEL DARK_MODE: ', isDarkMode);
  const iframe = document.querySelector(
    'iframe[src="https://department-of-veterans-affairs.github.io/va-mobile-library"]',
  );
  console.log('iframe: ', iframe);
  if (iframe) {
    iframe.contentWindow.postMessage(
      {
        key: 'storybook-channel',
        event: 'DARK_MODE',
        value: isDarkMode ? themes.dark : themes.light,
      },
      '*',
    );
  }
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
  darkMode: {
    dark: { ...themes.dark },
    light: { ...themes.light },
    stylePreview: true,
  },
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
  const config = { attributes: true, childList: false, subtree: false };

  // Callback function that 'resets' the aria-hidden attribute to false
  const callback = (/** @type {MutationRecord[]} */ mutationList) => {
    for (const mutation of mutationList) {
      if (
        mutation.attributeName === 'aria-hidden' &&
        targetNode?.getAttribute('aria-hidden') !== 'false'
      ) {
        targetNode?.setAttribute('aria-hidden', 'false');
      }
    }
  };

  // Create an observer instance
  const observer = new MutationObserver(callback);

  // Start observing
  if (targetNode) observer.observe(targetNode, config);
};

document.body.onload = function () {
  observeDocsRoot();
};
