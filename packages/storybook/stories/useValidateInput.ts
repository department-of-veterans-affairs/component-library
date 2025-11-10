import { useState, useRef, useEffect, useCallback } from 'react';

// Note to explain intent of storybook demo
export const INTERNAL_TESTING_NOTE =
    'recommended focus management when simulated validation runs on the component. ' +
    'When the field is empty, clicking the \"Submit\" button should trigger required ' +
    'field validation and move focus inside the form field. Screen reader users ' +
    'should hear the error message and other relevant context';

// ============================================================================
// CONSTANTS
// ============================================================================

const HIDDEN_FILTER = ':not([aria-hidden="true"]):not([hidden])';
const INPUT_SELECTOR = `input${HIDDEN_FILTER}, textarea${HIDDEN_FILTER}, select${HIDDEN_FILTER}`;
const ERROR_ATTRIBUTES = ['error', 'input-error', 'checkbox-error', 'group-option-error'] as const;

// ============================================================================
// COMPONENT TYPE DETECTION
//
// VA form components fall into three error structure categories:
//
// CATEGORY 1 - DIRECT ERROR
//   Component receives error, input is in shadow DOM, no child VA components
//   Examples: va-text-input, va-textarea, va-select
//   Error handling: Set 'error' attribute on component only
//   Screen reader error message gets added to each erroring element
//
// CATEGORY 2 - CHILD COMPONENT ERROR
//   Only the child VA components receive error prop
//   Examples: va-memorable-date, va-statement-of-truth
//   Error handling: Set 'error' attribute on the children
//   Screen reader error message gets added to each erroring child element
//
// CATEGORY 3 - GROUP COMPONENT ERROR
//   Parent gets error, children get alternative error prop
//   Examples: va-radio (with va-radio-option), va-checkbox-group (with va-checkbox)
//   Error handling: Set 'error' on parent, 'groupOptionError' on children
//   Screen reader error message gets added to each option element
// ============================================================================

const isVaComponent = (node: Element | null | undefined): node is HTMLElement =>
  !!node && node.tagName.toLowerCase().startsWith('va-');

// Category 3: Group component type detection
const isCheckboxComponent = (component: HTMLElement): boolean =>
  component.tagName.toLowerCase().includes('checkbox');

const isRadioComponent = (component: HTMLElement): boolean =>
  component.tagName.toLowerCase() === 'va-radio';

const isCheckboxGroupComponent = (component: HTMLElement): boolean =>
  component.tagName.toLowerCase() === 'va-checkbox-group';

const isGroupComponent = (component: HTMLElement): boolean =>
  isRadioComponent(component) || isCheckboxGroupComponent(component);

// ============================================================================
// CATEGORY 3: GROUP COMPONENT UTILITIES
// Helpers specific to va-radio and va-checkbox-group
// ============================================================================

const getCheckboxElements = (component: HTMLElement): HTMLElement[] =>
  Array.from(component.querySelectorAll('va-checkbox')) as HTMLElement[];

const getRadioOptionElements = (component: HTMLElement): HTMLElement[] =>
  Array.from(component.querySelectorAll('va-radio-option')) as HTMLElement[];

const getCheckboxInput = (checkbox: HTMLElement): HTMLInputElement | null =>
  queryInBothDOMs<HTMLInputElement>(checkbox, 'input[type="checkbox"]');

const getRadioInput = (option: HTMLElement): HTMLInputElement | null =>
  queryInBothDOMs<HTMLInputElement>(option, 'input[type="radio"]');

const toBoolean = (value: unknown): boolean | null => {
  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
  }

  return null;
};

const getBooleanAttribute = (element: HTMLElement, attributeName: string): boolean | null => {
  if (!element.hasAttribute(attributeName)) {
    return null;
  }

  const value = element.getAttribute(attributeName);
  if (value === null || value === '') {
    return true;
  }

  const normalized = value.trim().toLowerCase();
  if (normalized === 'false') return false;
  if (normalized === 'true') return true;

  return true;
};

const isElementChecked = (
  element: HTMLElement,
  input: HTMLInputElement | null
): boolean => {
  if (input?.checked) {
    return true;
  }

  const ariaChecked = input?.getAttribute('aria-checked');
  if (ariaChecked === 'true') {
    return true;
  }
  if (ariaChecked === 'false') {
    return false;
  }

  const propValue = toBoolean((element as any).checked);
  if (propValue !== null) {
    return propValue;
  }

  const attrValue = getBooleanAttribute(element, 'checked');
  if (attrValue !== null) {
    return attrValue;
  }

  return false;
};

// ============================================================================
// SHARED UTILITIES (All Categories)
// ============================================================================

const getComponentLabel = (component: HTMLElement): string =>
  component.getAttribute('label') ||
  component.getAttribute('name') ||
  component.tagName.toLowerCase().replace('va-', '');

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
 * This is particularly useful for VA components that typically
 * place their elements within shadow DOM, but sometimes do not.
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
const readErrorFromElement = (
  element: HTMLElement | null,
  defaultError: string
): string | null => {
  if (!element) return null;

  for (const attr of ERROR_ATTRIBUTES) {
    const value = element.getAttribute(attr);
    const normalizedValue = value?.trim();
    if (!normalizedValue) continue;

    if (normalizedValue.startsWith(defaultError)) continue;

    return value;
  }

  return null;
};

/**
 * Retrieves error text from an HTML element, optionally checking descendant elements.
 *
 * @param element - The HTML element to check for error text
 * @param defaultError - The default error message to use if no specific error is found
 * @param includeDescendants - Whether to search descendant VA components for errors (defaults to false)
 * @returns The error text if found, or null if no errors are present
 *
 * @remarks
 * This function first checks the provided element directly for error text. If no error is found
 * and includeDescendants is true, it will search through all descendant VA components for errors.
 * The first error found is returned.
 */
const getErrorText = (
  element: HTMLElement,
  defaultError: string,
  includeDescendants: boolean = false
): string | null => {
  const directError = readErrorFromElement(element, defaultError);
  if (directError) {
    console.log('direct error', directError)
    return directError;
  }

  if (!includeDescendants) {
    console.log('no include descendants')
    return null;
  }

  const childComponents = getDescendantVaComponents(element);
  for (const child of childComponents) {
    const groupOptionError = readErrorFromElement(child, defaultError);
    if (groupOptionError) {
      console.log('group option error', groupOptionError);
      return groupOptionError;
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
  const groupComponent = isGroupComponent(component);
  const childComponents = getDescendantVaComponents(component);

  if (childComponents.length > 0 && groupComponent) {
    console.log('child components found for validation:', childComponents);
    return [component, ...childComponents];
  } else if (childComponents.length > 0) {
    return childComponents;
  }
  console.log('no child components found for validation');
  return [component];
};

// ============================================================================
// VALUE DETECTION (All Categories)
// ============================================================================

// Category 1: Direct error components (single checkbox)
const isCheckboxChecked = (component: HTMLElement): boolean =>
  isElementChecked(component, getCheckboxInput(component));

// Category 3: Group component - va-radio
const radioHasValue = (component: HTMLElement): boolean => {
  const options = getRadioOptionElements(component);
  return options.some(option => isElementChecked(option, getRadioInput(option)));
};

// Category 3: Group component - va-checkbox-group
/**
 * Checks if any checkbox within a checkbox group has a checked value.
 *
 * This function examines multiple sources to determine if a checkbox is checked:
 * - The input element's `checked` property
 * - The `aria-checked` attribute value
 * - The component's `checked` property
 * - The `checked` attribute on the element
 *
 * @param component - The HTML element containing the checkbox group
 * @returns `true` if at least one checkbox in the group is checked, `false` otherwise
 */
const checkboxGroupHasValue = (component: HTMLElement): boolean => {
  return getCheckboxElements(component).some(checkbox => {
    return isElementChecked(checkbox, getCheckboxInput(checkbox));
  });
};

/**
 * Determines whether a given HTML component has a value.
 *
 * Handles different component types including radio buttons, checkbox groups,
 * individual checkboxes, and text-based inputs. For radio and checkbox components,
 * it checks if they are selected/checked. For other components, it validates
 * that the trimmed value has a length greater than 0.
 *
 * @param component - The HTML element to check for a value
 * @returns `true` if the component has a value, `false` otherwise
 */
const componentHasValue = (component: HTMLElement): boolean => {

  if (isRadioComponent(component)) {
    return radioHasValue(component);
  }

  if (isCheckboxGroupComponent(component)) {
    return checkboxGroupHasValue(component);
  }

  if (isCheckboxComponent(component)) {
    return isCheckboxChecked(component);
  }

  const value = getCurrentValue(component);
  return value.trim().length > 0;
};

// ============================================================================
// ERROR HANDLING BY CATEGORY
// ============================================================================

/**
 * CATEGORY 3 HELPER: Retrieves child elements from a group component.
 *
 * @param component - The HTML element to extract children from
 * @returns An array of HTML elements that are children of the group component.
 *          Returns checkbox elements if the component is a checkbox group,
 *          radio option elements if the component is a radio component,
 *          or an empty array if the component is neither type.
 */
const getGroupChildren = (component: HTMLElement): HTMLElement[] => {
  if (isCheckboxGroupComponent(component)) {
    return getCheckboxElements(component);
  }

  if (isRadioComponent(component)) {
    return getRadioOptionElements(component);
  }

  return [];
};

type ErrorProperty = 'error' | 'groupOptionError';

const syncAttributeAndProperty = (
  element: HTMLElement,
  attributeName: string,
  propertyName: ErrorProperty,
  message: string | null
): void => {
  if (message) {
    element.setAttribute(attributeName, message);
  } else {
    element.removeAttribute(attributeName);
  }

  if (propertyName in element) {
    try {
      (element as any)[propertyName] = message ?? undefined;
    } catch (err) {
      // Ignore read-only props
    }
  }
};

/**
 * CATEGORY 3: Applies alternative error state to children of group components.
 *
 * Group components (va-radio, va-checkbox-group) use a different error property
 * for their children: 'groupOptionError' instead of 'error'. This allows the parent
 * to display error styling while children display alternative visual indicators.
 *
 * @param component - The HTML element to check and potentially apply child errors to
 * @param message - The error message to apply to child components, or null to clear the error
 * @returns void
 */
const applygroupOptionErrorToGroup = (component: HTMLElement, message: string | null): void => {
  if (!isGroupComponent(component)) {
    return;
  }

  const children = getGroupChildren(component);
  children.forEach(child => syncAttributeAndProperty(child, 'group-option-error', 'groupOptionError', message));
};

/**
 * Sets or removes error on a component, handling all three error structure categories.
 *
 * CATEGORY 1 (Direct Error): Sets 'error' on the component only
 * CATEGORY 2 (Cascading Error): Would set 'error' on parent and children (not yet implemented)
 * CATEGORY 3 (Group Components): Sets 'error' on parent, 'groupOptionError' on children
 *
 * @param component - The HTML element to modify
 * @param errorMessage - The error message to set, or null to remove error attributes
 */
const setComponentError = (component: HTMLElement, errorMessage: string | null): void => {
  // Category 3: Set alternative error on children for group components
  applygroupOptionErrorToGroup(component, errorMessage);

  // All categories: Set error on the parent component
  syncAttributeAndProperty(component, 'error', 'error', errorMessage);
};

// ============================================================================
// VALIDATION (All Categories)
// ============================================================================

/**
 * Validates a collection of HTML form components and manages their error states.
 *
 * Handles all three error structure categories by delegating to setComponentError,
 * which applies the appropriate error handling based on component type.
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
    // Check if this component has child VA components
    const childComponents = getDescendantVaComponents(component);
    const hasChildComponents = childComponents.length > 0;
    console.log('error message found during validation', errorMessage)

    console.log('child components', childComponents)
    console.log('has child components?', hasChildComponents)
    if (hasChildComponents) {
      // Only set error on child components, not the parent
      childComponents.forEach(child => {
      setComponentError(child, errorMessage);
      });
    } else {
      // No child components, set error on the parent component
      setComponentError(component, errorMessage);
    }
    hasAnyError = true;

    // Store first error for focus management
    if (!firstError) {
      firstError = errorMessage;
      firstFocusTarget = findFocusTarget(component);
    }
  }

  console.log('has error', hasAnyError);
  console.log('errorMessage', firstError);
  console.log('focus target', firstFocusTarget);

  return {
    hasError: hasAnyError,
    errorMessage: firstError,
    focusTarget: firstFocusTarget
  };
};

// ============================================================================
// FOCUS MANAGEMENT (All Categories)
// ============================================================================

/**
 * CATEGORY 3: Finds the appropriate focus target for group components.
 * Returns the input element of the first child (va-radio-option or va-checkbox).
 */
const findGroupFocusTarget = (component: HTMLElement): HTMLElement | null => {
  if (isRadioComponent(component)) {
    const firstOption = component.querySelector('va-radio-option') as HTMLElement | null;
    if (firstOption) {
      const input = getRadioInput(firstOption);
      return input || firstOption;
    }
  }

  if (isCheckboxGroupComponent(component)) {
    const firstCheckbox = component.querySelector('va-checkbox') as HTMLElement | null;
    if (firstCheckbox) {
      const input = getCheckboxInput(firstCheckbox);
      return input || firstCheckbox;
    }
  }

  return null;
};

/**
 * Finds the appropriate HTML element to focus within a given component.
 *
 * This function searches for focusable input elements with special handling for:
 * - CATEGORY 3 (Group components): focuses the first child's input
 * - CATEGORY 1/2 (VA components): prioritizes shadow DOM over light DOM
 * - Components with group-option-error attributes: recursively finds focus target
 *
 * @param component - The HTML element to search within, or null
 * @returns The focusable HTML element if found, the original component as fallback, or null if no component provided
 */
const findFocusTarget = (component: HTMLElement | null): HTMLElement | null => {
  if (!component) return null;

  // Special handling for group components (Category 3)
  if (isGroupComponent(component)) {
    const groupTarget = findGroupFocusTarget(component);
    if (groupTarget) return groupTarget;
  }

  // For VA components, check shadow DOM first (Category 1)
  if (isVaComponent(component)) {
    const shadowInput = component.shadowRoot?.querySelector(INPUT_SELECTOR) as HTMLElement | null;
    if (shadowInput) return shadowInput;
  }

  // Fall back to light DOM
  const lightInput = component.querySelector(INPUT_SELECTOR) as HTMLElement | null;
  if (lightInput) return lightInput;

  // If no direct focus target found, attempt to focus the first descendant with a group-option-error
  const descendantWithGroupOptionError = getDescendantVaComponents(component).find(descendant =>
    descendant.hasAttribute('group-option-error') && descendant.getAttribute('group-option-error')?.trim()
  );

  if (descendantWithGroupOptionError) {
    const childTarget = findFocusTarget(descendantWithGroupOptionError);
    if (childTarget) return childTarget;
  }

  return component;
};

// ============================================================================
// REACT HOOK (Main Export)
// ============================================================================

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
    const internalError = getErrorText(element, defaultError, true);
    console.log('internal error:', internalError);

    if (internalError) {
      setValidationState(internalError, true, findFocusTarget(element));
      return;
    }

    // Priority 2: Validate components (either children if present, or parent component)
    const componentsToCheck = getComponentsToValidate(element);
    console.log('element to validate', element);

    console.log('components to check', componentsToCheck);
    const validation = validateComponents(componentsToCheck, defaultError);
    console.log('validation result', validation);
    console.log('validation result has error', validation.hasError);
    console.log('validation result has error message', validation.errorMessage);
    console.log('validation result has focus target', validation.focusTarget);
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
