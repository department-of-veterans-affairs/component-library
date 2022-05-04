/* eslint-disable react/prop-types */
import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Components/va-text-input',
  parameters: {
    componentSubtitle: `Text Input web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/form-controls#text-inputs">View guidance for the Text Input component in the Design System</a>` +
          '\n' +
          generateEventsDescription(textInputDocs),
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
  'minlength': undefined,
  'value': undefined,
  'inputmode': undefined,
  'type': undefined,
  'pattern': undefined,
  'status': undefined,
};

const Template = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  minlength,
  value,
  inputmode,
  type,
  status,
  pattern,
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
      minlength={minlength}
      value={value}
      inputmode={inputmode}
      type={type}
      status={status}
      pattern={pattern}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textInputDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Success = Template.bind({});
Success.args = { ...defaultArgs, status: 'success' };

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const MaxLength = Template.bind({});
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
};

export const Range = Template.bind({});
Range.args = {
  ...defaultArgs,
  label: 'Acceptable range 3 - 6 characters',
  minlength: '3',
  maxlength: '6',
};

export const Pattern = Template.bind({});
Pattern.args = {
  ...defaultArgs,
  label: 'Must be 4 digits',
  pattern: '[0-9]{4}',
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

export const WithHintText = WithHintTextTemplate.bind({});
WithHintText.args = {
  ...defaultArgs,
  label: 'Veteran’s Social Security number',
};
