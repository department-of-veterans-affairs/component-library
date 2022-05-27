import { category, level } from './maturity-scale';

const { CAUTION, DONT_USE, USE } = category;
const { AVAILABLE, BEST_PRACTICE, CANDIDATE, DEPLOYED, DEPRECATED, PROPOSED } =
  level;

export const additionalDocs = {
  // MDX
  'Action link': {
    guidanceHref: 'link/action',
    guidanceName: 'Action link',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  // MDX
  'Address block': {
    guidanceHref: 'address-block',
    guidanceName: 'Address block',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  // MDX
  'Button': {
    guidanceHref: 'button',
    guidanceName: 'Button',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'Breadcrumbs': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Checkbox': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Date': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // MDX
  'Divider': {
    guidanceHref: 'divider',
    guidanceName: 'Divider',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'Modal': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'NumberInput': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'OMBInfo': {
    guidanceHref: 'omb-info',
    guidanceName: 'OMB info',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Pagination': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'ProgressButton': {
    guidanceHref: 'button/progress-button',
    guidanceName: 'Progress button',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'RadioButtons': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Select': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // MDX
  'Sidenav': {
    guidanceHref: 'sidenav',
    guidanceName: 'Sidenav',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'Table': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // MDX
  'Tag': {
    guidanceHref: 'tag',
    guidanceName: 'Tag',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'TextArea': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'TextInput': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'va-accordion': {
    guidanceHref: 'accordion',
    guidanceName: 'Accordion',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-additional-info': {
    guidanceHref: 'additional-info',
    guidanceName: 'Additional info',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-alert': {
    guidanceHref: 'alert',
    guidanceName: 'Alert',
    description: `Use a heading element with an attribute named slot and a value of "headline" to control what is displayed for the alert's headline. 
    Any children passed into this component without a parent slot "headline" will render in the alert's body.`,
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-alert-expandable': {
    guidanceHref: 'alert-expandable',
    guidanceName: 'Alert expandable',
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  'va-back-to-top': {
    guidanceHref: 'back-to-top',
    guidanceName: 'Back to top',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-banner': {
    guidanceHref: 'banner',
    guidanceName: 'Banner',
    description:
      `Reset the banners in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
      `Under Storage you will see both Local and Session Storage check each Storage to see if a DISMISSED_BANNERS Key exists. ` +
      `If it does right click and delete it and refresh your page to see the banners again.`,
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-breadcrumbs': {
    guidanceHref: 'breadcrumbs',
    guidanceName: 'Breadcrumbs',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-checkbox': {
    guidanceHref: 'form/checkbox',
    guidanceName: 'Checkbox',
    description: 'This component uses the native onBlur event handler.',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-checkbox-group': {
    guidanceHref: 'form/checkbox',
    guidanceName: 'Checkbox group',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-date': {
    guidanceHref: 'form/date-input',
    guidanceName: 'Date',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-featured-content': {
    guidanceHref: 'featured-content',
    guidanceName: 'Featured content',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-loading-indicator': {
    guidanceHref: 'loading-indicator',
    guidanceName: 'Loading indicator',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-modal': {
    guidanceHref: 'modal',
    guidanceName: 'Modal',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-number-input': {
    guidanceHref: 'form/number-input',
    guidanceName: 'Number input',
    description:
      'This component uses the native onInput and onBlur event handlers.',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-on-this-page': {
    guidanceHref: 'on-this-page',
    guidanceName: 'On this page',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-pagination': {
    guidanceHref: 'pagination',
    guidanceName: 'Pagination',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-process-list': {
    guidanceHref: 'process-list',
    guidanceName: 'Process list',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-progress-bar': {
    guidanceHref: 'progress-bar',
    guidanceName: 'Progress bar',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-promo-banner': {
    guidanceHref: 'promo-banners',
    guidanceName: 'Promo banner',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
    description:
      `Reset the banner in storage by opening Developer Tools in the browser and then clicking on the Application Tab. ` +
      `Under Storage you will see Local Storage and check the Storage to see if a DISMISSED_PROMO_BANNERS Key exists. ` +
      `If it does right click and delete it and refresh your page to see the banner again. ` +
      `Alternatively you can change the id on the component since the new id would not match the id in storage.`,
  },
  'va-radio': {
    guidanceHref: 'form/radio-button',
    guidanceName: 'Radio button',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-search-input': {
    guidanceHref: 'search-input',
    guidanceName: 'Search input',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-segmented-progress-bar': {
    guidanceHref: 'progress-bar/segmented',
    guidanceName: 'Segmented progress bar',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-select': {
    guidanceHref: 'form/select',
    guidanceName: 'Select box',
    description: 'This component uses the native onKeyDown event handler.',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-table': {
    guidanceHref: 'table',
    guidanceName: 'Table',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-telephone': {
    guidanceHref: 'telephone',
    guidanceName: 'Telephone',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-text-input': {
    guidanceHref: 'form/text-input',
    guidanceName: 'Text input',
    description:
      'This component uses the native onInput and onBlur event handlers.',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-textarea': {
    guidanceHref: 'form/textarea',
    guidanceName: 'Textarea',
    description:
      'This component uses the native onInput and onBlur event handlers.',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
};
