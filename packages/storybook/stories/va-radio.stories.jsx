import React from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const radioDocs = getWebComponentDocs('va-radio');
const radioItem = getWebComponentDocs('va-radio-option');

export default {
  title: 'Components/va-radio',
  subcomponents: componentStructure(radioItem),
};

const Template = args => {
  return (
    <va-radio {...args}>
      <va-radio-option label="Option one" name="one" value="1" />
      <va-radio-option label="Option two" name="two" value="2" />
    </va-radio>
  );
};

const defaultArgs = {
  enableAnalytics: false,
  label: 'This is a label',
  required: false,
  error: null,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(radioDocs);

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};
