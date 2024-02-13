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
  'label': 'Text input label',
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
  'message-aria-describedby': 'Optional description text for screen readers',
  hint: null,
  uswds: false,
  charcount: false,
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
  'message-aria-describedby': messageAriaDescribedby,
  uswds,
  charcount,
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
      message-aria-describedby={messageAriaDescribedby}
      uswds={uswds}
      charcount={charcount}
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
  uswds,
}) => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
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
        uswds={uswds}
      />
    </>
  );
};


const WidthsTemplate = ({
  name,
  value,
  uswds
}) => {
  return (
    <>
      <va-text-input
        width="2xs"
        name={name}
        label='My input - 2xs'
        value={value}
        uswds={uswds}
      />

      <va-text-input
        width="xs"
        name={name}
        label='My input - xs'
        value={value}
        uswds={uswds}
      />  
  
      <va-text-input
        width="sm"
        name={name}
        label='My input - sm'
        value={value}
        uswds={uswds}
      />

      <va-text-input
        width="md"
        name={name}
        label='My input - md'
        value={value}
        uswds={uswds}
      />

      <va-text-input
        width="lg"
        name={name}
        label='My input - lg'
        value={value}
        uswds={uswds}
      />

      <va-text-input
        width="xl"
        name={name}
        label='My input - xl'
        value={value}
        uswds={uswds}
      />

      <va-text-input
        width="2xl"
        name={name}
        label='My input - 2xl'
        value={value}
        uswds={uswds}
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
  maxlength: '6',
};

export const MaxLength = Template.bind(null);
MaxLength.args = {
  ...defaultArgs,
  maxlength: '6',
  charcount: true
};

export const MinLength = Template.bind(null);
MinLength.args = {
  ...defaultArgs,
  minlength: '3',
  charcount: true
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

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: "This is example hint text" };

const WithInlineHintTextTemplate = ({ name, label, uswds }) => {
  return (
    <>
      <va-text-input name={name} label={label} uswds={uswds}/>
      <p>If your hint is very short it can be included in the label.</p>
    </>
  );
};

export const WithInlineHintText = WithInlineHintTextTemplate.bind(null);
WithInlineHintText.args = { ...defaultArgs, label: "My input (with hint)" };

const AdditionalInfoTemplate = ({ name, label, uswds }) => {
  return (
    <va-text-input name={name} label={label} uswds={uswds}>
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

export const WithAdditionalInfo = AdditionalInfoTemplate.bind(null);
WithAdditionalInfo.args = {
  ...defaultArgs,
  label: 'Veteran’s Social Security number',
};

export const Widths = WidthsTemplate.bind(null);
Widths.args = {
  ...defaultArgs,
};
