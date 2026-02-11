import './style.scss';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/core.css';

import '@department-of-veterans-affairs/css-library/dist/stylesheets/utilities.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/uswds-typography.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-alert.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-breadcrumbs.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-button.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-form-elements.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-megamenu.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-loading-indicator.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-print.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-dropdown.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-overlay.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-additional-info.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-hub-page-link-list.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-action-link.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/mobile-typography.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-modal.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-process-list.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-nav-sidebar.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/modules/m-nav-linklist.css';
import '@department-of-veterans-affairs/css-library/dist/stylesheets/shame.css';

import '@department-of-veterans-affairs/component-library/dist/main.css';
import {
  applyPolyfills,
  defineCustomElements,
} from '@department-of-veterans-affairs/component-library';
import { allModes } from './modes';

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
  mobile: {
    name: '320px - VADS Mobile',
    styles: {
      height: '568px',
      width: '320px',
    },
    type: 'mobile',
  },
  mobileLg: {
    name: '480px - VADS Large Mobile',
    styles: {
      height: '896px',
      width: '480px',
    },
    type: 'mobile',
  },
  tablet: {
    name: '640px - VADS Tablet',
    styles: {
      height: '1136px',
      width: '640px',
    },
    type: 'tablet',
  },
  desktop: {
    name: '1024px - VADS Desktop',
    styles: {
      height: '',
      width: '1024px',
    },
    type: 'desktop',
  },
  desktopLg: {
    name: '1200px - VADS Large Desktop',
    styles: {
      height: '',
      width: '1200px',
    },
    type: 'desktop',
  },
  widescreen: {
    name: '1400px - VADS Widescreen',
    styles: {
      height: '',
      width: '1400px',
    },
    type: 'desktop',
  },
};

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    sort: 'alpha',
  },

  // Apply Chromatic modes globally to ALL stories
  chromatic: {
    modes: {
      mobile: allModes['mobile'],
      desktop: allModes['desktop'],
    },
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
    options: { ...viewports },
  },

  viewMode: 'docs',

  docs: {
    codePanel: true,
    controls: {
      sort: 'alpha',
    },
  },
};

export const decorators = [
  (Story, { parameters }) => {
    const pageLayout = parameters.storyType;
    switch (pageLayout) {
      case 'form':
        return (
          <div className="sb-type--form">
            <Story />
          </div>
        );
      default:
        return (
          <div>
            <Story />
          </div>
        );
    }
  },
];

// Sets up a mutation observer to ensure that the storybook docs-root container doesn't get hidden by modals
const observeDocsRoot = () => {
  // The target for the observer
  const targetNode = document.getElementById('docs-root');

  // Configuration options for the observer
  const config = { attributes: true, childList: false, subtree: false };

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
};

document.body.onload = function () {
  observeDocsRoot();
};
export const tags = ['autodocs'];
