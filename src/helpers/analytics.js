import packageJSON from '../../package.json';

/**
 * Dispatch a custom JavaScript event on document.body for tracking analytics.
 * A separate event listener will be required to record the events to GA.
 *
 * event.componentName {string} - The name of the component
 * event.action {string} - The action that triggered the analytics event
 * event.details {object} - Contains any number of key-value pairs to further describe the analytics event
 */

const version = packageJSON.version;

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

export default function dispatchAnalyticsEvent({
  componentName,
  action,
  details,
}) {
  const event = new CustomEvent('component-library-analytics', {
    detail: {
      componentName,
      action,
      details,
      version,
    },
  });
  document.body.dispatchEvent(event);
}
