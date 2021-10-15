import React, { useState } from 'react';

import {NumberInput} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/NumberInput',
  component: NumberInput,
};

const Template = args => {
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  return <NumberInput {...args} field={field} onValueChange={onValueChange} />;
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

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = {
  ...defaultArgs,
  errorMessage: 'This is also an error',
  ariaDescribedby: 'testing-id',
};
