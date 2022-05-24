export const generateEventsDescription = componentDocs => {
  const events = [...componentDocs.events, ...componentDocs.listeners];
  if (!events.length) return;

  const eventNames = events.map(event => event.event).join(', ');

  return ` This component has ${events.length} ${
    events.length > 1 ? 'custom events' : 'custom event'
  }: ${eventNames}.`;
};
