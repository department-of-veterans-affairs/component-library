/* eslint-disable react/prop-types */
import React from 'react';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const fileInputDocs = getWebComponentDocs('va-file-input');

export default {
  title: 'Components/File input USWDS',
  id: 'uswds/va-file-input',
  parameters: {
    componentSubtitle: `va-file-input web component`,
    docs: {
      page: () => <StoryDocs data={fileInputDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Select a file to upload',
  'name': 'my-file-input',
  'accept': null,
  'required': false,
  'error': '',
  'enable-analytics': false,
  'hint': 'You can upload a .pdf, .gif, .jpg, .bmp, or .txt file.',
  'multiple': false,
  'vaChange': event =>
    alert(`File change event received: ${event?.detail?.files[0]?.name}`),
  'uswds': true,
  'headerSize': null,
  'children': null
};

const Template = ({
  label,
  name,
  accept,
  error,
  required,
  hint,
  'enable-analytics': enableAnalytics,
  vaChange,
  uswds,
  headerSize,
  children
}) => {
  return (
    <VaFileInput
      label={label}
      name={name}
      accept={accept}
      required={required}
      error={error}
      hint={hint}
      enable-analytics={enableAnalytics}
      onVaChange={vaChange}
      uswds={uswds}
      headerSize={headerSize}
      children={children}
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

// Temporarily not supporting this option
// export const AcceptsMultipleFiles = Template.bind(null);
// AcceptsMultipleFiles.args = {
//   ...defaultArgs,
//   label: 'Input accepts multiple files',
//   hint: 'Select one or more files',
//   multiple: true,
// };

const multipleTemplate = (() =>  <va-multiple-file-input />)
export const AcceptsMultipleFiles = multipleTemplate.bind(null);
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

export const HeaderLabel = Template.bind(null);
HeaderLabel.args = {
  ...defaultArgs,
  label: 'Label Header',
  headerSize: 3,
  required: true
}

const additionalInfoSlotContent = (
  <div>
    <va-select className="hydrated" uswds label='What kind of file is this?' required>
      <option key="1" value="1">Public Document</option>
      <option key="2" value="2">Private Document</option>
    </va-select>
  </div>);

export const AdditionalInfo = Template.bind(null);
AdditionalInfo.args = {
  ...defaultArgs,
  label: 'Label Header',
  children: additionalInfoSlotContent
}

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
