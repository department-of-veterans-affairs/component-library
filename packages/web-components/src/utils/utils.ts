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

/**
 * Checks if an object is an arguments object
 */
function isArguments(object: any): boolean {
  return Object.prototype.toString.call(object) === "[object Arguments]";
}

/**
 * Performs a deep equality check between two values (primitives, arrays, or objects)
 * @param a First value to compare
 * @param b Second value to compare
 * @returns True if the values are deeply equal, false otherwise
 */
export function deepEquals(a: any, b: any): boolean {
  const ca = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const cb = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  // Partially extracted from node-deeper and adapted to exclude comparison
  // checks for functions.
  // https://github.com/othiym23/node-deeper
  if (a === b) {
    return true;
  } else if (typeof a === "function" || typeof b === "function") {
    // Assume all functions are equivalent
    // see https://github.com/mozilla-services/react-jsonschema-form/issues/255
    return true;
  } else if (typeof a !== "object" || typeof b !== "object") {
    return false;
  } else if (a === null || b === null) {
    return false;
  } else if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  } else if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.lastIndex === b.lastIndex && a.ignoreCase === b.ignoreCase;
  } else if (isArguments(a) || isArguments(b)) {
    if (!(isArguments(a) && isArguments(b))) {
      return false;
    }
    const slice = Array.prototype.slice;
    return (deepEquals as any)(slice.call(a), slice.call(b), ca, cb);
  } else {
    if (a.constructor !== b.constructor) {
      return false;
    }

    const ka = Object.keys(a);
    const kb = Object.keys(b);
    // don't bother with stack acrobatics if there's nothing there
    if (ka.length === 0 && kb.length === 0) {
      return true;
    }
    if (ka.length !== kb.length) {
      return false;
    }

    let cal = ca.length;
    while (cal--) {
      if (ca[cal] === a) {
        return cb[cal] === b;
      }
    }
    ca.push(a);
    cb.push(b);

    ka.sort();
    kb.sort();
    for (let j = ka.length - 1; j >= 0; j--) {
      if (ka[j] !== kb[j]) {
        return false;
      }
    }

    let key;
    for (let k = ka.length - 1; k >= 0; k--) {
      key = ka[k];
      if (!(deepEquals as any)(a[key], b[key], ca, cb)) {
        return false;
      }
    }

    ca.pop();
    cb.pop();

    return true;
  }
}

/**
 * Truncates a string to fit within a specified width in pixels.
 * Adds "..." at the end if truncated.
 * 
 * @param text - The string to truncate
 * @param maxWidth - The maximum width in pixels
 * @param fontStyle - Optional font style string (e.g. "14px Arial")
 * @returns The truncated string or original if it fits
 */
export function truncate(text: string, maxWidth: number, fontStyle: string): string {
  if (!text) return text;

  // Create a canvas to measure text width
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return text;
  context.font = fontStyle;

  // Check if the text already fits
  if (context.measureText(text).width <= maxWidth) {
    return text;
  }

  // Text is too long, need to truncate
  const ellipsis = '...';
  const ellipsisWidth = context.measureText(ellipsis).width;

  // Binary search to find the optimal truncation point
  let start = 0;
  let end = text.length;
  let best = 0;

  while (start <= end) {
    const mid = Math.floor((start + end) / 2);
    const testText = text.substring(0, mid);
    const width = context.measureText(testText).width + ellipsisWidth;

    if (width <= maxWidth) {
      best = mid;
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  return text.substring(0, best).trim() + ellipsis;
}

/**
 * Gets the proper article for a word, either "a" or "an"
 * based upon first letter of the word
 * 
 * @param string - The string that needs an article
 * @param useUe - Whether to treat a word that starts with "u" as starting with a vowel
 * @returns Either "a" or "an"
 */
export function getArticle(string: string, useU=true): 'a' | 'an' {
  const vowels = ['a', 'i', 'e', 'o', ];

  // there are cases when we know we will have words that start with "u"
  // that don't get "an" as an article, e.g. "university"
  if (useU) {
    vowels.push('u');
  }

  const testLetter = string.charAt(0).toLowerCase();
  return vowels.includes(testLetter) ? 'an' : 'a';
}
