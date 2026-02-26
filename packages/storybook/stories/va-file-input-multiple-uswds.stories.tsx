import { useEffect, useState } from 'react';
import { VaFileInputMultiple } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
// @ts-ignore ignores "module not found" error
import testImage from './images/search-bar.png';

VaFileInputMultiple.displayName = 'VaFileInputMultiple';

const fileInputMultipleDocs = getWebComponentDocs('va-file-input-multiple');
export default {
  title: 'Components/File input multiple USWDS',
  id: 'uswds/va-file-input-multiple',
  parameters: {
    componentSubtitle: 'va-file-input-multiple web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={fileInputMultipleDocs} />
      ),
    },
    storyType: 'form',
  },
};

const defaultArgs = {
  'label': 'Select a file to upload',
  'name': 'my-file-input',
  'accept': null,
  'required': false,
  'errors': [],
  'encrypted': [],
  'enable-analytics': false,
  'hint': 'You can upload a .pdf, .gif, .jpg, .bmp, or .txt file.',
  'vaMultipleChange': null,
  'header-size': null,
  'children': null,
  'value': null,
  'read-only': false,
  'slotFieldIndexes': null,
};

const Template = ({
  label,
  name,
  accept,
  errors,
  encrypted,
  required,
  hint,
  enableAnalytics,
  vaMultipleChange,
  headerSize,
  value,
  readOnly,
  children,
  slotFieldIndexes,
}) => {
  return (
    <VaFileInputMultiple
      label={label}
      name={name}
      accept={accept}
      required={required}
      errors={errors}
      encrypted={encrypted}
      hint={hint}
      enable-analytics={enableAnalytics}
      onVaMultipleChange={vaMultipleChange}
      header-size={headerSize}
      value={value}
      read-only={readOnly}
      children={children}
      slot-field-indexes={slotFieldIndexes}
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
  accept: '.pdf',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
Accept.parameters = {
  chromatic: { disableSnapshot: true },
};

export const HeaderSize = Template.bind(null);
HeaderSize.args = {
  ...defaultArgs,
  label: 'Custom sized header',
  hint: 'Numbers from 1-6 correspond to an H1-H6 tag',
  headerSize: 1,
};

const additionalFormInputsContent = (
  <div>
    <va-select label="What kind of file is this?" name="fileType" required>
      <option key="1" value="1">
        Public Document
      </option>
      <option key="2" value="2">
        Private Document
      </option>
    </va-select>
  </div>
);

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
  slotFieldIndexes,
  children,
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
        slot-field-indexes={slotFieldIndexes}
        header-size={headerSize}
      >
        {children}
      </VaFileInputMultiple>
      <hr />
      <div>
        <p>
          You can collect additional information about an uploaded file by
          passing inputs to the slot of this component. The slot content will
          render after a file is uploaded.
        </p>
        <p>
          This example showcases how to include custom content, such as
          dropdowns, within the file input component.
        </p>
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

export const AdditionalFormInputs =
  AdditionalFormInputsContentTemplate.bind(null);
AdditionalFormInputs.args = {
  ...defaultArgs,
  label: 'Additional Form Inputs',
  children: additionalFormInputsContent,
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AdditionalFormInputs.parameters = {
  chromatic: { disableSnapshot: true },
};

const AdditionalFormInputsOnSpecificFieldsContentTemplate = ({
  label,
  name,
  accept,
  errors,
  required,
  hint,
  'enable-analytics': enableAnalytics,
  vaMultipleChange,
  headerSize,
  slotFieldIndexes,
  children,
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
        slotFieldIndexes={slotFieldIndexes}
        header-size={headerSize}
      >
        {children}
      </VaFileInputMultiple>
      <hr />
      <div>
        <p>
          This example showcases how to only render additional content for
          specific file input fields.
        </p>
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

<VaFileInputMultiple slot-field-indexes="[1,3]" ... >
  {additionalFormInputsContent}
</VaFileInputMultiple>`}
          </code>
        </pre>
      </div>
    </>
  );
};

export const AdditionalFormInputsOnSpecificFields =
  AdditionalFormInputsOnSpecificFieldsContentTemplate.bind(null);
AdditionalFormInputsOnSpecificFields.args = {
  ...defaultArgs,
  label: 'Additional Form Inputs On Specific Inputs',
  children: additionalFormInputsContent,
  slotFieldIndexes: '[1,3]',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AdditionalFormInputsOnSpecificFields.parameters = {
  chromatic: { disableSnapshot: true },
};

const ErrorsTemplate = ({ label, name, hint }) => {
  const [errorsList, setErrorsList] = useState([]);

  function setErrorForEachFile(event) {
    const fileEntries = event.detail.state;
    const errors = fileEntries.map((file, index) => {
      if (!file.file) {
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
        <p>
          Parent components are responsible for managing error states through a
          dedicated error array. Each index in this array corresponds to a file
          input, with the value at each index representing the error state for
          that specific file. This setup allows for the dynamic display of
          errors based on real-time validation of each file as it is processed.
        </p>
      </div>
      <div className="vads-u-margin-top--2">
        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            {`const [errorsList, setErrorsList] = useState([]);

  function setErrorForEachFile(event) {
    const fileEntries = event.detail.state;
    const errors = fileEntries.map((file, index) => {
      if (!file.file) {
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
  );
};

export const Errors = ErrorsTemplate.bind(null);
Errors.args = {
  ...defaultArgs,
  label: 'Label Header',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
Errors.parameters = {
  chromatic: { disableSnapshot: true },
};

const CustomValidationTemplate = ({ label, name, accept, hint }) => {
  const [errorsList, setErrorsList] = useState([]);

  function validateFileContents(event) {
    let errors = [];
    const fileEntries = event.detail.state;

    fileEntries.forEach(fileEntry => {
      const file = fileEntry.file;
      if (file) {
        let error = '';

        if (file.size > 2 * 1024 * 1024) {
          // 2MB = 2 * 1024 * 1024 bytes
          error = 'File size cannot be greater than 2MB';
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
        <p>
          The parent component can capture the files from the onVaMultipleChange
          event, validate the files, and dynamically set errors. Each file must
          have a corresponding entry in the errors array prop, even if the entry
          is an empty string indicating no errors.
        </p>
        <p>
          This example demonstrates custom validation logic to show an error if
          the file size exceeds 2MB. Validation occurs when a file is added or
          removed.{' '}
        </p>
      </div>
      <div className="vads-u-margin-top--2">
        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            {`const [errorsList, setErrorsList] = useState([]);

function validateFileContents(event) {
    let errors = [];
    const fileEntries = event.detail.state;

    fileEntries.forEach(fileEntry => {
      const file = fileEntry.file;
      if (file) {
        let error = '';

        if (file.size > 2 * 1024 * 1024) {
          // 2MB = 2 * 1024 * 1024 bytes
          error = 'File size cannot be greater than 2MB';
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
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
CustomValidation.parameters = {
  chromatic: { disableSnapshot: true },
};

const EncryptedTemplate = ({ label, name }) => {
  const [trackedFiles, setTrackedFiles] = useState([]);
  const [encryptedList, setEncryptedList] = useState([]);
  const [passwordSubmissionSuccessList, setPasswordSubmissionSuccessList] = useState<boolean[]>([]);
  const [derivedPasswordErrorList, setDerivedPasswordErrorList] = useState<string[]>([]);

  /**
   * Callback passed to onVaMultipleChange to track the file objects for each
   * file input, and update the encryptedList based on the file types of the
   * tracked files. The encryptedList is used to determine whether a password
   * field should be displayed for each file input.
   * @param event The custom event emitted by the va-file-input-multiple component.
   * @returns {void}
   */
  function handleChange(event: CustomEvent<{
    action: string;
    file?: File;
    index?: number }>
  ): void {
    const { detail } = event;

    const trackedFilesToSet = [...trackedFiles];

    // Add new file to trackedFiles if action is FILE_ADDED
    if (detail.action === 'FILE_ADDED') {
      trackedFilesToSet.push(detail.file);
    } else if (detail.action === 'FILE_UPDATED' && detail.file) {
      // If an existing file is updated successfully, replace the corresponding
      // error object in trackedFiles with the file
      const indexToUpdate = trackedFilesToSet.findIndex(
        file => file.name === detail.file.name,
      );
      if (indexToUpdate !== -1) {
        trackedFilesToSet[indexToUpdate] = detail.file;
      }
    } else if (detail.action === 'FILE_REMOVED' && detail.file) {
      // Remove file from trackedFiles if action is FILE_REMOVED when a valid
      // file is removed
      const indexToRemove = trackedFilesToSet.findIndex(
        file => file.name === detail.file.name,
      );
      if (indexToRemove !== -1) {
        trackedFilesToSet.splice(indexToRemove, 1);
      }
    } else if (detail.action === 'FILE_REMOVED' && !detail.file) {
      // If an error file was deleted, remove the corresponding file from
      // trackedFiles
      const indexToRemove = trackedFilesToSet.findIndex(
        file => file.index === detail.index,
      );
      if (indexToRemove !== -1) {
        trackedFilesToSet.splice(indexToRemove, 1);
      }
    }

    const pdfFiles = trackedFilesToSet.map((file) => {
      return file.type === 'application/pdf'
    });

    setEncryptedList(pdfFiles);
    setTrackedFiles(trackedFilesToSet);
  }

  function handleError(event: CustomEvent<{
    index: number;
    error: string
  }>): void {
    const { index, error } = event.detail;

    let trackedFilesToSet = [...trackedFiles];

    // If index of error is greater than length of trackedFiles, we know this
    // error is for a new file input that has not been added to trackedFiles
    // yet, so we add it to the end of trackedFiles. Otherwise, we update the
    // existing file input at the index of the error with the error.
    if (index >= trackedFiles.length) {
      trackedFilesToSet.push({ index, error });
    } else {
      trackedFilesToSet[index] = {
        index,
        error,
      }
    }

    const pdfFiles = trackedFilesToSet.map((file) => {
      return file.type === 'application/pdf'
    });

    setEncryptedList(pdfFiles);
    setTrackedFiles(trackedFilesToSet);
  }

  const handlePasswordSubmissionSuccessClick = (index: number, isSuccess: boolean = false) => {
    const currentState = [...passwordSubmissionSuccessList];
    currentState[index] = isSuccess;

    if (!isSuccess) {
      const currentDerivedPasswordErrorList = [...derivedPasswordErrorList];
      currentDerivedPasswordErrorList[index] = 'Incorrect password. Try again or delete file.';
      setDerivedPasswordErrorList(currentDerivedPasswordErrorList);
    }

    setPasswordSubmissionSuccessList(currentState);
  }

  return (
    <>
      To learn how to check for an encrypted PDF <va-link
        text='see platform documentation'
        href='https://depo-platform-documentation.scrollhelp.site/developer-docs/checking-if-an-uploaded-pdf-is-encrypted'
      />.
      <VaFileInputMultiple
        label={label}
        name={name}
        hint={"This example shows a password field when a .pdf file is uploaded."}
        encrypted={encryptedList}
        passwordSubmissionSuccessList={passwordSubmissionSuccessList}
        passwordErrors={derivedPasswordErrorList}
        onVaMultipleChange={handleChange}
        onVaMultipleError={handleError}
      />
      <hr />

      <div
        className="vads-u-display--flex vads-u-flex-direction--column vads-u-margin--2 vads-u-border--1px vads-u-border-color--gray-light vads-u-padding--2"
        style={{ width: 'fit-content' }}
      >
        <p className="vads-u-margin-y--0">
          Simulate checking of submitted password for uploaded <strong>encrypted (PDF)</strong> files. Simulation is done
          by updating the <code>passwordSubmissionSuccessList</code> prop based on button clicks below.
        </p>
        <em>Each pair of buttons controls the password submission status for the corresponding encrypted file in the file list.</em>
        {
          encryptedList?.length ? (
            <ul>
              {encryptedList.map((isEncrypted, index) => {
                if (isEncrypted) {
                  return (
                    <li key={index}>
                      <div className="vads-u-display--flex vads-u-align-items--center vads-u-gap--2 vads-u-margin-bottom--1">
                        <p className="vads-u-margin-y--0 vads-u-margin-right--2">File {index + 1}</p>
                        <va-button
                            class="vads-u-margin-y--1"
                            text="Set success"
                            onClick={() => handlePasswordSubmissionSuccessClick(index, true)}
                          />
                        <va-button
                          text="Set error"
                          onClick={() => handlePasswordSubmissionSuccessClick(index, false)}
                        />
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          ) : null
        }
      </div>

      <div>
        <p>
          Parent components are responsible for managing if a password
          needs to be requested for the file through a dedicated encrypted
          array. Each index in this array corresponds to a file input,
          with the value at each index being true if a password should
          be requested for that specific file, or false if no password is
          needed. By default, no password field will be displayed. This
          setup allows for the dynamic display of a password field based
          on real-time validation of each file as it is processed. Passwords
          are passed through the <code>onVaMultipleChange</code> event.
        </p>
      </div>
      <div className="vads-u-margin-top--2">
        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            {`
              const [encryptedList, setEncryptedList] = useState([]);

              function setEncryptedForEachFile(event) {
                const fileEntries = event.detail.state;
                const pdfFiles = fileEntries.map((file, index) => {
                  return file.file.type === 'application/pdf'
                });
                setEncryptedList(pdfFiles);
              }

              return (
                <VaFileInputMultiple
                  ...
                  encrypted={encryptedList}
                  onVaMultipleChange={setEncryptedForEachFile}
                />
              );
            `}
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

export const AcceptsFilePassword = EncryptedTemplate.bind(null);
AcceptsFilePassword.args = {...defaultArgs};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AcceptsFilePassword.parameters = {
  chromatic: { disableSnapshot: true },
};

const FilesUploadedTemplate = args => {
  const [mockFiles, setMockFiles] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      const response = await fetch(testImage);
      const blob = await response.blob();
      const file1 = new File([blob], 'test1.jpg', { type: 'image/jpeg' });
      const file2 = new File([blob], 'test2.jpg', { type: 'image/jpeg' });

      if (isMounted) {
        // @ts-ignore
        setMockFiles([file1, file2]);
      }
    };
    loadImage();

    return () => {
      isMounted = false;
    };
  }, []);

  return <Template {...args} value={mockFiles} />;
};

export const FilesUploaded = FilesUploadedTemplate.bind(null);
FilesUploaded.args = { ...defaultArgs, vaMultipleChange: event => event };

export const ReadOnly = FilesUploadedTemplate.bind(null);
ReadOnly.args = {
  ...defaultArgs,
  vaMultipleChange: event => event,
  readOnly: true,
};

const readOnlyAdditionalInfoContent = (
  <div>
    <va-select
      label="What kind of file is this?"
      name="fileType"
      required
      inert
      value="1"
    >
      <option key="1" value="1">
        Public Document
      </option>
      <option key="2" value="2">
        Private Document
      </option>
    </va-select>
  </div>
);

export const ReadOnlyWithAdditionalInputs = FilesUploadedTemplate.bind(null);
ReadOnlyWithAdditionalInputs.args = {
  ...defaultArgs,
  vaMultipleChange: event => event,
  readOnly: true,
  children: readOnlyAdditionalInfoContent,
};
