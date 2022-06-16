import { category, level } from './maturity-scale';

const { CAUTION, DONT_USE, USE } = category;
const { AVAILABLE, BEST_PRACTICE, CANDIDATE, DEPLOYED, DEPRECATED, PROPOSED } =
  level;

export const additionalDocs = {
  'Accept terms prompt': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Accordion': {
    maturityCategory: USE,
  },
  // MDX
  'Action link': {
    guidanceHref: 'link/action',
    guidanceName: 'Action link',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Additional info': {
    maturityCategory: USE,
  },
  // MDX
  'Address block': {
    guidanceHref: 'address-block',
    guidanceName: 'Address block',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Alert': {
    maturityCategory: USE,
  },
  'Alert - expandable': {
    maturityCategory: CAUTION,
  },
  'Back to top': {
    maturityCategory: USE,
  },
  'Banner': {
    maturityCategory: USE,
  },
  'Breadcrumbs': {
    maturityCategory: USE,
  },
  // MDX
  'Button': {
    guidanceHref: 'button',
    guidanceName: 'Button',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
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
  'Drop Down Panel': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Expanding Group': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Featured content': {
    maturityCategory: USE,
  },
  'File Input': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Form': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'Help Menu': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Icons': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Loading indicator': {
    maturityCategory: USE,
  },
  'Maintenance Banner': {
    maturityCategory: CAUTION,
  },
  'MaintenanceBanner': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Modal': {
    maturityCategory: USE,
  },
  'Month Year': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'OMB Info': {
    maturityCategory: USE,
  },
  'OMBInfo': {
    guidanceHref: 'omb-info',
    guidanceName: 'OMB info',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'On this page': {
    maturityCategory: USE,
  },
  'Pagination': {
    maturityCategory: USE,
  },
  'ProgressButton': {
    guidanceHref: 'button/progress-button',
    guidanceName: 'Progress button',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Privacy Agreement': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Process list': {
    maturityCategory: USE,
  },
  'Progress bar - Activity': {
    maturityCategory: USE,
  },
  'Promo banner': {
    maturityCategory: USE,
  },
  'RadioButtons': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Search input': {
    maturityCategory: USE,
  },
  'Segmented progress bar': {
    maturityCategory: USE,
  },
  'Select': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // MDX
  'Sidenav': {
    guidanceHref: 'sidenav',
    guidanceName: 'Sidenav',
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'System Down View': {
    maturityCategory: CAUTION,
    maturityLevel: DEPLOYED,
  },
  'Table': {
    maturityCategory: USE,
  },
  // MDX
  'Tag': {
    guidanceHref: 'tag',
    guidanceName: 'Tag',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Telephone': {
    maturityCategory: USE,
  },
  'TextArea': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'TextInput': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // Web Component Tag Linkage
  'va-accordion': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-additional-info': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-alert': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-alert-expandable': {
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  'va-back-to-top': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-banner': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-breadcrumbs': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-button': {
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  'va-checkbox': {
    guidanceHref: 'form/checkbox',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-checkbox-group': {
    guidanceHref: 'form/checkbox',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-date': {
    guidanceHref: 'form/date-input',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-date-text-input': {
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  'va-featured-content': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-loading-indicator': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-modal': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-number-input': {
    guidanceHref: 'form/number-input',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-on-this-page': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-pagination': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-process-list': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-progress-bar': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-promo-banner': {
    guidanceHref: 'promo-banners',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-radio': {
    guidanceHref: 'form/radio-button',
    guidanceName: 'Radio button',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-search-input': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-segmented-progress-bar': {
    guidanceHref: 'form/progress-bar-segmented',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-select': {
    guidanceHref: 'form/select',
    guidanceName: 'Select box',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-table': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-telephone': {
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'va-text-input': {
    guidanceHref: 'form/text-input',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-textarea': {
    guidanceHref: 'form/textarea',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
};
