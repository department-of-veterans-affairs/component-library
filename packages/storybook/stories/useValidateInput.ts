import { useState, useRef, useEffect, useCallback } from 'react';

// Note to explain intent of storybook demo
export const INTERNAL_TESTING_NOTE =
    'recommended focus management when simulated validation runs on the component. ' +
    'When the field is empty, clicking the "Submit" button should trigger required ' +
    'field validation and move focus inside the form field. Screen reader users ' +
    'should hear the error message and other relevant context';

// DOM traversal utilities
const HIDDEN_FILTER = ':not([aria-hidden="true"]):not([hidden])';
const INPUT_SELECTOR = `input${HIDDEN_FILTER}, textarea${HIDDEN_FILTER}, select${HIDDEN_FILTER}`;
const ERROR_ATTRIBUTES = ['error', 'input-error', 'checkbox-error'] as const;

// Component type detection
const isVaComponent = (node: Element | null | undefined): node is HTMLElement =>
  !!node && node.tagName.toLowerCase().startsWith('va-');

const isCheckboxComponent = (component: HTMLElement): boolean =>
  component.tagName.toLowerCase().includes('checkbox');

// Label extraction utility
const getComponentLabel = (component: HTMLElement): string =>
  component.getAttribute('label') ||
  component.getAttribute('name') ||
  component.tagName.toLowerCase().replace('va-', '');

// Error message generation
const createErrorMessage = (component: HTMLElement, defaultError: string): string => {
  const label = getComponentLabel(component);
  return isCheckboxComponent(component)
    ? `${defaultError}: ${label} must be selected`
    : `${defaultError}: ${label} is required`;
};


/**
 * Queries for an element in both shadow DOM and light DOM, prioritizing shadow DOM.
 *
 * This function first searches within the shadow DOM of the provided element,
 * and falls back to searching the light DOM if no match is found in the shadow DOM.
 * This is particularly useful for VA (Veterans Affairs) components that typically
 * place their elements within shadow DOM.
 *
 * @template T - The type of element to return, extending Element
 * @param element - The HTML element to search within
 * @param selector - The CSS selector string to match against
 * @returns The first matching element of type T, or null if no match is found
 */
const queryInBothDOMs = <T extends Element = Element>(
  element: HTMLElement,
  selector: string
): T | null => {
  // Check shadow DOM first (where most VA components place elements)
  const shadowResult = element.shadowRoot?.querySelector(selector) as T | null;
  if (shadowResult) return shadowResult;

  // Fall back to light DOM
  return element.querySelector(selector) as T | null;
};

/**
 * Retrieves custom error text from an HTML element's attributes.
 *
 * Iterates through predefined error attributes to find a non-empty value
 * that doesn't start with the default error message.
 *
 * @param element - The HTML element to extract error text from
 * @param defaultError - The default error message to exclude from results
 * @returns The custom error text if found, otherwise null
 */
const getErrorText = (element: HTMLElement, defaultError: string): string | null => {
  for (const attr of ERROR_ATTRIBUTES) {
    const value = element.getAttribute(attr);
    if (value && value.trim() && !value.startsWith(defaultError)) {
      return value;
    }
  }
  return null;
};


const isRequired = (component: HTMLElement): boolean => {
  if (component.hasAttribute('required')) return true;

  const input = queryInBothDOMs<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    component,
    INPUT_SELECTOR
  );
  return input?.hasAttribute('required') ?? false;
};

/**
 * Retrieves the current value from a component or its associated input element.
 *
 * First attempts to get the value from the component's value property or attribute.
 * If no value is found or it's empty/whitespace, falls back to querying for an
 * input element within the component and returns its value.
 *
 * @param component - The HTML element to extract the value from
 * @returns The current value as a string, or empty string if no value is found
 */
const getCurrentValue = (component: HTMLElement): string => {
  // Check component value prop/attribute first
  const componentValue = (component as any).value || component.getAttribute('value') || '';
  if (componentValue.trim()) return componentValue;

  // Check input element value
  const input = queryInBothDOMs<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
    component,
    INPUT_SELECTOR
  );
  return input?.value || '';
};

/**
 * Recursively finds all VA components within a given parent element and its shadow DOM.
 *
 * This function traverses the DOM tree starting from the provided parent element,
 * searching through both regular DOM children and shadow DOM content. It collects
 * all elements that are identified as VA components by the `isVaComponent` function,
 * ensuring each component is only included once in the results.
 *
 * @param parent - The root HTML element to start the search from
 * @returns An array of unique HTML elements that are VA components found within the parent
 */
const getDescendantVaComponents = (parent: HTMLElement): HTMLElement[] => {
  const results: HTMLElement[] = [];
  const seen = new Set<HTMLElement>();

  const addIfNew = (component: HTMLElement) => {
    if (!seen.has(component)) {
      seen.add(component);
      results.push(component);
    }
  };

  const walk = (scope: Element | ShadowRoot) => {
    const children = scope instanceof ShadowRoot
      ? Array.from(scope.children)
      : Array.from(scope.children ?? []);

    for (const child of children) {
      if (!(child instanceof HTMLElement)) continue;

      // Collect VA components
      if (isVaComponent(child)) {
        addIfNew(child);
      }

      // Continue traversing into all descendants
      walk(child);
      if (child.shadowRoot) {
        walk(child.shadowRoot);
      }
    }
  };

  // Start search from parent element
  walk(parent);
  if (parent.shadowRoot) {
    walk(parent.shadowRoot);
  }

  return results;
};


/**
 * Retrieves the components that need to be validated within a given HTML element.
 *
 * This function first attempts to find descendant VA components within the provided element.
 * If descendant components are found, it returns those components for validation.
 * If no descendant components are found, it returns the original component itself as
 * the component to be validated.
 *
 * @param component - The HTML element to analyze for validation candidates
 * @returns An array of HTML elements that should be validated. Returns descendant
 *          VA components if found, otherwise returns the input component in an array.
 */
const getComponentsToValidate = (component: HTMLElement): HTMLElement[] => {
  const childComponents = getDescendantVaComponents(component);

  if (childComponents.length > 0) {
    return childComponents;
  }

  return [component];
};

/**
 * Determines whether a given HTML element component has a meaningful value.
 *
 * For checkbox-like components (elements with 'checkbox' in tag name, 'checked' attribute,
 * or 'checked' property), this function checks if the component is checked.
 *
 * For all other components, this function retrieves the current value and checks
 * if it contains non-whitespace content.
 *
 * @param component - The HTML element to validate for having a value
 * @returns `true` if the component has a meaningful value, `false` otherwise
 */
/**
 * Checks if a checkbox component is checked
 */
const isCheckboxChecked = (component: HTMLElement): boolean =>
  !!(component as any).checked || component.hasAttribute('checked');

const componentHasValue = (component: HTMLElement): boolean => {
  if (isCheckboxComponent(component)) {
    return isCheckboxChecked(component);
  }

  const value = getCurrentValue(component);
  return value.trim().length > 0;
};

/**
 * Sets or removes an error attribute on a DOM element.
 *
 * @param component - The HTML element to modify
 * @param errorMessage - The error message to set as an attribute value, or null to remove the error attribute
 * @returns void
 */
const setComponentError = (component: HTMLElement, errorMessage: string | null): void => {
  if (errorMessage) {
    component.setAttribute('error', errorMessage);
  } else {
    component.removeAttribute('error');
  }
};

/**
 * Validates all required components, sets errors on all invalid ones,
 * and returns the first error found (for focus management)
 */
/**
 * Validates a collection of HTML form components and manages their error states.
 *
 * This function iterates through the provided components, checks if required components
 * have values, and sets appropriate error messages. It handles both regular form inputs
 * and checkbox components with different error message formats.
 *
 * @param componentsToCheck - Array of HTML elements to validate
 * @param defaultError - Base error message to prepend to specific field errors
 * @returns Object containing validation results:
 *   - `hasError`: Whether any validation errors were found
 *   - `errorMessage`: The first error message encountered, or null if no errors
 *   - `focusTarget`: The first element that should receive focus due to an error, or null
 */
const validateComponents = (
  componentsToCheck: HTMLElement[],
  defaultError: string
): { hasError: boolean; errorMessage: string | null; focusTarget: HTMLElement | null } => {
  let firstError: string | null = null;
  let firstFocusTarget: HTMLElement | null = null;
  let hasAnyError = false;

  // Check all components and set errors on all that are invalid
  for (const component of componentsToCheck) {
    if (!isRequired(component)) continue;

    if (componentHasValue(component)) {
      // Clear error if component has a value
      setComponentError(component, null);
      continue;
    }

    // Component is required but has no value
    const errorMessage = createErrorMessage(component, defaultError);
    setComponentError(component, errorMessage);
    hasAnyError = true;

    // Store first error for focus management
    if (!firstError) {
      firstError = errorMessage;
      firstFocusTarget = findFocusTarget(component);
    }
  }

  return {
    hasError: hasAnyError,
    errorMessage: firstError,
    focusTarget: firstFocusTarget
  };
};

/**
 * Finds the appropriate HTML element to focus within a given component.
 *
 * This function searches for focusable input elements, prioritizing shadow DOM
 * for VA components before falling back to light DOM.
 *
 * @param component - The HTML element to search within, or null
 * @returns The focusable HTML element if found, the original component as fallback, or null if no component provided
 */
const findFocusTarget = (component: HTMLElement | null): HTMLElement | null => {
  if (!component) return null;

  // For VA components, check shadow DOM first
  if (isVaComponent(component)) {
    const shadowInput = component.shadowRoot?.querySelector(INPUT_SELECTOR) as HTMLElement | null;
    if (shadowInput) return shadowInput;
  }

  // Fall back to light DOM
  const lightInput = component.querySelector(INPUT_SELECTOR) as HTMLElement | null;
  return lightInput || component;
};

/**
 * Hook for simulating form validation and focus management in Storybook stories.
 * This is for demonstration purposes only—real validation happens in downstream apps.
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
  const [focusTarget, setFocusTarget] = useState<HTMLElement | null>(null);

  // Helper to update all validation state at once
  const setValidationState = useCallback(
    (message: string | null, isError: boolean, target: HTMLElement | null = null) => {
      setErrorMsg(message);
      setHasError(isError);
      setFocusTarget(target);
      if (isError) {
        setValidationTriggerCount(prev => prev + 1);
      }
    },
    []
  );

  /**
   * Validates component and manages error state.
   * Priority: 1. Internal errors, 2. Required field validation (parent or children)
   */
  const triggerValidation = useCallback(() => {
    const element = componentRef.current;
    if (!element) return;

    // Priority 1: Check for existing internal component errors (exclude demo errors)
    const internalError = getErrorText(element, defaultError);
    if (internalError) {
      setValidationState(internalError, true, findFocusTarget(element));
      return;
    }

    // Priority 2: Validate components (either children if present, or parent component)
    const componentsToCheck = getComponentsToValidate(element);
    const validation = validateComponents(componentsToCheck, defaultError);

    if (validation.hasError) {
      setValidationState(validation.errorMessage, true, validation.focusTarget);
      return;
    }

    // Priority 3: No error - clear any existing error
    setValidationState(null, false);
  }, [defaultError, setValidationState]);


  /**
   * Move focus to the appropriate element whenever validation finds an error
   */
  useEffect(() => {
    if (hasError && validationTriggerCount > 0 && focusTarget) {
      setTimeout(() => {
        focusTarget.focus();
      }, 0);
    }
  }, [validationTriggerCount, hasError, focusTarget]);

  return {
    errorMsg,
    setErrorMsg,
    triggerValidation,
  };
}
