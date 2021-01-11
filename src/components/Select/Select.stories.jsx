import React, { useState } from 'react';

import Select from './Select';

export default {
  title: 'Components/Select',
  component: Select,
};

const Template = args => {
  const [value, setValue] = useState(args.value);
  const onValueChange = newValue => {
    setValue(newValue);
  };

  return (
    <Select {...args} value={value} onValueChange={onValueChange} />
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
