import React, { useState } from 'react';

import ErrorableTextArea from './ErrorableTextArea';

export default {
  title: 'Library/ErrorableTextArea',
  component: ErrorableTextArea,
};

const Template = (args) => {
  const [field, setField] = useState(args.field);
  const onValueChange = (newField) => {
    console.log('value changed:', newField);
    setField(newField);
  };

  return (
    <ErrorableTextArea {...args} field={field} onValueChange={onValueChange} />
  );
};

const defaultArgs = {
  label: 'Describe your situation',
  name: 'description',
  field: {
    value: '',
    dirty: false,
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  ...defaultArgs,
  errorMessage: 'There was a problem',
};

export const Required = Template.bind({});
Required.args = {
  ...defaultArgs,
  required: true,
};

export const WithPlaceholder = Template.bind({});
WithPlaceholder.args = {
  ...defaultArgs,
  placeholder: 'This is a placeholder',
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const MaxChars = Template.bind({});
MaxChars.args = {
  ...defaultArgs,
  charMax: 16,
  placeholder: 'No more than 16 characters',
};
