/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {VaFileInput} from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaFileInput.displayName = 'VaFileInput';

const fileInputDocs = getWebComponentDocs('va-file-input');

export default {
  title: 'Components/File input USWDS',
  id: 'uswds/va-file-input',
  parameters: {
    componentSubtitle: 'va-file-input web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={fileInputDocs} />,
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
  'vaChange': event =>
    alert(`File change event received: ${event?.detail?.files[0]?.name}`),
  'uswds': true,
  'header-size': null,
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
      header-size={headerSize}
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
  label: 'Header label',
  headerSize: 3,
  required: true
}

const additionalFormInputsContent = (
  <div>
    <va-select className="hydrated" uswds label='What kind of file is this?' required>
      <option key="1" value="1">Public Document</option>
      <option key="2" value="2">Private Document</option>
    </va-select>
  </div>);

export const AdditionalFormInputs = Template.bind(null);
AdditionalFormInputs.args = {
  ...defaultArgs,
  label: 'Header label',
  children: additionalFormInputsContent
}

const CustomValidationTemplate = ({ label, name, accept, required, error, hint }) => {
  const [errorVal, setErrorVal] = useState(error);

  function validateFileContents(event) {
    setErrorVal(null);
    if (event.detail.files && event.detail.files.length) {
      const file = event.detail.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const contents = reader.result;
        const hasX = contents.includes('X');

        if (hasX)
          setErrorVal('File contains an \'X\' character');
      };

      reader.readAsText(file);
    }
  }

  return (
    <>
      <VaFileInput
        uswds
        label={label}
        name={name}
        accept={accept}
        required={required}
        error={errorVal}
        hint={hint}
        onVaChange={validateFileContents}
      />
      <hr />
      <div>
        <p>The parent component captures the file from the onVaChange event, reads its contents, and validates it. The error prop is dynamically set if the validation fails.</p>
        <p>This example validates that the file does not contain the character 'X'. The validation runs when the file changes or is removed.</p>
      </div>
      <div className="vads-u-margin-top--2">
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
{`const [errorVal, setErrorVal] = useState(error);

function validateFileContents(event) {
  setErrorVal(null);
  if (event.detail.files && event.detail.files.length) {
    const file = event.detail.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const contents = reader.result;
      const hasX = contents.includes('X');

      if (hasX)
        setErrorVal('File contains an \\'X\\' character');
    };

    reader.readAsText(file);
  }
}

return (
  <VaFileInput
    ...
    error={errorVal}
    onVaChange={validateFileContents}
  />
)`}
          </code>
        </pre>
        <a
          href="https://github.com/department-of-veterans-affairs/component-library/tree/main/packages/storybook/stories"
          target="_blank"
        >
          View validation code in our repo
        </a>
      </div>
    </>
  );
};


export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  label: 'Upload a file which does not contain the character \'X\'',
  hint: 'Select a TXT file',
  accept: '.txt'
}

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = {
  ...defaultArgs,
  'enable-analytics': true
};