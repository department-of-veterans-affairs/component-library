/* eslint-disable react/prop-types */
import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  'enable-analytics': false,
};

const handleChangeEvent = (event) => {
  alert(`Uploaded event received: ${event?.detail?.files[0]?.name}`)
};

const Template = ({
  label,
  name,
  buttontext,
  accept,
  error,
  required,
  multiple,
  'enable-analytics': enableAnalytics,
}) => {
  const ref = useRef(null);

  useEffect( () => {
    const element = ref.current;
    element.addEventListener('vaChange', handleChangeEvent);

    return () => {
      element.removeEventListener('vaChange', handleChangeEvent);
    };
  }, [])

  return (
    <va-file-input
      ref={ref}
      label={label}
      name={name}
      buttontext={buttontext}
      accept={accept}
      required={required}
      multiple={multiple}
      error={error}
      enable-analytics={enableAnalytics}
    />
  );
};

const I18nTemplate = ({
  label,
  name,
  buttontext,
  accept,
  error,
  required,
  multiple,
  'enable-analytics': enableAnalytics,
}) => {
  const [lang, setLang] = useState('en');
  const ref = useRef(null);

  useEffect( () => {
    const element = ref.current;
    element.addEventListener('vaChange', handleChangeEvent);

    return () => {
      element.removeEventListener('vaChange', handleChangeEvent);
    };
  }, [])

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
          ref={ref}
          label={label}
          name={name}
          buttontext={buttontext}
          accept={accept}
          required={required}
          multiple={multiple}
          error={error}
          enable-analytics={enableAnalytics}
      />
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

Default.argTypes = propStructure(fileInputDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = { ...defaultArgs, required: true, error: 'This is an error message' };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  required: true,
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };