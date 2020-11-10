import React from 'react';
import ErrorableCheckboxGroup from './ErrorableCheckboxGroup';

export default {
  title: 'Library/ErrorableCheckboxGroup',
  component: ErrorableCheckboxGroup,
  argTypes: {
    options: {
      control: 'object',
    },
  },
};

const Template = (args) => (
  <div style={{ paddingLeft: '1em' }}>
    <ErrorableCheckboxGroup {...args} />
  </div>
);

const defaultArgs = {
  label: 'Errorable Checkbox Group',
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
