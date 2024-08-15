/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  applyFocus,
} from './wc-helpers';

import { VaTextInput } from '@department-of-veterans-affairs/web-components/react-bindings';


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
  'step': undefined,
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
  'currency': undefined,
  'input-prefix': undefined,
  'input-icon-prefix': undefined,
  'input-suffix': undefined,
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
  step,
  type,
  success,
  pattern,
  hint,
  'message-aria-describedby': messageAriaDescribedby,
  charcount,
  max,
  min,
  currency,
  'input-prefix': inputPrefix,
  'input-icon-prefix': inputIconPrefix,
  'input-suffix': inputSuffix,
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
      step={step}
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
      input-prefix={inputPrefix}
      input-icon-prefix={inputIconPrefix}
      input-suffix={inputSuffix}
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
      <va-button onClick={e => setLang('es')} text="Español" />
      <va-button onClick={e => setLang('en')} text="English" />
      <va-button onClick={e => setLang('tl')} text="Tagalog" />

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

const WidthsTemplate = ({ name, value }) => {
  return (
    <>
      <va-text-input
        width="2xs"
        name={name}
        label="My input - 2xs"
        value={value}
      />

      <va-text-input
        width="xs"
        name={name}
        label="My input - xs"
        value={value}
      />

      <va-text-input
        width="sm"
        name={name}
        label="My input - sm"
        value={value}
      />

      <va-text-input
        width="md"
        name={name}
        label="My input - md"
        value={value}
      />

      <va-text-input
        width="lg"
        name={name}
        label="My input - lg"
        value={value}
      />

      <va-text-input
        width="xl"
        name={name}
        label="My input - xl"
        value={value}
      />

      <va-text-input
        width="2xl"
        name={name}
        label="My input - 2xl"
        value={value}
      />
    </>
  );
};

const FormsPatternMultipleTemplate = ({ name, value, uswds }) => {
  const handleClick = () => {
    const header = document
      .getElementById('form-pattern-multiple-input')
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-text-input
        required
        error="This is an error message"
        id="form-pattern-multiple-input"
        name={name}
        label="First Name"
        value={value}
        use-forms-pattern="multiple"
        form-heading-level={1}
        form-heading="Name and email address"
        form-description="This is the additional form-description prop"
      />

      <va-text-input name={name} label="Last Name" value={value} />

      <va-text-input name={name} label="Email address" value={value} />
      <hr />
      <va-button
        text="click to focus header"
        onClick={handleClick}
        uswds={false}
      ></va-button>
    </>
  );
};

const FormsPatternSingleTemplate = ({ name, value, error }) => {
  const id = Math.floor(Math.random() * 10) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
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
        uswds={false}
      ></va-button>
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
  hint: 'The valid range is 0 to 4',
};

export const Autocomplete = ({ name, label, autocomplete }) => {
  function handleSubmit() { };
  function handleKeyPress() { }
  return (
    <>
      <form onSubmit={handleSubmit} >
        <VaTextInput label={label} onKeyPress={handleKeyPress} name={name} autocomplete={autocomplete} />
      </form>
      <div className='vads-u-margin-top--2'>
        Note: on Safari (Mac or iOS), when using "Shift + Command + A" to autofill a field,
        no <code>input</code>&nbsp;event is fired, which means that any handler passed to <code>onInput</code> will not fire. This can result in
        errors on form submission, because from the component's perspective the autofilled field is empty. A suggested
        workaround is to synchronize field state with component state on submit by passing handlers
        to <code>VaTextInput</code>&nbsp;such as:

        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            function onSubmit(e) &#x7b;<br/>
            &nbsp;&nbsp;e.preventDefault()<br/>
            &nbsp;&nbsp;// check if the "value" passed to VaTextInput is <br/>
            &nbsp;&nbsp;// the same as e.target.value, <br />
            &nbsp;&nbsp;// then proceed with submission <br />
            &#x7d;<br/><br/>

            function handleKeyPress(e) &#x7b;<br/>
              &nbsp;&nbsp;if (e.key === 'Enter') &#x7b;<br/>
              &nbsp;&nbsp;// the user wants to submit the form<br/>
              &nbsp;&nbsp;// synchronize element and component state before<br/>
              &nbsp;&nbsp;// continuing with submission<br/>
              &nbsp;&#x7d;<br/>
            &#x7d;<br />
        </code>
      </pre>
      </div>
    </>
  )
}

Autocomplete.args = {
  ...defaultArgs,
  name: 'email',
  autocomplete: 'email',
  label: 'This va-text-input is configured for email autocompletion'
}

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
WithInlineHintText.args = { ...defaultArgs, label: 'My input (with hint)' };

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
  currency: true,
};

export const WithIcon = Template.bind(null);
WithIcon.args = {
  ...defaultArgs,
  'input-icon-prefix': 'credit_card',
};

export const WithPrefix = Template.bind(null);
WithPrefix.args = {
  ...defaultArgs,
  'input-prefix': 'Pre',
};

export const WithSuffix = Template.bind(null);
WithSuffix.args = {
  ...defaultArgs,
  'input-suffix': 'lbs.',
};

export const WithIconAndSuffix = Template.bind(null);
WithIconAndSuffix.args = {
  ...defaultArgs,
  'label': 'How often is the payment?',
  'required': true,
  'input-icon-prefix': 'attach_money',
  'input-suffix': 'per year',
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
