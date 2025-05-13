// The functions in this file are only used if va-combo-box is inside the va-input-telephone component

import { truncate } from '../../utils/utils';

/**
 * Calculates the interior width of an element in pixels (total width minus border and padding).
 * 
 * @param element - The HTML element to measure
 * @returns The interior width in pixels
 */
export function getInteriorWidth(element: HTMLElement): number | null {
  if (!element) return null;

  const computedStyle = window.getComputedStyle(element);

  // Get total width including padding and border
  const totalWidth = element.clientWidth;

  // Subtract padding
  const paddingLeft = parseFloat(computedStyle.paddingLeft);
  const paddingRight = parseFloat(computedStyle.paddingRight);

  // Subtract border
  const borderLeft = parseFloat(computedStyle.borderLeftWidth);
  const borderRight = parseFloat(computedStyle.borderRightWidth);

  const interiorWidth = totalWidth - paddingLeft - paddingRight - borderLeft - borderRight;

  return interiorWidth;
}

// get the truncated (if necessary) country name for the input
export function handleTruncation(text: string, input: HTMLInputElement) {
    const [country, _prefix] = text.split('+');
    const prefix = `+${_prefix}`;
    // find available space
    const interiorWidth = getInteriorWidth(input);
    const availableWidth = interiorWidth - 30; // subtract space devoted to button and separator

    //find length of prefix
    const computedStyle = window.getComputedStyle(input);
    const fontStyle = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    context.font = fontStyle;
    const prefixLength = Math.ceil(context.measureText(prefix).width);

    // get truncated country name
    const truncatedCountry = truncate(country, availableWidth - prefixLength, fontStyle);
    return `${truncatedCountry}${prefix}`;
  }


// when user is changing country, remove the flag icon in the input
export function manageFlagIcon() {
  if (this.isInVaInputTelephone) {
    const input = this.el.shadowRoot.querySelector('input');
    if (input.value === '') {
      const flagSpan = this.el.shadowRoot.querySelector('span.dynamic-flag');
      if (flagSpan) {
        // reset base class, remove country specific class
        flagSpan.className = 'dynamic-flag';
      }
    };
  }
}

// update the component's name and flag after user changes country
export function handleRerender() {
  const options = this.el.shadowRoot.querySelectorAll('option');
  if (!!options && options.length !== 0) {
    const country = this.value !== undefined ? this.value : 'US';
    const [option] = Array.from(options).filter((option: HTMLOptionElement) => option.value === country);
    if (!!option) {
      const { text } = option as HTMLOptionElement;
      const input = this.el.shadowRoot.querySelector('input');
      input.value = handleTruncation(text, input);
      const flagSpan = this.el.shadowRoot.querySelector('span.dynamic-flag');
      // remove old flag class
      removeClassByPrefix(flagSpan, 'flag-');
      // add new flag clas
      flagSpan.classList.add('flag', `flag-${country.toLowerCase()}`);
    }
  }
}

function removeClassByPrefix(element: HTMLElement, prefix: string) {
  element.classList.forEach(className => {
    if (className.startsWith(prefix)) {
      element.classList.remove(className);
    }
  });
}
