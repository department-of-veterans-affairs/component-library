/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, StoryDocs, propStructure } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Components/va-text-input',
  parameters: {
    docs: {
      /* eslint-disable-next-line react/display-name */
      page: () => <StoryDocs docs={textInputDocs.docs} />,
    },
  },
};

const defaultArgs = {
  name: 'my-input',
  label: 'My input',
  autocomplete: false,
  'disable-analytics': true,
  required: false,
  error: null,
  maxlength: null,
  placeholder: null,
  value: null,
};

const Template = props => {
  return <va-text-input {...props} />;
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textInputDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = { ...defaultArgs, placeholder: 'This is a placeholder' };

export const MaxLength = Template.bind({});
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
  placeholder: 'No more than 16 characters',
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  ...defaultArgs,
  name: 'email',
  autocomplete: 'email',
  placeholder: 'This should complete using email addresses',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = { ...defaultArgs, 'disable-analytics': false };
