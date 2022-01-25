import React from 'react';
import { generateEventsDescription } from './events';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const radioDocs = getWebComponentDocs('va-radio');
const radioItem = getWebComponentDocs('va-radio-option');

export default {
  title: 'Components/va-radio',
  subcomponents: componentStructure(radioItem),
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(radioDocs),
      },
    },
  },
  argTypes: {
    keydown: {
      description: 'The event emitted when a key is pressed.',
    },
    radioOptionSelected: {
      description: 'The event emitted when the selected option value changes.',
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
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-radio-option label="Option one" name="example" value="1" />
      <va-radio-option label="Option two" name="example" value="2" />
    </va-radio>
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
Default.argTypes = propStructure(radioDocs);

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};
