/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const checkboxDocs = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/va-checkbox',
  parameters: {
    componentSubtitle: `Checkbox web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/form-controls#checkboxes">View guidance for the Checkbox component in the Design System</a>` +
          '\n' +
          generateEventsDescription(checkboxDocs),
      },
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
  />
);

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(checkboxDocs);

export const Checked = Template.bind({});
Checked.args = { ...defaultArgs, checked: true };

export const WithDescriptionString = Template.bind({});
WithDescriptionString.args = {
  ...defaultArgs,
  description: 'Adding some descriptive text above the checkbox.',
};

export const WithDescriptionJSX = props => (
  <va-checkbox {...props}>
    <p slot="description">
      I'm a paragraph tag with <code>slot="description"</code>
    </p>
    <p slot="description">
      I'm another paragraph tag with <code>slot="description"</code>
    </p>
  </va-checkbox>
);
WithDescriptionJSX.args = { ...defaultArgs };

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  description:
    'Notice how the red line to the left also covers this description.',
  error: 'There has been a problem',
};

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const WithAnalytics = Template.bind({});
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
