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
  query: string = 'slot',
): Array<Node> {
  // This will only get the first slot on a component unless the component sets a query value
  const slot = root.shadowRoot.querySelector(query) as HTMLSlotElement;
  const children = slot.assignedNodes();

  return nodeName !== null
    ? Array.from(children).filter(
        item => item.nodeName.toLowerCase() === nodeName,
      )
    : Array.from(children);
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
 * Generates message to update character count.
 * Currently used in va-text-input and va-text-area components.
 * update this method with translations instead of string literals
 */
export function getCharacterMessage(
  value: string | undefined,
  maxlength: number | undefined,
): string {
  if (value === undefined || value === '') {
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

/**
 * @name isElement
 * @desc returns whether or not the given argument is a DOM element.
 */
const isElement = (value: any): boolean =>
  value && typeof value === 'object' && value.nodeType === 1;

/**
 * @name select
 * @desc selects elements from the DOM by class selector or ID selector
 */
function select(selector: string, context?: HTMLElement): HTMLElement[] {
  if (typeof selector !== 'string') {
    return [];
  }

  if (!context || !isElement(context)) {
    return [];
  }

  const selection = context.shadowRoot.querySelectorAll(selector);
  return Array.from(selection) as HTMLElement[];
}

/**
 * @name selectOrMatches
 * @desc selects elements from a specific DOM context by class selector or ID selector.
 */
export function selectOrMatches(
  selector: string,
  context?: HTMLElement,
): HTMLElement[] {
  const selection = select(selector, context);

  if (typeof selector !== 'string') {
    return selection;
  }

  if (isElement(context) && context.matches(selector)) {
    selection.push(context);
  }

  return selection;
}

/**
 * Sanitizes strings of HTML to be output in innerHTML of an element
 */
export const Sanitizer = {
  _entity: /[&<>"'/]/g,

  /* eslint-disable i18next/no-literal-string */
  _entities: {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    '/': '&#x2F;',
  },
  /* eslint-enable i18next/no-literal-string */

  getEntity: function (s) {
    return Sanitizer._entities[s];
  },

  /**
   * Escapes HTML for all values in a tagged template string.
   */
  escapeHTML: function (strings: string | string[]) {
    var result = '';

    for (var i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i + 1 < arguments.length) {
        var value = arguments[i + 1] || '';
        result += String(value).replace(Sanitizer._entity, Sanitizer.getEntity);
      }
    }

    return result;
  },
};

/**
 * return the heading level based on an integer input
 * if invalid input return null
 */
export function getHeaderLevel(headerInput: number | string): string | null {
  let headerLevel: number | null = null;
  if (typeof headerInput === 'string') {
    headerLevel = parseInt(headerInput, 10);
  } else {
    headerLevel = Math.floor(headerInput);
  }
  return headerLevel >= 1 && headerLevel <= 6 ? `h${headerLevel}` : null;
}

/**
 * Checks if an element is interactive
 */
export function isInteractiveLinkOrButton(el: HTMLElement): boolean {
  // eslint-disable-next-line i18next/no-literal-string
  return ['VA-BUTTON', 'VA-LINK', 'BUTTON', 'A'].includes(el.tagName);
}

/**
 * Checks if a messageAriaDescribedby is set;
 * if set to 'false' an aria-describedby attribute will be added
 * leading to assistive tech reading out a value of 'false'
 * (see vets-design-system-documentation/issues/3885)
 */
export function isMessageSet(message: string): boolean {
  return (message && message !== 'false') || false;
}
