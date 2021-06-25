export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}

/**
 * Transform the NamedNodeMap into an object we can spread as attributes on an
 * HTMLElement.
 */
export const assembleAttributes = (atts: NamedNodeMap, ignoreList: string[]) =>
  Array.from(atts)
    .filter(a => !ignoreList.some(p => a.nodeName === p))
    .reduce(
      (all, a) => ({
        ...all,
        [a.nodeName]:
          // a.nodeValue will be an empty string when the attribute value isn't
          // specified such as when using a boolean true like for the required prop.
          // ...except for value. We want to keep value="" because that's
          // meaningful.
          a.nodeValue || (a.nodeName !== 'value' && a.nodeValue === ''),
      }),
      {},
    );
