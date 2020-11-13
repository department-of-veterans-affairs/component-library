import React from 'react';
import ErrorableCheckbox from './ErrorableCheckbox';

export default {
  title: 'Library/Form controls/ErrorableCheckbox',
  component: ErrorableCheckbox,
};

const Template = args => (
  <div style={{ paddingLeft: '1em' }}>
    <ErrorableCheckbox {...args} />
  </div>
);

const defaultArgs = {
  required: true,
  label: "I want to type in my school's name and address.",
  labelAboveCheckbox:
    "If you don't find your school in the search results, then check the box to enter in your school information manually.",
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  errorMessage: 'Error message',
};
