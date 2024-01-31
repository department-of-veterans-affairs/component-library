/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const textareaDocs = getWebComponentDocs('va-textarea');

export default {
  title: `Components/Textarea`,
  id: 'components/va-textarea',
  parameters: {
    componentSubtitle: `va-textarea web component`,
    docs: {
      page: () => <StoryDocs data={textareaDocs} />,
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
  hint: null,
  'message-aria-describedby': 'Optional description text for screen readers',
  uswds: false,
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
  hint,
  'message-aria-describedby': messageAriaDescribedby,
  uswds,
}) => {
  return (
    <va-textarea
      name={name}
      label={label}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      hint={hint}
      maxlength={maxlength}
      value={value}
      placeholder={placeholder}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
      message-aria-describedby={messageAriaDescribedby}
      uswds={uswds}
    />
  );
};

const ResizableTemplate = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
  uswds,
}) => {
  return (
    <va-textarea
      class="resize-y"
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
      uswds={uswds}
    />
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textareaDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const MaxLength = Template.bind(null);
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
  placeholder: 'No more than 16 characters',
};

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: "This is example hint text" };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const ResizableControl = ResizableTemplate.bind(null);
ResizableTemplate.args = { ...defaultArgs };
