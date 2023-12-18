import React, { useEffect, useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs, applyFocus } from './wc-helpers';

const numberInputDocs = getWebComponentDocs('va-number-input');

export default {
  title: 'USWDS/Number input USWDS',
  id: 'uswds/va-number-input',
  parameters: {
    componentSubtitle: `va-number-input web component`,
    docs: {
      page: () => <StoryDocs data={numberInputDocs} />,
    },
  },
  argTypes: {
    inputmode: {
      control: {
        type: 'select',
        options: ['decimal', 'numeric'],
      },
    },
  },
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'My input',
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'value': 0,
  'inputmode': 'numeric',
  'min': undefined,
  'max': undefined,
  hint: null,
  uswds: true,
  'use-forms-pattern': false,
  'form-heading-level': null,
  'form-heading': null,
  'form-description': null,
};

const vaNumberInput = args => {
  const {   
    name,
    label,
    'enable-analytics': enableAnalytics,
    required,
    error,
    value,
    inputmode,
    min,
    max,
    hint,
    uswds,
    ...rest
  } = args;
  return (
    <va-number-input
      uswds={uswds}
      name={name}
      label={label}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      value={value}
      inputmode={inputmode}
      max={max}
      min={min}
      hint={hint}
      onInput={e => console.log('input event value:', e.target.value)}
      onBlur={e => console.log('blur event', e)}
    />
  )
}

const Template = args => vaNumberInput(args);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button uswds onClick={e => setLang('es')} text="Español"/>
      <va-button uswds onClick={e => setLang('en')} text="English"/>
      <va-button uswds onClick={e => setLang('tl')} text="Tagalog"/>
      <div style={{marginTop: '20px'}}>
        {vaNumberInput(args)}
      </div>
    </div>
)};

const WidthsTemplate = ({
  name,
  value,
  uswds,
}) => {
  return (
    <>
      <va-number-input
        width="2xs"
        uswds={uswds}
        name={name}
        label='My input - 2xs'
        value={value}
      />

      <va-number-input
        width="xs"
        uswds={uswds}
        name={name}
        label='My input - xs'
        value={value}
      />  
  
      <va-number-input
        width="sm"
        uswds={uswds}
        name={name}
        label='My input - sm'
        value={value}
      />

      <va-number-input
        width="md"
        uswds={uswds}
        name={name}
        label='My input - md'
        value={value}
      />

      <va-number-input
        width="lg"
        uswds={uswds}
        name={name}
        label='My input - lg'
        value={value}
      />

      <va-number-input
        width="xl"
        uswds={uswds}
        name={name}
        label='My input - xl'
        value={value}
      />

      <va-number-input
        width="2xl"
        uswds={uswds}
        name={name}
        label='My input - 2xl'
        value={value}
      />
    </>
  );
};

const FormsPatternTemplate = ({
  name,
  value,
  uswds,
}) => {
  const handleClick = () => {
    const header = document.getElementById('form-pattern-input')
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-number-input
        id="form-pattern-input"
        required
        uswds={uswds}
        name={name}
        label='Home phone number'
        value=""
        use-forms-pattern={true}
        form-heading-level={1}
        form-heading="Phone and email address"
        form-description="This is an additional form description"
      />

      <va-number-input
        required
        uswds={uswds}
        name={name}
        label='Mobile phone number'
        value=""
      />  

      <va-text-input
        uswds={uswds}
        name={name}
        label='Email address'
        value=""
      />
      <hr />
      <va-button 
        text="click to focus header" 
        onClick={handleClick}>
      </va-button>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(numberInputDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: 'This is example hint text' };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const ValidRange = Template.bind(null);
ValidRange.args = {
  ...defaultArgs,
  min: 0,
  max: 4,
  hint: "The valid range is 0 to 4",
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  error: 'There has been a problem',
  required: true,
};

export const Widths = WidthsTemplate.bind(null);
Widths.args = {
  ...defaultArgs,
};

export const FormsPattern = FormsPatternTemplate.bind(null);
FormsPattern.args = {
  ...defaultArgs,
};