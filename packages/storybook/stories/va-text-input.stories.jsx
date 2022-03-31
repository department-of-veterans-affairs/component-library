/* eslint-disable react/prop-types */
import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Components/va-text-input',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(textInputDocs),
      },
    },
  },
  argTypes: {
    inputmode: {
      control: {
        type: 'select',
        options: [
          'decimal',
          'email',
          'numeric',
          'search',
          'tel',
          'text',
          'url',
        ],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['email', 'number', 'search', 'tel', 'text', 'url'],
      },
    },
  },
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'My input',
  'autocomplete': undefined,
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'maxlength': undefined,
  'value': undefined,
  'inputmode': undefined,
  'type': undefined,
  'aria-describedby': undefined,
};

const Template = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  inputmode,
  type,
  'aria-describedby': ariaDescribedby,
}) => {
  return (
    <va-text-input
      name={name}
      label={label}
      autocomplete={autocomplete}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      maxlength={maxlength}
      value={value}
      inputmode={inputmode}
      type={type}
      aria-describedby={ariaDescribedby}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textInputDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const MaxLength = Template.bind({});
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  ...defaultArgs,
  name: 'email',
  autocomplete: 'email',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

const WithHintTextTemplate = ({ name, label }) => {
  return (
    <va-text-input name={name} label={label}>
      <span className="vads-u-display--block vads-u-color--gray-medium">
        You'll find this number on your case documents
      </span>
    </va-text-input>
  );
};

export const WithHintText = WithHintTextTemplate.bind({});
WithHintText.args = {
  ...defaultArgs,
  label: 'Case or docket number',
};
