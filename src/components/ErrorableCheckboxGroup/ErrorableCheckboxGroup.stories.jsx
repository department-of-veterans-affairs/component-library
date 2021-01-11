import React from 'react';
import CheckboxGroup from './CheckboxGroup';

export default {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  argTypes: {
    options: {
      control: 'object',
    },
  },
};

const Template = args => (
  <div style={{ paddingLeft: '1em' }}>
    <CheckboxGroup {...args} />
  </div>
);

const defaultArgs = {
  label: 'Checkbox Group',
  errorMessage: 'This is an error message',
  required: true,
  options: [
    {
      label: 'Checkbox label',
      value: 'value',
      content: 'a string',
      additional: 'another thing',
    },
    {
      label: 'Checkbox label',
      value: 'value',
      content: 'some more content',
      additional: 'and another thing',
    },
  ],
  values: { key: 'value' },
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};
