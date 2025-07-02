
/**
 * Import the components we need from the VA component library.
 * Alternatively, you can import all components at once with the following instead:
 * 
 * import { applyPolyfills, defineCustomElements } from '@department-of-veterans-affairs/component-library/dist/components';
 */
import { 
  defineCustomElementVaButton,
  defineCustomElementVaAlert,
  defineCustomElementVaHeaderMinimal,
  defineCustomElementVaMinimalFooter,
  defineCustomElementVaLink,
  defineCustomElementVaBreadcrumbs,
  // Add more components as needed
} from '@department-of-veterans-affairs/component-library/dist/components';

/**
 * Initialize the individual web components we need.
 * 
 * Alternatively, you can initialize all components at once with 
 * the following instead:
 * 
 *   applyPolyfills();
 *   defineCustomElements();
 */
export const initVAComponents = () => {
  // Define the custom elements we need
  defineCustomElementVaButton();
  defineCustomElementVaAlert();
  defineCustomElementVaHeaderMinimal();
  defineCustomElementVaMinimalFooter();
  defineCustomElementVaLink();
  defineCustomElementVaBreadcrumbs();
};

// Auto-initialize when this module is loaded
export const initializeVAComponents = () => {
  initVAComponents();
  console.log('VA Component Library components initialized');
};

// Auto-initialize on import
initializeVAComponents();