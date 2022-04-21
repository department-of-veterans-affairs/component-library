export const generateEventsDescription = componentDocs => {
  const events = [...componentDocs.events, ...componentDocs.listeners];
  if (!events.length) return;

  const eventNames = events.map(event => event.event).join(', ');

  return ` This component has ${events.length} ${
    events.length > 1 ? 'events' : 'event'
  }: ${eventNames}. Please see our documentation on how to use web component events at https://design.va.gov/about/developers#using-web-components.`;
};
