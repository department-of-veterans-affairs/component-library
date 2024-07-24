import React, { useEffect, useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs, applyFocus } from './wc-helpers';

const numberInputDocs = getWebComponentDocs('va-number-input');

export default {
  title: 'Deprecated/Number input USWDS',
  id: 'uswds/va-number-input',
  parameters: {
    componentSubtitle: 'va-number-input web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={numberInputDocs} />,
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
  'use-forms-pattern': null,
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
    ...rest
  } = args;
  return (
    <va-number-input
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
      <va-button onClick={e => setLang('es')} text="Español"/>
      <va-button onClick={e => setLang('en')} text="English"/>
      <va-button onClick={e => setLang('tl')} text="Tagalog"/>
      <div style={{marginTop: '20px'}}>
        {vaNumberInput(args)}
      </div>
    </div>
)};

const WidthsTemplate = ({
  name,
  value,
}) => {
  return (
    <>
      <va-number-input
        width="2xs"
        name={name}
        label='My input - 2xs'
        value={value}
      />

      <va-number-input
        width="xs"
        name={name}
        label='My input - xs'
        value={value}
      />  
  
      <va-number-input
        width="sm"
        name={name}
        label='My input - sm'
        value={value}
      />

      <va-number-input
        width="md"
        name={name}
        label='My input - md'
        value={value}
      />

      <va-number-input
        width="lg"
        name={name}
        label='My input - lg'
        value={value}
      />

      <va-number-input
        width="xl"
        name={name}
        label='My input - xl'
        value={value}
      />

      <va-number-input
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
}) => {
  const handleClick = () => {
    const header = document.getElementById('form-pattern-multiple-input')
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-number-input
        required
        error="This is an error message"
        id="form-pattern-multiple-input"
        name={name}
        label='Social security number'
        hint="This is hint text"
        value=""
        use-forms-pattern='multiple'
        form-heading-level={1}
        form-heading="Identification information"
        form-description="This is the additional form-description prop"
      />

      <va-number-input
        name={name}
        label='VA file number'
        hint="This is hint text"
        value=""
      />  

      <va-number-input
        name={name}
        label='Service number'
        hint="This is hint text"
        value=""
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
      <va-number-input
        required
        id={`form-pattern-single-input-${id}`}
        name={name}
        label="Example number"
        hint="This is hint text"
        value=""
        error={error}
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="Identification information"
        form-description="This is the additional form-description prop"
      >
      <div slot="form-description">
        <p>HTML passed into the forms-pattern slot:</p>
        <ul>
          <li>Social security number</li>
          <li>VA file number</li>
          <li>Service number</li>
        </ul>
      </div>
      </va-number-input>

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