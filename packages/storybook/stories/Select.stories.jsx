import React, { useState } from 'react';
import Select from '../../react-components/src/components/Select/Select';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Select',
  component: Select,
  parameters: {
    componentSubtitle: 'Select React component',
    docs: {
      page: () => <StoryDocs componentName="Select" />,
    },
  },
};

const Template = args => {
  const [value, setValue] = useState(args.value);
  const onValueChange = newValue => {
    setValue(newValue);
  };

  return <Select {...args} value={value} onValueChange={onValueChange} />;
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

export const NoBlankOption = Template.bind(null);
NoBlankOption.args = {
  ...defaultArgs,
  includeBlankOption: false,
};

export const AriaLiveRegion = Template.bind(null);
AriaLiveRegion.args = {
  ...defaultArgs,
  ariaLiveRegionText: 'The following branch was selected: ',
};

export const AriaDescribedby = Template.bind(null);
AriaDescribedby.args = {
  ...defaultArgs,
  errorMessage: 'This is also an error',
  ariaDescribedby: 'testing-id',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
