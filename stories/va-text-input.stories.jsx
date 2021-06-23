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
