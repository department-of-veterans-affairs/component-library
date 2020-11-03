import React from 'react';
import ErrorableFileInput from './ErrorableFileInput';

export default {
  title: 'Library/ErrorableFileInput',
  component: ErrorableFileInput,
};

const Template = (args) => <ErrorableFileInput {...args} />;

const defaultArgs = {
  buttonText: 'Upload some files',
  onChange: () => {
    alert('uploaded file');
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  errorMessage: 'Error message',
};
