import React, { useState } from 'react';
import TextArea from '../../react-components/src/components/TextArea/TextArea';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/TextArea',
  component: TextArea,
  parameters: {
    componentSubtitle: 'Textarea React component',
    docs: {
      page: () => <StoryDocs componentName="TextArea" />,
    },
  },
};

const Template = args => {
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  return <TextArea {...args} field={field} onValueChange={onValueChange} />;
};

const defaultArgs = {
  label: 'Describe your situation',
  name: 'description',
  field: {
    value: '',
    dirty: false,
  },
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = {
  ...defaultArgs,
  errorMessage: 'There was a problem',
};

export const Required = Template.bind(null);
Required.args = {
  ...defaultArgs,
  required: true,
};

export const WithPlaceholder = Template.bind(null);
WithPlaceholder.args = {
  ...defaultArgs,
  placeholder: 'This is a placeholder',
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  disabled: true,
};

export const MaxChars = Template.bind(null);
MaxChars.args = {
  ...defaultArgs,
  charMax: 16,
  placeholder: 'No more than 16 characters',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
