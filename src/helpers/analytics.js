export default function dispatchAnalyticsEvent({type, action, ...data}) {
  const event = new CustomEvent("component.library.analytics", {
    detail: {
      type,
      action,
      ...data,
    },
  });
  document.body.dispatchEvent(event);
}
