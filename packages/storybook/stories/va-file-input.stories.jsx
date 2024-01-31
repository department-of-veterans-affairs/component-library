/* eslint-disable react/prop-types */
import React from 'react';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaFileInput.displayName = 'VaFileInput';

const fileInputDocs = getWebComponentDocs('va-file-input');

export default {
  title: 'Components/File input',
  id: 'components/va-file-input',
  parameters: {
    componentSubtitle: `va-file-input web component`,
    docs: {
      page: () => <StoryDocs data={fileInputDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Upload additional evidence',
  'name': 'my-file-input',
  'button-text': 'Upload file',
  'accept': 'image/*',
  'required': false,
  'error': "",
  'enable-analytics': false,
  hint: null,
  'vaChange': (event) => alert(`File change event received: ${event?.detail?.files[0]?.name}`),
  'uswds': false
};

const Template = ({
  label,
  name,
  'button-text': buttonText,
  accept,
  error,
  required,
  hint,
  'enable-analytics': enableAnalytics,
  vaChange,
  uswds
}) => {
  return (
    <VaFileInput
      label={label}
      name={name}
      button-text={buttonText}
      accept={accept}
      required={required}
      error={error}
      hint={hint}
      enable-analytics={enableAnalytics}
      onVaChange={vaChange}
      uswds={uswds}
    />
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

Default.argTypes = propStructure(fileInputDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: "This is example hint text" };

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = { ...defaultArgs, required: true, error: "We couldn't upload your file" };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };