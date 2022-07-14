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
  'Accept terms prompt': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  // MDX
  'Address block': {
    guidanceHref: 'address-block',
    guidanceName: 'Address block',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  // MDX
  'Button - CSS': {
    guidanceHref: 'button',
    guidanceName: 'Button',
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Breadcrumbs - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Checkbox - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Date - React': {
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
  'Dropdown panel': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'Expanding group': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'File input': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Help menu': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'Icon - base': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE
  },
  'Icon - help': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'Icon - search': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'Icon - user': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'MaintenanceBanner': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'MonthYear': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Modal - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'NumberInput - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'OMBInfo': {
    guidanceHref: 'omb-info',
    guidanceName: 'OMB info',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Pagination - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Privacy agreement': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'ProgressButton': {
    guidanceHref: 'button/progress-button',
    guidanceName: 'Progress button',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'RadioButtons - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Select - React': {
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
  'System down view': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  'Table - React': {
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
  'TextInput - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
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
  'va-button-pair': {
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
  'va-memorable-date': {
    guidanceHref: 'form/memorable-date',
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  'va-featured-content': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'va-link': {
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
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
  'va-omb-info': {
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
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
