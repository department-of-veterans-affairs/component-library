import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook for simulating form validation and focus management in Storybook stories.
 * This is for demonstration purposes only, designed to loosely mimic focus management in the forms library.
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

  /**
   * Find the input element within the component.
   * Checks shadow DOM first, then falls back to light DOM.
   */
  const getInputElement = (): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null => {
    const element = componentRef.current;
    if (!element) return null;

    // Check shadow DOM first (where most VA components place inputs)
    const shadowInput = element.shadowRoot?.querySelector(
      'input, textarea, select'
    ) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
    if (shadowInput) return shadowInput;

    // Fall back to light DOM
    return element.querySelector(
      'input, textarea, select'
    ) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
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

    // Check for internal component errors first
    // Exclude our own demo error messages (which start with defaultError)
    const errorAttr = element.getAttribute('error');
    const inputErrorAttr = element.getAttribute('input-error');
    const checkboxErrorAttr = element.getAttribute('checkbox-error');

    const internalError = errorAttr || inputErrorAttr || checkboxErrorAttr;

    // Only use internal error if it's NOT one of our demo messages
    const isOurDemoError = internalError?.startsWith(defaultError);

    if (internalError && !isOurDemoError) {
      setErrorMsg(internalError);
      return;
    }

    // Check for required field validation
    const input = getInputElement();
    if (input && input.hasAttribute('required')) {
      // Check the input element's value first
      let inputValue = input.value || '';

      // If input is empty, also check the component's value property/attribute
      if (!inputValue.trim()) {
        inputValue = (element as any).value || element.getAttribute('value') || '';
      }

      if (!inputValue.trim()) {
        const errorMessage = `${defaultError}: field is empty`;
        setErrorMsg(errorMessage);
        setHasError(true);
        setValidationTriggerCount(prev => prev + 1);
        return;
      }
    }

    // No error - clear any existing error
    setErrorMsg(null);
    setHasError(false);
  }, [defaultError]);

  /**
   * Move focus to the input element whenever validation finds an error.
   * Triggers on every submit that results in an error, even if the error hasn't changed.
   */
  useEffect(() => {
    if (hasError && validationTriggerCount > 0) {
      // Use setTimeout to ensure DOM has updated
      setTimeout(() => {
        const input = getInputElement();
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
