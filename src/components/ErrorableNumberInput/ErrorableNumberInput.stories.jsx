import React, { useState } from 'react';

import ErrorableNumberInput from './ErrorableNumberInput';

export default {
  title: 'Components/ErrorableNumberInput',
  component: ErrorableNumberInput,
};

const Template = args => {
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  return (
    <ErrorableNumberInput
      {...args}
      field={field}
      onValueChange={onValueChange}
    />
  );
};

const defaultArgs = {
  required: false,
  label: 'Years of service',
  name: 'years',
  field: {
    value: 0,
    dirty: false,
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

/**
 * Sets a `min` and `max`
 */
export const ValidRange = Template.bind({});
ValidRange.args = {
  ...defaultArgs,
  min: 0,
  max: 4,
};

export const InvalidInput = Template.bind({});
InvalidInput.args = {
  ...defaultArgs,
  errorMessage: 'This is an error',
};

export const Required = Template.bind({});
Required.args = {
  ...defaultArgs,
  required: true,
};
