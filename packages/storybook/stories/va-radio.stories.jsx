import React from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const radioDocs = getWebComponentDocs('va-radio');
const radioItem = getWebComponentDocs('va-radio-option');
const componentName = 'Radio button';

export default {
  title: `Components/${componentName}`,
  subcomponents: componentStructure(radioItem),
  parameters: {
    componentSubtitle: `va-radio`,
    docs: {
      page: () => <StoryDocs componentName={componentName} data={radioDocs} />,
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
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-radio-option label="Option one" name="example" value="1" />
      <va-radio-option label="Option two" name="example" value="2" />
    </va-radio>
  );
};

const IdUsageTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no1" label="No" name="no" value="1" />
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="yes"
          value="2"
        />
      </va-radio>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no2" label="No" name="no" value="1" />
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="yes"
          value="2"
        />
      </va-radio>
    </>
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
Default.argTypes = propStructure(radioDocs);

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const IdUsage = IdUsageTemplate.bind(null);
IdUsage.args = {
  ...defaultArgs,
  required: true,
};
