import '@department-of-veterans-affairs/formation/dist/formation.min.css';
import { withHTML } from '@whitespace/storybook-addon-html/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [withHTML];
