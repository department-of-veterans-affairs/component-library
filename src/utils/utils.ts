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

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
