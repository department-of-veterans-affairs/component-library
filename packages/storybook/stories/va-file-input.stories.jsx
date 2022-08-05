/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const fileInputDocs = getWebComponentDocs('va-file-input');

export default {
  title: 'Components/va-file-input',
  parameters: {
    componentSubtitle: `File input web component`,
    docs: {
      page: () => <StoryDocs data={fileInputDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'This is the file upload label',
  'name': 'my-file-input',
  'buttontext': 'Upload a document or file',
  'required': false,
  'multiple': true,
  'error': undefined,
};

const Template = ({
  label,
  name,
  buttontext,
  error,
  required,
  multiple
}) => {
  return (
    <va-file-input
      label={label}
      name={name}
      buttontext={buttontext}
      required={required}
      multiple={multiple}
      error={error}
    />
  );
};

const I18nTemplate = ({
    label,
    name,
    buttontext,
    error,
    required
}) => {
  const [lang, setLang] = useState('en');
  return (
    <>
      <button
        onClick={() => {
          const newLang = lang === 'en' ? 'es' : 'en';
          setLang(newLang);
          document.querySelector('main').setAttribute('lang', newLang);
        }}
      >
        Switch language
      </button>
      <va-file-input
        label={label}
        name={name}
        buttontext={buttontext}
        required={required}
      />
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  required: true,
};

// export const WithAnalytics = Template.bind(null);
// WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };