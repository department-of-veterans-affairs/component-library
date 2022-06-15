import React, { useState } from 'react';
import NumberInput from '../../react-components/src/components/NumberInput/NumberInput';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Form/Number input/React Component/Number input',
  id: 'Components/NumberInput',
  component: NumberInput,
  parameters: {
    componentSubtitle: 'Number input React component',
    docs: {
      page: () => <StoryDocs componentName="NumberInput" />,
    },
  },
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

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

/**
 * Sets a `min` and `max`
 */
export const ValidRange = Template.bind(null);
ValidRange.args = {
  ...defaultArgs,
  min: 0,
  max: 4,
};

export const InvalidInput = Template.bind(null);
InvalidInput.args = {
  ...defaultArgs,
  errorMessage: 'This is an error',
};

export const Required = Template.bind(null);
Required.args = {
  ...defaultArgs,
  required: true,
};

export const AriaDescribedby = Template.bind(null);
AriaDescribedby.args = {
  ...defaultArgs,
  errorMessage: 'This is also an error',
  ariaDescribedby: 'testing-id',
};
