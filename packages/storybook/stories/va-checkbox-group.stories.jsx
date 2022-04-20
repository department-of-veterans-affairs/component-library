import React from 'react';
import { generateEventsDescription } from './events';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/va-checkbox-group',
  subcomponents: componentStructure(checkbox),
  parameters: {
    componentSubtitle: 'Checkbox Group web component',
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/form-controls#checkboxes">View guidance for the Checkbox Group component in the Design System</a>` +
          '\n' +
          generateEventsDescription(checkBoxGroupDocs),
      },
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

export const Error = Template.bind({});
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

export const SingleCheckbox = SingleCheckboxTemplate.bind({});
SingleCheckbox.args = {
  ...defaultArgs,
};
