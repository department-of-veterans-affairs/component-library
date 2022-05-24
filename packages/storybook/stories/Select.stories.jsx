import React, { useState } from 'react';
import Select from '../../react-components/src/components/Select/Select';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Select (deprecated)',
  component: Select,
  parameters: {
    componentSubtitle: 'Select React component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            componentName: 'Select',
          }}
        />
      ),
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

export const AriaLiveRegion = Template.bind({});
AriaLiveRegion.args = {
  ...defaultArgs,
  ariaLiveRegionText: 'The following branch was selected: ',
};

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = {
  ...defaultArgs,
  errorMessage: 'This is also an error',
  ariaDescribedby: 'testing-id',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
