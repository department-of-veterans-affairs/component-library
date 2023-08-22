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
  // This will only get the first slot on a component
  const children = root.shadowRoot.querySelector('slot').assignedNodes()

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
 *
 * Take the length of a string; if the length is "1" then return blank string for no plurality
 * otherwise return an 's' for plurality
 */
export function plurality(length: number): string {
  return length === 1 ? '' : 's';
}

/**
 * generates message to update character count if uswds prop set
 * currently used in va-text-input and va-text-area v3 components
 * update this method with translations instead of string literals
 */
export function getCharacterMessage(
  value: string | undefined,
  maxlength: number | undefined,
): string {
  if (value === undefined) {
    return `${maxlength} character${plurality(maxlength)} allowed`;
  }

  let message: string;
  if (value.length <= maxlength) {
    const chars = maxlength - value.length;
    message = `${chars} character${plurality(chars)} left`;
  } else {
    const chars = value.length - maxlength;
    message = `${chars} character${plurality(chars)} over limit`;
  }

  return message;
}

// generate a list of positive consecutive integers from start to end, inclusive
// start and end are both positive integers where start < end.
export function makeArray(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}