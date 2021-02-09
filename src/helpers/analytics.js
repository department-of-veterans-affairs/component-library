/**
 * Helper function for reporting events to Google Analytics. An alias for window.dataLayer.push.
 * @module platform/monitoring/record-event
 * @see https://developers.google.com/tag-manager/devguide
 * @param {object} data - The event data that will be sent to GA.
 */

export function recordEvent(data) {
  window.dataLayer = [] || window.dataLayer;
  return window.dataLayer.push(data);
}