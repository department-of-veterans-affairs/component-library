import { Build } from '@stencil/core';

export function format(first: string, middle: string, last: string): string {
  return (
    (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '')
  );
}

/**
 * Returns true if the string is numeric
 */
export function isNumeric(value: string): boolean {
  return !Number.isNaN(parseFloat(value));
}

/**
 * Get all of the slotted children in the root element that match `nodeName`
 * If nodeName is null we still want all children to be accessible
 */
export function getSlottedNodes(
  root: HTMLElement,
  nodeName: string | null,
): Array<Node> {
  // If the browser is using the shadowDOM, the childNodes should be an array of two things:
  // A `<style>` element and a `<slot>` element
  // Chrome, Firefox, Safari, Edge - literally every modern browser will use shadowDOM.
  // This is purely for IE compatibility
  const hasShadowDOM =
    Array.from(root.shadowRoot.childNodes).filter(
      (node: any) => node.tagName === 'SLOT',
    ).length > 0;

  // This will only get the first slot on a component
  const children = hasShadowDOM
    ? root.shadowRoot.querySelector('slot').assignedNodes()
    : root.shadowRoot.childNodes;

  return nodeName !== null ? Array.from(children).filter(
    item => item.nodeName.toLowerCase() === nodeName,
  ) : Array.from(children);
}

/**
 * Output an error message when in development mode and not testing.
 */
export function consoleDevError(message: string): void {
  if (Build.isDev && !Build.isTesting) {
    console.error(message);
  }
}

/**
 * Code needed to trap focus within a modal. Modified from
 * https://github.com/ionic-team/ionic-framework/blob/main/core/src/utils/overlays.ts#L85
 * A more extensive list can be found at
 * https://github.com/KittyGiraudel/focusable-selectors/blob/main/index.js
 */
export const focusableQueryString = [
  '.hydrated:not([tabindex^="-"])',
  '[tabindex]:not([tabindex^="-"])',
  'input:not([type=hidden]):not([tabindex^="-"])',
  'textarea:not([tabindex^="-"])',
  'button:not([tabindex^="-"])',
  'select:not([tabindex^="-"])',
].join(',');
