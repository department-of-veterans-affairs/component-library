/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const textareaDocs = getWebComponentDocs('va-textarea');

export default {
  title: 'Components/va-textarea',
  parameters: {
    componentSubtitle: `Textarea web component`,
    docs: {
      page: () => (
        <StoryDocs
          data={{
            ...textareaDocs,
            guidance: {
              componentHref: 'form/textarea',
              componentName: 'Textarea',
            },
          }}
        />
      ),
    },
  },
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'Describe your situation',
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'maxlength': undefined,
  'value': undefined,
  'placeholder': '',
};

const Template = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
}) => {
  return (
    <va-textarea
      name={name}
      label={label}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      maxlength={maxlength}
      value={value}
      placeholder={placeholder}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textareaDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const MaxLength = Template.bind({});
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
  placeholder: 'No more than 16 characters',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
