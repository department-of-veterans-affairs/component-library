import React, { useState } from 'react';

import ErrorableSelect from './ErrorableSelect';

export default {
  title: 'Library/ErrorableSelect',
  component: ErrorableSelect,
};

const Template = (args) => {
  const [value, setValue] = useState(args.value);
  const onValueChange = (newValue) => {
    console.log('value changed:', newValue);
    setValue(newValue);
  };

  return (
    <ErrorableSelect {...args} value={value} onValueChange={onValueChange} />
  );
};

const defaultArgs = {
  label: 'Branch of Service',
  name: 'branch',
  value: {
    value: 'Marines',
    dirty: false,
  },
  options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard'],
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

export const NoBlankOption = Template.bind({});
NoBlankOption.args = {
  ...defaultArgs,
  includeBlankOption: false,
};
