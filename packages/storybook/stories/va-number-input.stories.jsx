import React, { useEffect, useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const numberInputDocs = getWebComponentDocs('va-number-input');

export default {
  title: 'Deprecated/Number input V1',
  id: 'components/va-number-input',
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
  'currency': false,
  'message-aria-describedby': 'Optional description text for screen readers',
  uswds: false,
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
    currency,
    'message-aria-describedby': messageAriaDescribedby,
    uswds,
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
      currency={currency}
      message-aria-describedby={messageAriaDescribedby}
      uswds={uswds}
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
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
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
        name={name}
        label='My input - 2xs'
        value={value}
        uswds={uswds}
      />

      <va-number-input
        width="xs"
        name={name}
        label='My input - xs'
        value={value}
        uswds={uswds}
      />  
  
      <va-number-input
        width="sm"
        name={name}
        label='My input - sm'
        value={value}
        uswds={uswds}
      />

      <va-number-input
        width="md"
        name={name}
        label='My input - md'
        value={value}
        uswds={uswds}
      />

      <va-number-input
        width="lg"
        name={name}
        label='My input - lg'
        value={value}
        uswds={uswds}
      />

      <va-number-input
        width="xl"
        name={name}
        label='My input - xl'
        value={value}
        uswds={uswds}
      />

      <va-number-input
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

export const WithCurrency = Template.bind(null);
WithCurrency.args = {
  ...defaultArgs,
  currency: true
}

export const Widths = WidthsTemplate.bind(null);
Widths.args = {
  ...defaultArgs,
};
