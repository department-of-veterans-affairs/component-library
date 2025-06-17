// Import types from the VA component library
import { Components } from '@department-of-veterans-affairs/component-library/dist/components/types/components';

// Define JSX namespace to support VA web components in JSX
declare namespace JSX {
  interface IntrinsicElements {
    // Map all VA components to their respective types
    'va-button': Components.VaButton;
    'va-alert': Components.VaAlert;
    'va-header-minimal': Components.VaHeaderMinimal;
    'va-link': Components.VaLink;
    'va-breadcrumbs': Components.VaBreadcrumbs;
    // Add other VA components as needed
  }
}