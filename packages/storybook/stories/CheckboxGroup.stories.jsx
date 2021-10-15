import React from 'react';
import {CheckboxGroup} from '@department-of-veterans-affairs/component-library';

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
  required: true,
  options: [
    {
      label: 'Option one',
      value: 'value',
    },
    {
      label: 'Option two',
      value: 'value',
    },
  ],
  values: { key: 'value' },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  errorMessage: 'This is an error message',
};

export const AdditionalContent = Template.bind({});
AdditionalContent.args = {
  ...defaultArgs,
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
};
