/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { VaFileInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaFileInput.displayName = 'VaFileInput';

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
  'button-text': 'Upload file',
  'accept': 'image/*',
  'required': false,
  'multiple': false,
  'error': "",
  'enable-analytics': false,
  'vaChange': (event) => window.alert(`File change event received: ${event?.detail?.files[0]?.name}`)
};

const Template = ({
  label,
  name,
  'button-text': buttonText,
  accept,
  error,
  required,
  multiple,
  'enable-analytics': enableAnalytics,
  vaChange,
}) => {
  return (
    <VaFileInput
      label={label}
      name={name}
      button-text={buttonText}
      accept={accept}
      required={required}
      multiple={multiple}
      error={error}
      enable-analytics={enableAnalytics}
      onVaChange={vaChange}
    />
  );
};

const I18nTemplate = ({
  label,
  name,
  'button-text': buttonText,
  accept,
  error,
  required,
  multiple,
  'enable-analytics': enableAnalytics,
  vaChange
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
        <VaFileInput
          label={label}
          name={name}
          button-text={buttonText}
          accept={accept}
          required={required}
          multiple={multiple}
          error={error}
          enable-analytics={enableAnalytics}
          onVaChange={vaChange}   
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