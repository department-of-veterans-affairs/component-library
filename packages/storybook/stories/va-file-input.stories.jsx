/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
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
  'accept': 'image/*',
  'required': false,
  'multiple': false,
  'error': null,
};

const Template = ({
  label,
  name,
  buttontext,
  accept,
  error,
  required,
  multiple
}) => {

  useEffect( () => {
      const fileInput = document.querySelector('va-file-input');
      fileInput.addEventListener('vaChange', (event) => {
        alert(`Successfully uploaded ${event.detail.files[0].name}`)
      });
  }, [])

  return (
    <va-file-input
      label={label}
      name={name}
      buttontext={buttontext}
      accept={accept}
      required={required}
      multiple={multiple}
      error={error}
    ><p>hello world!</p>
    </va-file-input>
  );
};

const I18nTemplate = ({
  label,
  name,
  buttontext,
  accept,
  error,
  required,
  multiple
}) => {
  const [lang, setLang] = useState('en');
  return (
    <>
      <button
        style={{display:'block'}}
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
          accept={accept}
          required={required}
          multiple={multiple}
          error={error}
      />
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = { ...defaultArgs, required: true, error: 'This is an error message' };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  required: true,
};

// export const WithAnalytics = Template.bind(null);
// WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };