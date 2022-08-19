import { category, level } from './maturity-scale';

const { CAUTION, DONT_USE, USE } = category;
const { AVAILABLE, BEST_PRACTICE, CANDIDATE, DEPLOYED, DEPRECATED, PROPOSED } =
  level;

export const additionalDocs = {
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
  'File input - React': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
    guidanceHref: 'form/file-input',
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
  // MDX
  'Link - Action': {
    guidanceHref: 'link/action',
    guidanceName: 'Action link',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  'Banner - Maintenance': {
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
    guidanceHref: 'banner/maintenance',
  },
  'MonthYear - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Modal - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'NumberInput - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'OMB info - React': {
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
  'TextInput - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
};
