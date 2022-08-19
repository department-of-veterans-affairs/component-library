import React from 'react';
import FileInput from '../../react-components/src/components/FileInput/FileInput';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/File input',
  component: FileInput,
  id: 'components/fileinput',
  parameters: {
    componentSubtitle: 'File input React component',
    docs: {
      page: () => <StoryDocs componentName="File input" />,
    },
  },
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
