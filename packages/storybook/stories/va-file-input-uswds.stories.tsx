import { useEffect, useState } from 'react';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  useErrorToggle,
  errorToggleArgTypes,
} from './wc-helpers';
// @ts-ignore
import testImage from './images/search-bar.png';

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
    storyType: 'form',
  },
  argTypes: {
    ...propStructure(fileInputDocs),
    ...errorToggleArgTypes(['#error-demo-wrapper','#file-input-error-alert']),
    // hide the uploadMessage prop from the properties table in storybook
    uploadMessage: {
      table: {
        disable: true,
      },
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
  'vaChange': event => null,
  'vaPasswordSubmit': event => null,
  'vaFileInputError': event => null,
  'header-size': null,
  'children': null,
  'value': null,
  'read-only': false,
  'encrypted': false,
  'status-text': null,
  'uploadedFile': null,
  'maxFileSize': Infinity,
  'minFileSize': 0,
  'password-error': false,
  'showToggleFocusButton': false,
  'focusEl': null,
};

const Template = ({
  label,
  name,
  accept,
  error,
  required,
  hint,
  enableAnalytics,
  vaChange,
  vaPasswordSubmit,
  vaFileInputError,
  headerSize,
  readOnly,
  encrypted,
  statusText,
  value,
  children,
  uploadedFile,
  maxFileSize,
  minFileSize,
  passwordError,
  showToggleFocusButton,
  focusEl
}) => {

  const { errorMsg, handleClick } = useErrorToggle(error, focusEl);

  return (
    <>
      <VaFileInput
        label={label}
        name={name}
        accept={accept}
        required={required}
        error={errorMsg}
        hint={hint}
        enable-analytics={enableAnalytics}
        onVaChange={vaChange}
        onVaPasswordSubmit={vaPasswordSubmit}
        onVaFileInputError={vaFileInputError}
        header-size={headerSize}
        readOnly={readOnly}
        encrypted={encrypted}
        statusText={statusText}
        value={value}
        children={children}
        uploadedFile={uploadedFile}
        maxFileSize={maxFileSize}
        minFileSize={minFileSize}
        passwordError={passwordError}
        id={showToggleFocusButton ? 'error-demo-wrapper' : undefined}
      />
      {showToggleFocusButton && (
        <va-button
          text="Toggle error state"
          onClick={handleClick}
          class="vads-u-margin-top--2"
        ></va-button>
      )}
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(fileInputDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };


const AcceptsFilePasswordTemplate = ({
  label,
  name,
  hint,
  passwordError,
  vaPasswordSubmit,
}) => {

  const [isEncrypted, setIsEncrypted] = useState(false);
  const [passwordSubmissionSuccess, setPasswordSubmissionSuccess] = useState(null);
  const [derivedPasswordError, setDerivedPasswordError] = useState(passwordError);

  const handleChange = (event) => {
    const hasFile = event?.detail?.files?.length > 0;

    if (hasFile) {
      setIsEncrypted(true);
    }
    // Revert state to original values if there are no files present (file removed)
    if (!event?.detail?.files?.length) {
      setIsEncrypted(false);
      setPasswordSubmissionSuccess(null);
      setDerivedPasswordError(null);
      return;
    }
  }

  return (
    <>
      To learn how to check for an encrypted PDF <va-link
        text='see platform documentation'
        href='https://depo-platform-documentation.scrollhelp.site/developer-docs/checking-if-an-uploaded-pdf-is-encrypted'
      />.
      <VaFileInput
        label={label}
        name={name}
        hint={hint}
        onVaChange={handleChange}
        onVaPasswordSubmit={vaPasswordSubmit}
        encrypted={isEncrypted}
        passwordError={derivedPasswordError}
        passwordSubmissionSuccess={passwordSubmissionSuccess}
      />

      <hr />

      <div
        className="vads-u-display--flex vads-u-flex-direction--column vads-u-margin--2 vads-u-border--1px vads-u-border-color--gray-light vads-u-padding--2"
        style={{ width: 'fit-content' }}
      >
        <p className="vads-u-margin-y--0">Simulate checking of submitted password (changes <code>passwordSubmissionSuccess</code> prop).</p>
        <va-button
          class="vads-u-margin-y--1"
          text="Submission status - success"
          onClick={() => setPasswordSubmissionSuccess(true)}
        />
        <va-button
          text="Submission status - error"
          onClick={() => {
            setPasswordSubmissionSuccess(false);
            setDerivedPasswordError('Incorrect password. Try again or delete file.');
          }}
        />
      </div>
    </>
  );
};
export const AcceptsFilePassword = AcceptsFilePasswordTemplate.bind(null);
AcceptsFilePassword.args = {
  ...defaultArgs,
  vaPasswordSubmit: () => console.log('File input password submitted'),
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AcceptsFilePassword.parameters = {
  chromatic: { disableSnapshot: true },
};

const WithMinimumPasswordRequirementTemplate = ({
  label,
  name,
  accept,
  required,
  error,
  hint,
}) => {
  const [passwordError, setPasswordError] = useState<string | undefined>(undefined);

  const handleVaPasswordSubmit = (e: CustomEvent) => {
    let newPasswordError: string | undefined;

    const { password } = e.detail;

    if (!password || password.length < 4) {
      newPasswordError = 'Encrypted file requires a password.';
    } else {
      newPasswordError = null;
    }

    setPasswordError(newPasswordError);
  };

  return (
    <VaFileInput
      label={label}
      name={name}
      accept={accept}
      required={required}
      error={error}
      hint={hint}
      encrypted={true}
      onVaPasswordSubmit={handleVaPasswordSubmit}
      passwordError={passwordError}
    />
  );
};
export const WithMinimumPasswordRequirement = WithMinimumPasswordRequirementTemplate.bind(null);
WithMinimumPasswordRequirement.args = {
  ...defaultArgs,
  label: 'With minimum password length requirement',
  hint: 'Password must be at least 4 characters long',
};

export const AcceptsOnlySpecificFileTypes = Template.bind(null);
AcceptsOnlySpecificFileTypes.args = {
  ...defaultArgs,
  label: 'Input accepts only specific file types',
  hint: 'You can upload a .pdf or .txt file',
  accept: '.pdf,.txt',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AcceptsOnlySpecificFileTypes.parameters = {
  chromatic: { disableSnapshot: true },
};


export const AcceptsAnyKindOfImage = Template.bind(null);
AcceptsAnyKindOfImage.args = {
  ...defaultArgs,
  label: 'Input accepts any kind of image',
  hint: 'Select any type of image format',
  accept: 'image/*',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
AcceptsAnyKindOfImage.parameters = {
  chromatic: { disableSnapshot: true },
};


export const ErrorMessage = Template.bind(null);
ErrorMessage.args = {
  ...defaultArgs,
  label: 'Input has an error',
  hint: 'Select any valid file',
  error: 'Display a helpful error message',
};

export const WithMaxFileSize = Template.bind(null);
WithMaxFileSize.args = {
  ...defaultArgs,
  label: 'Input has a maximum file-size restriction',
  hint: 'An error will be thrown if the selected file is greater than 1 KB',
  maxFileSize: 1024,
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
WithMaxFileSize.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithMinFileSize = Template.bind(null);
WithMinFileSize.args = {
  ...defaultArgs,
  label: 'Input has a minimum file-size restriction',
  hint: 'An error will be thrown if the selected file is less than 1 MB',
  minFileSize: 1024*1024,
}
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
WithMinFileSize.parameters = {
  chromatic: { disableSnapshot: true },
};

export const HeaderLabel = Template.bind(null);
HeaderLabel.args = {
  ...defaultArgs,
  label: 'Header label',
  headerSize: 3,
  required: true,
};

const additionalFormInputsContent = (
  <div>
    <va-select
      className="hydrated"
      label="What kind of file is this?"
      name="fileType"
      required
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

export const AdditionalFormInputs = Template.bind(null);
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


const CustomValidationTemplate = ({
  label,
  name,
  accept,
  required,
  error,
  hint,
}) => {
  const [errorVal, setErrorVal] = useState(error);

  function validateFileContents(event) {
    setErrorVal(null);
    if (event.detail.files && event.detail.files.length) {
      const file = event.detail.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        const contents = reader.result.toString();
        const hasX = contents.includes('X');

        if (hasX) setErrorVal("File contains an 'X' character");
      };

      reader.readAsText(file);
    }
  }

  return (
    <>
      <VaFileInput
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
        <p>
          The parent component captures the file from the onVaChange event,
          reads its contents, and validates it. The error prop is dynamically
          set if the validation fails.
        </p>
        <p>
          This example validates that the file does not contain the character
          'X'. The validation runs when the file changes or is removed.
        </p>
      </div>
      <div className="vads-u-margin-top--2">
        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            {`
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
                )
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

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  label: "Upload a file which does not contain the character 'X'",
  hint: 'Select a .txt file',
  accept: '.txt',
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
CustomValidation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = {
  ...defaultArgs,
  'enable-analytics': true,
};
WithAnalytics.parameters = {
  chromatic: { disableSnapshot: true },
};

export const UploadedFile = Template.bind(null);
UploadedFile.args = {
  ...defaultArgs,
  uploadedFile: {
    name: 'test.jpg',
    size: 7000,
    type: 'JPG',
  },
};

const FileUploadedTemplate = args => {
  const [mockFile, setMockFile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      const response = await fetch(testImage);
      const blob = await response.blob();
      const file = new File([blob], 'test.jpg', { type: 'image/jpeg' });

      if (isMounted) {
        // @ts-ignore
        setMockFile(file);
      }
    };
    loadImage();

    return () => {
      isMounted = false;
    };
  }, []);

  return <Template {...args} value={mockFile} />;
};

export const UploadStatus = FileUploadedTemplate.bind(null);
UploadStatus.args = {
  ...defaultArgs,
  label: 'Select a file to upload (status text will show on file change)',
  vaChange: event => {
    event.target.setAttribute('status-text', 'Uploading...');
  },
};

export const FileUploaded = FileUploadedTemplate.bind(null);
FileUploaded.args = { ...defaultArgs, vaChange: event => event };
FileUploaded.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ReadOnly = FileUploadedTemplate.bind(null);
ReadOnly.args = { ...defaultArgs, vaChange: event => event, readOnly: true };

const readOnlyAdditionalInfoContent = (
  <div>
    <va-select
      className="hydrated"
      label="What kind of file is this?"
      name="fileType"
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

export const ReadOnlyWithAdditionalInputs = FileUploadedTemplate.bind(null);
ReadOnlyWithAdditionalInputs.args = {
  ...defaultArgs,
  vaChange: event => event,
  readOnly: true,
  children: readOnlyAdditionalInfoContent,
};

const PercentUploadedTemplate = args => {
  const [percent, setPercent] = useState(0);
  function handleUpload() {
    const intervalId = setInterval(() => {
      setPercent(_prev => {
        if (_prev >= 100) {
          clearInterval(intervalId);
          return 100;
        }
        return _prev + Math.random() * 4;
      });
    }, 100);
  }

  return (
    <VaFileInput
      {...args}
      percentUploaded={percent}
      onVaChange={handleUpload}
    />
  );
};

export const WithPercentUploaded = PercentUploadedTemplate.bind(null);
WithPercentUploaded.args = { ...defaultArgs };
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
WithPercentUploaded.parameters = {
  chromatic: { disableSnapshot: true },
};


const encryptedFileTemplate = ({
  label,
  name,
  hint,
}) => {
    const [isEncrypted, setIsEncrypted] = useState(false);
    const [successStatus, setSuccessStatus] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

  // Minimal handler: detect if file is encrypted
  const handleFileChange = (event) => {
    const hasFile = event?.detail?.files?.length > 0;

    // Reset password state when file changes
    // In real implementation: check if file is encrypted
    // For demo: assume all uploaded files are encrypted
    if (hasFile) {
      setIsEncrypted(true);
      setPasswordError(null);
      setSuccessStatus(null);
    } else {
      // File removed
      setIsEncrypted(false);
      setPasswordError(null);
      setSuccessStatus(null);
    }
  };

  // Simulate sending password to server for validation
  const handlePasswordSubmit = async (event) => {
    const { password } = event.detail;

    // In real implementation: call API to validate password
    // For demo: simulate async validation
    setSuccessStatus(null); // Reset to show loading state

    // Simulate API call
    setTimeout(() => {
      // Simulate validation result
      const isValid = password === 'test123';

      if (isValid) {
        setSuccessStatus(true);
        setPasswordError(null);
      } else {
        setSuccessStatus(false);
        setPasswordError('Incorrect password. Try again or delete file.');
      }
    }, 500);
  };

  return (
    <>
      <p>
        This story demonstrates a minimal integration of encrypted file handling.
      </p>
      <ol>
        <li>Detect if uploaded file is encrypted (set <code>encrypted</code> prop)</li>
        <li>Handle <code>vaPasswordSubmit</code> event to validate password</li>
        <li>Update <code>passwordError</code> and <code>passwordSubmissionSuccess</code> based on server response</li>
      </ol>

      <VaFileInput
        label={label}
        name={name}
        hint={hint}
        onVaChange={handleFileChange}
        onVaPasswordSubmit={handlePasswordSubmit}
        encrypted={isEncrypted}
        passwordError={passwordError}
        passwordSubmissionSuccess={successStatus}
      />

      <div className="vads-u-margin-top--2 vads-u-background-color--gray-lightest vads-u-padding--2">
        <p><strong>Demo instructions:</strong></p>
        <ul>
          <li>Upload any file (simulated as encrypted)</li>
          <li>Enter password: <code>test123</code> for success, anything else for error</li>
          <li>Component handles all internal state (button loading, focus management, etc.)</li>
        </ul>
      </div>
    </>
  );
};

export const TestEncryptedFile = encryptedFileTemplate.bind(null);
TestEncryptedFile.args = {
  ...defaultArgs,
  label: 'Minimal integration example',
  hint: 'Password is "test123"',
};
TestEncryptedFile.parameters = {
  chromatic: { disableSnapshot: true },
};
