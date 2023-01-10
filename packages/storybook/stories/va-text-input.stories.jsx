/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: `Components/Text input`,
  id: 'components/va-text-input',
  parameters: {
    componentSubtitle: `va-text-input web component`,
    docs: {
      page: () => <StoryDocs data={textInputDocs} />,
    },
  },
  argTypes: {
    inputmode: {
      control: {
        type: 'select',
        options: [
          'decimal',
          'email',
          'numeric',
          'search',
          'tel',
          'text',
          'url',
        ],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['email', 'number', 'search', 'tel', 'text', 'url'],
      },
    },
  },
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'My input',
  'autocomplete': undefined,
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'maxlength': undefined,
  'minlength': undefined,
  'value': undefined,
  'inputmode': undefined,
  'type': undefined,
  'success': false,
  'pattern': undefined,
  hint: null,
};

const Template = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  minlength,
  value,
  inputmode,
  type,
  success,
  pattern,
  hint,
}) => {
  return (
    <va-text-input
      name={name}
      label={label}
      autocomplete={autocomplete}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      hint={hint}
      maxlength={maxlength}
      minlength={minlength}
      value={value}
      inputmode={inputmode}
      type={type}
      success={success}
      pattern={pattern}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
    />
  );
};

const I18nTemplate = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  minlength,
  value,
  inputmode,
  type,
}) => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } } ));
  }, [lang]);
  return (
    <>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <va-text-input
        name={name}
        label={label}
        autocomplete={autocomplete}
        enable-analytics={enableAnalytics}
        required={required}
        error={error}
        maxlength={maxlength}
        minlength={minlength}
        value={value}
        inputmode={inputmode}
        type={type}
      />
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textInputDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Success = Template.bind(null);
Success.args = { ...defaultArgs, success: true };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  required: true,
  maxlength: '16',
};

export const MaxLength = Template.bind(null);
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
};

export const MinLength = Template.bind(null);
MinLength.args = {
  ...defaultArgs,
  minlength: '3',
};

export const Range = Template.bind(null);
Range.args = {
  ...defaultArgs,
  label: 'Acceptable range 3 - 6 characters',
  minlength: '3',
  maxlength: '6',
};

export const Pattern = Template.bind(null);
Pattern.args = {
  ...defaultArgs,
  label: 'Must be 4 digits',
  pattern: '[0-9]{4}',
};

export const Autocomplete = Template.bind(null);
Autocomplete.args = {
  ...defaultArgs,
  name: 'email',
  autocomplete: 'email',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

const AdditionalInfoTemplate = ({ name, label }) => {
  return (
    <va-text-input name={name} label={label}>
      <div className="vads-u-margin-bottom--1">
        <va-additional-info trigger="Why is this required?">
          We need the Veteran’s Social Security number or tax identification
          number to process the application when it’s submitted online, but it’s
          not a requirement to apply for the program.
        </va-additional-info>
      </div>
    </va-text-input>
  );
};

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: "This is example hint text" };

export const WithAdditionalInfo = AdditionalInfoTemplate.bind(null);
WithAdditionalInfo.args = {
  ...defaultArgs,
  label: 'Veteran’s Social Security number',
};
