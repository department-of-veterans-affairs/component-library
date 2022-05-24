import React, { useEffect, useState } from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const numberInputDocs = getWebComponentDocs('va-number-input');

export default {
  title: 'Components/va-number-input',
  parameters: {
    componentSubtitle: `Number Input web component`,
    docs: {
      description: {
        component:
          `<a className="vads-c-action-link--blue" href="https://design.va.gov/components/form/number-input">View guidance for the Number Input component in the Design System</a>` +
          '\n' +
          'This component uses the native onInput and onBlur event handlers.' +
          '\n' +
          '\n' +
          generateEventsDescription(numberInputDocs),
      },
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
};

const Template = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  value,
  inputmode,
  min,
  max,
}) => {
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
      onInput={e => console.log('input event value:', e.target.value)}
      onBlur={e => console.log('blur event', e)}
    />
  );
};

const I18nTemplate = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  value,
  inputmode,
  min,
  max,
}) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);
  return (
    <>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
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
        onInput={e => console.log('input event value:', e.target.value)}
        onBlur={e => console.log('blur event', e)}
      />
    </>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(numberInputDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const WithAnalytics = Template.bind({});
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const ValidRange = Template.bind({});
ValidRange.args = {
  ...defaultArgs,
  min: 0,
  max: 4,
};

export const Internationalization = I18nTemplate.bind({});
Internationalization.args = {
  ...defaultArgs,
  required: true,
};
