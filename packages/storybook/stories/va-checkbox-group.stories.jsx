import React from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');
const componentName = 'Checkbox group';

export default {
  title: `Components/${componentName}`,
  subcomponents: componentStructure(checkbox),
  parameters: {
    componentSubtitle: 'va-checkbox-group',
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: () => <StoryDocs componentName={componentName} data={checkBoxGroupDocs} />,
    },
  },
};

const Template = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox label="Option one" name="example" value="1" />
      <va-checkbox label="Option two" name="example" value="2" />
    </va-checkbox-group>
  );
};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'This is a label',
  'required': false,
  'error': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

const SingleCheckboxTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox label="Option one" name="example" value="1" />
    </va-checkbox-group>
  );
};

export const SingleCheckbox = SingleCheckboxTemplate.bind(null);
SingleCheckbox.args = {
  ...defaultArgs,
};
