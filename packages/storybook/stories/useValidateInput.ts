import { useState, useRef, useEffect, useCallback } from 'react';

export const INTERNAL_TESTING_NOTE =
    'recommended focus management when simulated validation runs on the component. ' +
    'When the field is empty, clicking the "Submit" button should trigger required ' +
    'field validation and move focus inside the form field. Screen reader users ' +
    'should hear the error message and other relevant context';

/**
 * Hook for simulating form validation and focus management in Storybook stories.
 * This is for demonstration purposes only, designed to approximate focus management in the forms library.
 * Real validation happens in downstream apps.
 *
 * @param componentRef - React ref to the web component element
 * @param defaultError - Default error message prefix (default: "Demo error message")
 * @returns Object containing errorMsg, setErrorMsg, and triggerValidation
 */
export function useValidateInput(
  componentRef: React.RefObject<HTMLElement>,
  defaultError: string = 'Demo error message'
) {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validationTriggerCount, setValidationTriggerCount] = useState<number>(0);
  const [hasError, setHasError] = useState<boolean>(false);
  const focusTargetRef = useRef<HTMLElement | null>(null);

  const HIDDEN_FILTER = ':not([aria-hidden="true"]):not([hidden])';
  const INPUT_SELECTOR =
      `input${HIDDEN_FILTER},
      textarea${HIDDEN_FILTER},
      select${HIDDEN_FILTER},
      button${HIDDEN_FILTER}`;
  // Shared error selector configuration
  const ERROR_ATTRIBUTES = [
    'error',
    'input-error',
    'checkbox-error',
    'radio-error',
    'date-error'
  ] as const;

  /**
   * Creates a CSS selector string that matches elements with error attributes.
   *
   * Maps each error attribute to a CSS selector:
   * - For 'error' attribute: matches elements where the attribute exists and is not an empty string
   * - For other attributes: matches elements where the attribute simply exists
   *
   * The resulting selectors are joined with commas to create a compound selector.
   *
   * @example
   * // If ERROR_ATTRIBUTES = ['error', 'data-error', 'aria-invalid']
   * // Result: '[error]:not([error=""]), [data-error], [aria-invalid]'
   */
  const errorSelectorsList = ERROR_ATTRIBUTES
    .map(attr => attr === 'error' ? `[${attr}]:not([${attr}=""])` : `[${attr}]`)
    .join(', ');

  const isVaComponent = (node: Element | null | undefined): node is HTMLElement =>
    !!node && node.tagName.toLowerCase().startsWith('va-');

  /**
   * Extracts error text from a DOM element by checking various error-related attributes and properties.
   *
   * This function searches for error messages in the following order:
   * 1. Direct attributes: 'error', 'input-error', 'checkbox-error', 'radio-error', 'date-error'
   * 2. Corresponding element properties: 'inputError', 'checkboxError', 'radioError', 'dateError'
   *
   * @param el - The DOM element to check for error text. Can be null or undefined.
   * @returns The error text if found and non-empty, otherwise null.
   */
  const getErrorPropText = (el: Element | null | undefined): string | null => {
    if (!el) return null;

    const errorAttributes = [
      'error',
      'input-error',
      'checkbox-error',
      'radio-error',
      'date-error',
    ];

    const attributePropMap: Record<string, string> = {
      'input-error': 'inputError',
      'checkbox-error': 'checkboxError',
      'radio-error': 'radioError',
      'date-error': 'dateError',
    };

    for (const attr of errorAttributes) {
      const value = el.getAttribute(attr);
      if (value && value.trim() !== '') {
        return value;
      }

      const mappedProp = attributePropMap[attr];
      if (mappedProp && typeof (el as any)[mappedProp] === 'string') {
        const propValue = (el as any)[mappedProp];
        if (propValue && propValue.trim() !== '') {
          return propValue;
        }
      }
    }

    return null;
  };

  /**
   * Collects all error elements from a given HTML root element and its descendants,
   * including elements within shadow DOM boundaries.
   *
   * This function performs a comprehensive search for error elements by:
   * 1. Checking if the root element itself matches error selectors
   * 2. Finding all direct descendants that match error selectors
   * 3. Recursively searching through shadow DOM trees for VA components with error properties
   *
   * @param root - The root HTML element to search from. If null, returns an empty array.
   * @returns An array of all error elements found, with nested shadow DOM matches first,
   *          followed by regular DOM matches.
   *
   * For shadow DOM traversal, it specifically looks for VA components that have
   * error properties set via the `getErrorPropText` helper function.
   */
  const collectAllErrorElements = (root: HTMLElement | null, selectors: string = errorSelectorsList): Element[] => {
    if (!root) return [];

    const matches: Element[] = [];

    if (root.matches(selectors)) {
      matches.push(root);
    }

    const topLevelMatches = Array.from(root.querySelectorAll(selectors));
    matches.push(...topLevelMatches);
    const nestedMatches: Element[] = [];

    const searchShadow = (element: Element | ShadowRoot | null) => {
      if (!element || !(element instanceof Element || element instanceof ShadowRoot)) return;

      const shadowRoot = element instanceof ShadowRoot ? element : element.shadowRoot;
      if (!shadowRoot) return;

      const shadowMatches = Array.from(shadowRoot.querySelectorAll('*')).filter(child =>
        isVaComponent(child) && !!getErrorPropText(child)
      );

      if (shadowMatches.length) {
        nestedMatches.push(...shadowMatches);
      }

      shadowMatches.forEach(child => searchShadow(child));
    };

    searchShadow(root);
    matches.forEach(el => searchShadow(el));

    return [...nestedMatches, ...matches];
  };

  /**
   * Recursively finds the most appropriate focusable element within a DOM tree,
   * prioritizing elements with validation errors and handling both Shadow DOM
   * and Light DOM traversal.
   *
   * @param el - The root element to search from, or null
   *
   * @returns The target HTMLElement to focus, or null if no suitable target is found
   *
   * @remarks
   * The search priority is as follows:
   * 1. For VA components with Shadow DOM:
   *    - Elements with error attributes (recursive search)
   *    - Elements marked with `[data-focus-target]` attribute
   *    - Direct input elements matching INPUT_SELECTOR
   *    - Nested VA components (recursive search)
   * 2. For regular elements:
   *    - Input elements in Light DOM matching INPUT_SELECTOR
   *    - The element itself if it's an HTMLElement
   */
  const findFocusTarget = (el: Element | null): HTMLElement | null => {
    if (!el) return null;

    const element = el as HTMLElement;

    if (isVaComponent(element)) {
      const nestedError = element.shadowRoot?.querySelector('[error]:not([error=""])');
      if (nestedError && nestedError !== element) {
        const nestedTarget = findFocusTarget(nestedError);
        if (nestedTarget) return nestedTarget;
      }

      if (element.shadowRoot) {
        const explicitTarget = element.shadowRoot.querySelector('[data-focus-target]') as HTMLElement | null;
        if (explicitTarget) return explicitTarget;

        const directInput = element.shadowRoot.querySelector(INPUT_SELECTOR) as HTMLElement | null;
        if (directInput) return directInput;

        const nestedComponents = Array.from(
          element.shadowRoot.querySelectorAll('*')
        ).filter(child => isVaComponent(child));

        for (const nested of nestedComponents) {
          const nestedTarget = findFocusTarget(nested);
          if (nestedTarget && nestedTarget !== nested) {
            return nestedTarget;
          }
        }
      }
    }

    const lightDomInput = element.querySelector(INPUT_SELECTOR) as HTMLElement | null;
    if (lightDomInput) return lightDomInput;

    if (element instanceof HTMLElement) return element;
    return null;
  };

  /**
   * Retrieves the interactive input element from the component reference.
   *
   * This function attempts to find the focusable input element within a component
   * by checking multiple sources in order of priority:
   * 1. If the element is a VA component, uses findFocusTarget to locate the appropriate target
   * 2. Searches for input elements within the component's shadow DOM
   * 3. Falls back to searching for input elements in the regular DOM
   *
   * @returns The interactive HTML element if found, null otherwise
   */
  const getInteractiveControl = (): HTMLElement | null => {
    const element = componentRef.current;
    if (!element) return null;

    if (isVaComponent(element)) {
      const target = findFocusTarget(element);
      if (target) return target;
    }

    const shadowInput = element.shadowRoot?.querySelector(INPUT_SELECTOR) as HTMLElement | null;
    if (shadowInput) return shadowInput;

    return element.querySelector(INPUT_SELECTOR) as HTMLElement | null;
  };

  /**
   * Validate the component and set error message.
   * Validation priority:
   * 1. Internal component errors (error, input-error, checkbox-error attributes)
   * 2. Required field validation (empty required field)
   * 3. No error
   */
  const triggerValidation = useCallback(() => {
    const element = componentRef.current;
    if (!element) {
      return;
    }

    const errorElements = collectAllErrorElements(element);
    // Look for components with meaningful error messages (not default demo errors)
    // This prioritizes actual validation errors over placeholder demo content
    const realError = errorElements.find(el => {
      const message = getErrorPropText(el);
      // Only consider elements with error text that doesn't start with our default demo message
      return message && !message.startsWith(defaultError);
    });

    // If we found a component with a meaningful error, use that error
    if (realError) {
      const realErrorMsg = getErrorPropText(realError);
      // Find the focusable element within this error component for accessibility
      const focusTarget = findFocusTarget(realError);
      focusTargetRef.current = focusTarget;
      setErrorMsg(realErrorMsg);
      setHasError(true);
      // Increment trigger count to activate focus effect in useEffect
      setValidationTriggerCount(prev => prev + 1);
      return;
    }

    // Check for required field validation
    const input = getInteractiveControl();
    if (input && input.hasAttribute('required')) {
      // Check the input element's value first
      const inputElement = input as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      let inputValue = inputElement?.value || '';

      // If input is empty, also check the component's value property/attribute
      if (!inputValue.trim()) {
        inputValue = (element as any).value || element.getAttribute('value') || '';
      }

      if (!inputValue.trim()) {
        const errorMessage = `${defaultError}: field is empty`;
        focusTargetRef.current = input;
        setErrorMsg(errorMessage);
        setHasError(true);
        setValidationTriggerCount(prev => prev + 1);
        return;
      }
    }

    // No error - clear any existing error
    setErrorMsg(null);
    setHasError(false);
    focusTargetRef.current = null;
  }, [defaultError]);

  /**
   * Move focus to the input element whenever validation finds an error.
   * Triggers on every submit that results in an error, even if the error hasn't changed.
   */
  useEffect(() => {
    if (hasError && validationTriggerCount > 0) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        const input = focusTargetRef.current ?? getInteractiveControl();
        if (input instanceof HTMLElement) {
          input.focus();
        }
      }, 0);
    }
  }, [validationTriggerCount, hasError]);

  return {
    errorMsg,
    setErrorMsg,
    triggerValidation,
  };
}
