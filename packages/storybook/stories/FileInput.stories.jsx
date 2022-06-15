import React from 'react';
import FileInput from '../../react-components/src/components/FileInput/FileInput';

export default {
  title: 'Components/File Input/React Component/File Input',
  id: 'Components/FileInput',
  component: FileInput,
};

const Template = args => (
  <div style={{ paddingLeft: '1em' }}>
    <FileInput {...args} />
  </div>
);

const defaultArgs = {
  buttonText: 'Upload some files',
  onChange: () => {
    alert('uploaded file');
  },
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  errorMessage: 'Error message',
};
