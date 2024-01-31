/* eslint-disable react/prop-types */
import React from 'react';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const fileInputDocs = getWebComponentDocs('va-file-input');

export default {
  title: 'USWDS/File input USWDS',
  id: 'uswds/va-file-input',
  parameters: {
    componentSubtitle: `va-file-input web component`,
    docs: {
      page: () => <StoryDocs data={fileInputDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Input accepts a single file',
  'name': 'my-file-input',
  'accept': null,
  'required': false,
  'error': '',
  'enable-analytics': false,
  'hint': null,
  'multiple': false,
  'vaChange': event =>
    alert(`File change event received: ${event?.detail?.files[0]?.name}`),
};

const Template = ({
  label,
  name,
  accept,
  error,
  required,
  hint,
  multiple,
  'enable-analytics': enableAnalytics,
  vaChange,
}) => {
  return (
    <VaFileInput
      label={label}
      name={name}
      accept={accept}
      required={required}
      error={error}
      hint={hint}
      multiple={multiple}
      enable-analytics={enableAnalytics}
      onVaChange={vaChange}
    />
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(fileInputDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const AcceptsOnlySpecificFileTypes = Template.bind(null);
AcceptsOnlySpecificFileTypes.args = {
  ...defaultArgs,
  label: 'Input accepts only specific file types',
  hint: 'Select PDF or TXT files',
  accept: '.pdf,.txt',
};

export const AcceptsAnyKindOfImage = Template.bind(null);
AcceptsAnyKindOfImage.args = {
  ...defaultArgs,
  label: 'Input accepts any kind of image',
  hint: 'Select any type of image format',
  accept: 'image/*',
};

export const AcceptsMultipleFiles = Template.bind(null);
AcceptsMultipleFiles.args = {
  ...defaultArgs,
  label: 'Input accepts multiple files',
  hint: 'Select one or more files',
  multiple: true,
};

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = {
  ...defaultArgs,
  label: 'Input has an error',
  hint: 'Select any valid file',
  error: 'Display a helpful error message',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
