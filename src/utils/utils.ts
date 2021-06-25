export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}

/**
 * Get all of the slotted children in the root element that match `nodeName`
 */
export function getSlottedNodes(
  root: HTMLElement,
  nodeName: string,
): Array<Node> {
  // If the browser is using the shadowDOM, the childNodes should be an array of two things:
  // A `<style>` element and a `<slot>` element
  // Chrome, Firefox, Safari, Edge - literally every modern browser will use shadowDOM.
  // This is purely for IE compatibility
  const hasShadowDOM =
    Array.from(root.shadowRoot.childNodes).filter(
      (node: any) => node.tagName === 'SLOT',
    ).length > 0;

  const children = hasShadowDOM
    ? root.shadowRoot.querySelector('slot').assignedNodes()
    : root.shadowRoot.childNodes;

  return Array.from(children).filter(
    item => item.nodeName.toLowerCase() === nodeName,
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
