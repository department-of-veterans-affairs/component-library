/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const checkboxDocs = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/Checkbox',
  id: 'components/va-checkbox',
  parameters: {
    componentSubtitle: `va-checkbox web component`,
    docs: {
      page: () => <StoryDocs data={checkboxDocs} />,
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
  'hint': null,
};

const vaCheckbox = args => {
  const {   
    checked,
    description,
    'enable-analytics': enableAnalytics,
    error,
    label,
    required, 
    hint,
    ...rest
  } = args;
  return (
    <va-checkbox
      checked={checked}
      description={description}
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      hint={hint}
      required={required}
      onBlur={e => console.log(e)}
    />
  )
}

const Template = args => vaCheckbox(args);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <div style={{marginTop: '20px'}}>
        {vaCheckbox(args)}
      </div>
    </div>
)};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(checkboxDocs);

export const Checked = Template.bind(null);
Checked.args = { ...defaultArgs, checked: true };


export const WithHintText = Template.bind(null);
WithHintText.args = {
  ...defaultArgs,
  description: 'Adding some descriptive text above the checkbox.',
  hint: "This is example hint text",
};

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
  hint: "We're asking this because of XYZ",
};

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  description:
    'Notice how the red line to the left also covers this description.',
  error: 'There has been a problem',
  required: true,
};
