// The functions in this file are only used if va-combo-box is inside the va-input-telephone component

// import { truncate } from '../../utils/utils';

/**
 * Calculates the interior width of an element in pixels (total width minus border and padding).
 *
 * @param element - The HTML element to measure
 * @returns The interior width in pixels
 */
export function getInteriorWidth(element: HTMLElement): number | null {
  if (!element) return null;

  const computedStyle = window.getComputedStyle(element);
  const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
  const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

  return element.clientWidth - paddingLeft - paddingRight;
}

// when user is changing country, remove the flag icon in the input
export function manageFlagIcon() {
  if (this.isInVaInputTelephone) {
    const flagSpan = this.el.shadowRoot.querySelector('span.dynamic-flag');
    if (flagSpan) {
      // reset base class, remove country specific class
      flagSpan.className = 'dynamic-flag';
    }
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
      input.value = text;
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
