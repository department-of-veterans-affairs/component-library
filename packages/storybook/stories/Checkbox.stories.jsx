import React from 'react';
import Checkbox from '../../react-components/src/components/Checkbox/Checkbox';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Deprecated/Checkbox - React',
  component: Checkbox,
  parameters: {
    componentSubtitle: 'Checkbox React component',
    docs: {
      page: () => <StoryDocs componentName="Checkbox" />,
    },
  },
};

const Template = args => (
  <div style={{ paddingLeft: '1em' }}>
    <Checkbox {...args} />
  </div>
);

const defaultArgs = {
  required: true,
  label: "I want to type in my school's name and address.",
  labelAboveCheckbox:
    "If you don't find your school in the search results, then check the box to enter in your school information manually.",
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  errorMessage: 'Error message',
};

export const WithAnalytics = Template.bind(null);

WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
