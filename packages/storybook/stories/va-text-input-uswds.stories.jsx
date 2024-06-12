/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs, applyFocus } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Components/Text input USWDS',
  id: 'uswds/va-text-input',
  parameters: {
    componentSubtitle: 'va-text-input web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={textInputDocs} />,
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
  'hint': null,
  'message-aria-describedby': 'Optional description text for screen readers',
  'use-forms-pattern': null,
  'form-heading-level': null,
  'form-heading': null,
  'form-description': null,
  'charcount': false,
  'max': undefined,
  'min': undefined,
  'currency': undefined
};

const Template = ({
  name,
  label,
  autocomplete,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  inputmode,
  type,
  success,
  pattern,
  hint,
  'message-aria-describedby': messageAriaDescribedby,
  charcount,
  max,
  min,
  currency
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
      value={value}
      inputmode={inputmode}
      type={type}
      success={success}
      pattern={pattern}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
      message-aria-describedby={messageAriaDescribedby}
      charcount={charcount}
      min={min}
      max={max}
      currency={currency}
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
  value,
  inputmode,
  type,
  uswds,
  'message-aria-describedby': messageAriaDescribedby,
}) => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);
  return (
    <>
      <va-button onClick={e => setLang('es')} text="Español"/>
      <va-button onClick={e => setLang('en')} text="English"/>
      <va-button onClick={e => setLang('tl')} text="Tagalog"/>

      <va-text-input
        name={name}
        label={label}
        autocomplete={autocomplete}
        enable-analytics={enableAnalytics}
        required={required}
        error={error}
        maxlength={maxlength}
        value={value}
        inputmode={inputmode}
        type={type}
        message-aria-describedby={messageAriaDescribedby}
      />
    </>
  );
};

const WidthsTemplate = ({
  name,
  value,
}) => {
  return (
    <>
      <va-text-input
        width="2xs"
        name={name}
        label='My input - 2xs'
        value={value}
      />

      <va-text-input
        width="xs"
        name={name}
        label='My input - xs'
        value={value}
      />

      <va-text-input
        width="sm"
        name={name}
        label='My input - sm'
        value={value}
      />

      <va-text-input
        width="md"
        name={name}
        label='My input - md'
        value={value}
      />

      <va-text-input
        width="lg"
        name={name}
        label='My input - lg'
        value={value}
      />

      <va-text-input
        width="xl"
        name={name}
        label='My input - xl'
        value={value}
      />

      <va-text-input
        width="2xl"
        name={name}
        label='My input - 2xl'
        value={value}
      />
    </>
  );
};

const FormsPatternMultipleTemplate = ({
  name,
  value,
  uswds,
}) => {
  const handleClick = () => {
    const header = document.getElementById('form-pattern-multiple-input')
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-text-input
        required
        error="This is an error message"
        id="form-pattern-multiple-input"
        name={name}
        label='First Name'
        value={value}
        use-forms-pattern='multiple'
        form-heading-level={1}
        form-heading="Name and email address"
        form-description="This is the additional form-description prop"
      />

      <va-text-input
        name={name}
        label='Last Name'
        value={value}
      />

      <va-text-input
        name={name}
        label='Email address'
        value={value}
      />
      <hr />
      <va-button
        text="click to focus header"
        onClick={handleClick}
        uswds={false}>
      </va-button>
    </>
  );
};

const FormsPatternSingleTemplate = ({
  name,
  value,
  error,
}) => {
  const id = (Math.floor(Math.random() * 10) + 1);
  const handleClick = () => {
    const header = document.getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-text-input
        required
        id={`form-pattern-single-input-${id}`}
        name={name}
        label="Historical figure"
        hint="This is hint text"
        value={value}
        error={error}
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="Enter the name of a historical figure"
      >
      <div slot="form-description">
        <p>HTML passed into the form-description slot:</p>
        <ul>
          <li>Sojourner Truth</li>
          <li>Frederick Douglass</li>
          <li>Booker T. Washington</li>
          <li>George Washington Carver</li>
        </ul>
      </div>
      </va-text-input>

      <hr />

      <va-button
        text="click to focus header"
        onClick={handleClick}
        uswds={false}>
      </va-button>
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

export const Pattern = Template.bind(null);
Pattern.args = {
  ...defaultArgs,
  label: 'Must be 4 digits',
  pattern: '[0-9]{4}',
};

export const ValidRange = Template.bind(null);
ValidRange.args = {
  ...defaultArgs,
  inputmode: 'numeric',
  min: 0,
  max: 4,
  hint: "The valid range is 0 to 4",
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
WithHintText.args = { ...defaultArgs, hint: 'This is hint text' };

const WithInlineHintTextTemplate = ({ name, label }) => {
  return (
    <>
      <va-text-input name={name} label={label} />
      <p>If your hint is very short it can be included in the label.</p>
    </>
  );
};

export const WithInlineHintText = WithInlineHintTextTemplate.bind(null);
WithInlineHintText.args = { ...defaultArgs, label: "My input (with hint)" };

const WithAdditionalInfoTemplate = ({ name, label }) => {
  return (
    <va-text-input name={name} label={label}>
      <div>
        <va-additional-info trigger="Why is this required?">
          We need the Veteran’s Social Security number or tax identification
          number to process the application when it’s submitted online, but it’s
          not a requirement to apply for the program.
        </va-additional-info>
      </div>
    </va-text-input>
  );
};

export const WithAdditionalInfo = WithAdditionalInfoTemplate.bind(null);
WithAdditionalInfo.args = {
  ...defaultArgs,
  label: 'Veteran’s Social Security number',
};

export const WithCharacterCount = Template.bind(null);
WithCharacterCount.args = { ...defaultArgs, maxlength: '10', charcount: true };

export const WithCurrency = Template.bind(null);
WithCurrency.args = {
  ...defaultArgs,
  currency: true
};

export const Widths = WidthsTemplate.bind(null);
Widths.args = {
  ...defaultArgs,
};

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = {
  ...defaultArgs,
};

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  error: 'This is an error message',
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = {
  ...defaultArgs,
};
