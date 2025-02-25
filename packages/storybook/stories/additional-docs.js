import { category, level } from './maturity-scale';

const { CAUTION, DONT_USE, USE } = category;
const { AVAILABLE, BEST_PRACTICE, CANDIDATE, DEPLOYED, DEPRECATED, PROPOSED } =
  level;

export const additionalDocs = {
  // MDX
  'Address block': {
    guidanceHref: 'address-block',
    guidanceName: 'Address block',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
  // MDX
  'Divider': {
    guidanceHref: 'divider',
    guidanceName: 'Divider',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  'Dropdown panel - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Expanding group - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  // MDX
  'Eyebrow': {
    guidanceHref: 'eyebrow',
    guidanceTag: 'Eyebrow',
    maturityCategory: CAUTION,
    maturityLevel: CANDIDATE,
  },
  // MDX
  'Link - Action': {
    guidanceHref: 'link/action',
    guidanceName: 'Action link',
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'va-link-action': {
    guidanceHref: 'link/action',
    guidanceName: 'Action link',
  },
  'Modal - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Privacy agreement - React': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
  // MDX
  'Sidenav': {
    guidanceHref: 'sidenav',
    guidanceName: 'Sidenav',
    maturityCategory: USE,
    maturityLevel: BEST_PRACTICE,
  },
  // MDX
  'Tag': {
    guidanceHref: 'tag',
    guidanceName: 'Tag',
    maturityCategory: USE,
    maturityLevel: DEPLOYED,
  },
};
