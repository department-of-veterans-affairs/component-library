import React from 'react';
import { generateEventsDescription } from './events';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/va-checkbox-group',
  subcomponents: componentStructure(checkbox),
  parameters: {
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      description: {
        component: generateEventsDescription(checkBoxGroupDocs),
      },
    },
  },
  argTypes: {
    vaChange: {
      description: 'The event emitted when the input value changes.',
    },
  },
};

const Template = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox label="Option one" name="example" value="1" />
      <va-checkbox label="Option two" name="example" value="2" />
    </va-checkbox-group>
  );
};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'This is a label',
  'required': false,
  'error': null,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};
