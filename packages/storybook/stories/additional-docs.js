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
    maturityLevel: BEST_PRACTICE,
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
    guidanceName: 'Eyebrow',
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
  'Modal - React': {
    maturityCategory: DONT_USE,
    maturityLevel: DEPRECATED,
  },
  'Privacy agreement - React': {
    maturityCategory: CAUTION,
    maturityLevel: AVAILABLE,
  },
};
