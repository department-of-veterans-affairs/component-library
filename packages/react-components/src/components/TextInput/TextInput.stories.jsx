import React, { useState } from 'react';

import TextInput from './TextInput';

export default {
  title: 'Components/TextInput (deprecated)',
  component: TextInput,
};

const Template = args => {
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  return <TextInput {...args} field={field} onValueChange={onValueChange} />;
};

const defaultArgs = {
  label: 'First name',
  name: 'first_name',
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

export const MaxChars = Template.bind({});
MaxChars.args = {
  ...defaultArgs,
  charMax: 16,
  placeholder: 'No more than 16 characters',
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  ...defaultArgs,
  autocomplete: 'email',
  label: 'Email',
  name: 'email',
  placeholder: 'This should autocomplete using email addresses',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
