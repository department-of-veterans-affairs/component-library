/**
 * Helper function for reporting events to Google Analytics. An alias for window.dataLayer.push.
 * @module platform/monitoring/record-event
 * @see https://developers.google.com/tag-manager/devguide
 * @param {object} data - The event data that will be sent to GA.
 */

export default function dispatchAnalayticsEvent({type, action, ...data}) {
  const event = new CustomEvent("component.library.analytics", {
    detail: {
      type,
      action,
      ...data,
    },
  });
  document.body.dispatchEvent(event);
}
