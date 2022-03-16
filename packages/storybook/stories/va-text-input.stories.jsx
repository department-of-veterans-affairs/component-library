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
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'My input',
  'autocomplete': false,
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'maxlength': undefined,
  'value': undefined,
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

const ExperimentalTemplate = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
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
    >
      <div className="vads-u-margin-bottom--1">
        <va-additional-info trigger="Why is this required?">
          We need the Veteran’s Social Security number or tax identification
          number to process the application when it’s submitted online, but it’s
          not a requirement to apply for the program.
        </va-additional-info>
      </div>
    </va-text-input>
  );
};

export const Experimental = ExperimentalTemplate.bind({});
Experimental.args = {
  ...defaultArgs,
  label: 'Veteran’s Social Security number',
};
