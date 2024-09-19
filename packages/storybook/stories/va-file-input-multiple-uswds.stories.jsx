/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { VaFileInputMultiple } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaFileInputMultiple.displayName = 'VaFileInputMultiple';

const fileInputMultipleDocs = getWebComponentDocs('va-file-input-multiple');

export default {
  title: 'Components/File input multiple USWDS',
  id: 'uswds/va-file-input-multiple',
  parameters: {
    componentSubtitle: 'va-file-input-multiple web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={fileInputMultipleDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Select a file to upload',
  'name': 'my-file-input',
  'accept': null,
  'required': false,
  'errors': [],
  'enable-analytics': false,
  'hint': 'You can upload a .pdf, .gif, .jpg, .bmp, or .txt file.',
  'vaMultipleChange': null,
  'header-size': null,
  'children': null
};

const Template = ({
  label,
  name,
  accept,
  errors,
  required,
  hint,
  'enable-analytics': enableAnalytics,
  vaMultipleChange,
  headerSize,
  additional
}) => {
  return (
    <VaFileInputMultiple
      label={label}
      name={name}
      accept={accept}
      required={required}
      errors={errors}
      hint={hint}
      enable-analytics={enableAnalytics}
      onVaMultipleChange={vaMultipleChange}
      header-size={headerSize}
      children={additional}
    />
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(fileInputMultipleDocs);

export const Accept = Template.bind(null);
Accept.args = {
  ...defaultArgs,
  label: 'Select PDF files',
  hint: 'All files in this list must be PDFs',
  accept: '.pdf'
};

export const HeaderSize = Template.bind(null);
HeaderSize.args = {
  ...defaultArgs,
  label: 'Custom sized header',
  hint: 'Numbers from 1-6 correspond to an H1-H6 tag',
  headerSize: 1
};

const additionalFormInputsContent = (
  <div>
    <va-select label='What kind of file is this?' required>
      <option key="1" value="1">Public Document</option>
      <option key="2" value="2">Private Document</option>
    </va-select>
  </div>);

const AdditionalFormInputsContentTemplate = ({
  label,
  name,
  accept,
  errors,
  required,
  hint,
  'enable-analytics': enableAnalytics,
  vaMultipleChange,
  headerSize,
  additional
}) => {
  return (
    <>
      <VaFileInputMultiple
        label={label}
        name={name}
        accept={accept}
        required={required}
        errors={errors}
        hint={hint}
        enable-analytics={enableAnalytics}
        onVaMultipleChange={vaMultipleChange}
        header-size={headerSize}>
        {additional}
      </VaFileInputMultiple>
      <hr/>
      <div>
        <p>You can collect additional information about an uploaded file by passing inputs to the slot of this component. The slot content will render after a file is uploaded.</p>
        <p>This example showcases how to include custom content, such as dropdowns, within the file input component.</p>
      </div>
      <div className="vads-u-margin-top--2">
          <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
            <code>
  {`const additionalFormInputsContent = (
  <div>
    <va-select label='What kind of file is this?' required>
      <option key="1" value="1">Public Document</option>
      <option key="2" value="2">Private Document</option>
    </va-select>
  </div>
);
  
<VaFileInputMultiple ... >
  {additionalFormInputsContent}
</VaFileInputMultiple>`}
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

export const AdditionalFormInputs = AdditionalFormInputsContentTemplate.bind(null);
AdditionalFormInputs.args = {
  ...defaultArgs,
  label: 'Label Header',
  additional: additionalFormInputsContent
}

const ErrorsTemplate = ({label, name, hint}) => {
  const [errorsList, setErrorsList] = useState([]);

  function setErrorForEachFile(event) {
    const fileEntries = event.detail.files;
    const errors = fileEntries.map((file, index) => {
      if (!file) {
        return '';
      }
      return 'Error for index ' + index;
    });
    setErrorsList(errors);
  }

  return (
    <>
      <VaFileInputMultiple
        label={label}
        name={name}
        hint={hint}
        errors={errorsList}
        onVaMultipleChange={setErrorForEachFile}
      />
      <hr />
      <div>
        <p>Parent components are responsible for managing error states through a dedicated error array. Each index in this array corresponds to a file input, with the value at each index representing the error state for that specific file. This setup allows for the dynamic display of errors based on real-time validation of each file as it is processed.</p>
      </div>
      <div className="vads-u-margin-top--2">
          <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
            <code>
  {`const [errorsList, setErrorsList] = useState([]);
  
  function setErrorForEachFile(event) {
    const fileEntries = event.detail.files;
    const errors = fileEntries.map((file, index) => {
      if (!file) {
        return '';
      }
      return 'Error for index ' + index;
    });
    setErrorsList(errors);
  }

  return (
    <VaFileInputMultiple
      ...
      errors={errorsList}
      onVaMultipleChange={setErrorForEachFile}
    />`}
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
  )
};

export const Errors = ErrorsTemplate.bind(null);
Errors.args = {
  ...defaultArgs,
  label: 'Label Header',
}

const CustomValidationTemplate = ({ label, name, accept, hint }) => {
  const [errorsList, setErrorsList] = useState([]);

  function validateFileContents(event) {
    let errors = [];
    const fileEntries = event.detail.files;

    fileEntries.forEach(fileEntry => {
      if (fileEntry) {
        let error = '';

        if (fileEntry.size > 2 * 1024 * 1024) { // 2MB = 2 * 1024 * 1024 bytes
          error = "File size cannot be greater than 2MB";
        }

        errors.push(error);
      } else {
        errors.push(''); // Add an empty error if no fileEntry
      }
    });

    setErrorsList(errors);
  }

  return (
    <>
      <VaFileInputMultiple
        label={label}
        name={name}
        hint={hint}
        errors={errorsList}
        accept={accept}
        onVaMultipleChange={validateFileContents}
      />
      <hr />
      <div>
        <p>The parent component can capture the files from the onVaMultipleChange event, validate the files, and dynamically set errors. Each file must have a corresponding entry in the errors array prop, even if the entry is an empty string indicating no errors.</p>
        <p>This example demonstrates custom validation logic to show an error if the file size exceeds 2MB. Validation occurs when a file is added or removed. </p>
      </div>
      <div className="vads-u-margin-top--2">
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
        <code>
{`const [errorsList, setErrorsList] = useState([]);

function validateFileContents(event) {
  let errors = [];
  const fileEntries = event.detail.files;

  fileEntries.forEach(fileEntry => {
    if (fileEntry) {
      let error = '';

      if (fileEntry.size > 2 * 1024 * 1024) { // 2MB = 2 * 1024 * 1024 bytes
        error = "File size cannot be greater than 2MB";
      }

      errors.push(error);
    } else {
      errors.push(''); // Add an empty error if no fileEntry
    }
  });

  setErrorsList(errors);
  }

<VaFileInputMultiple
  ...
  errors={errorsList}
  onVaMultipleChange={validateFileContents}
/>`}
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
  label: 'Upload files which are smaller than 2 MB',
  hint: 'Select any file type',
}