import React from 'react';
import ErrorableFileInput from './ErrorableFileInput';

export default {
  title: 'Components/ErrorableFileInput',
  component: ErrorableFileInput,
};

const Template = args => (
  <div style={{ paddingLeft: '1em' }}>
    <ErrorableFileInput {...args} />
  </div>
);

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
