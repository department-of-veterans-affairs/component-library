import React from 'react';
import FileInput from './FileInput';

export default {
  title: 'Components/FileInput',
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  errorMessage: 'Error message',
};
