/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const checkboxDocs = getWebComponentDocs('va-checkbox');
const componentName = 'Checkbox';

export default {
  title: `Components/${componentName}`,
  parameters: {
    componentSubtitle: `va-checkbox`,
    docs: {
      page: () => <StoryDocs componentName={componentName} data={checkboxDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'This is a cleverly-labelled checkbox',
  'checked': false,
  'error': null,
  'required': false,
  'description': null,
  'enable-analytics': false,
};

const Template = ({
  checked,
  description,
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => (
  <va-checkbox
    checked={checked}
    description={description}
    enable-analytics={enableAnalytics}
    error={error}
    label={label}
    required={required}
    onBlur={e => console.log(e)}
  />
);

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(checkboxDocs);

export const Checked = Template.bind(null);
Checked.args = { ...defaultArgs, checked: true };

export const WithDescriptionString = Template.bind(null);
WithDescriptionString.args = {
  ...defaultArgs,
  description: 'Adding some descriptive text above the checkbox.',
};

export const WithDescriptionJSX = props => (
  <va-checkbox {...props} onBlur={e => console.log(e)}>
    <p slot="description">
      I'm a paragraph tag with <code>slot="description"</code>
    </p>
    <p slot="description">
      I'm another paragraph tag with <code>slot="description"</code>
    </p>
  </va-checkbox>
);
WithDescriptionJSX.args = { ...defaultArgs };

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  description:
    'Notice how the red line to the left also covers this description.',
  error: 'There has been a problem',
};

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
