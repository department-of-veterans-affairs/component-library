import '@department-of-veterans-affairs/formation/dist/formation.min.css';
import '@department-of-veterans-affairs/formation/dist/formation';

import '../dist/component-library/component-library.css';
import { defineCustomElements } from '../loader';

defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
