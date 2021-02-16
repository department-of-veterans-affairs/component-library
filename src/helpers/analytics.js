/**
 * Dispatch a custom JavaScript event on document.body for tracking analytics.
 * A separate event listener will be required to record the events to GA.
 *
 * event.componentName {string} - The name of the component
 * event.action {string} - The action that triggered the analytics event
 * event.details {object} - Contains any number of key-value pairs to further describe the analytics event
 */

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
    },
  });
  document.body.dispatchEvent(event);
}
