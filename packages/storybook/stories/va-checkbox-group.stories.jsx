import React, { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/Checkbox group',
  id: 'components/va-checkbox-group',
  subcomponents: componentStructure(checkbox),
  parameters: {
    componentSubtitle: 'va-checkbox-group web component',
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: () => <StoryDocs data={checkBoxGroupDocs} />,
    },
  },
};

const vaCheckboxGroup = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    required,
    hint,
    ...rest
  } = args;
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
    >
      <va-checkbox label="Option one" name="example" value="1" />
      <va-checkbox label="Option two" name="example" value="2" />
    </va-checkbox-group>
  )
}

const Template = args => vaCheckboxGroup(args);

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
        {vaCheckboxGroup(args)}
      </div>
    </div>
)};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'This is a label',
  'required': false,
  'error': null,
  'hint': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

export const WithHintText = Template.bind(null);
WithHintText.args = {
  ...defaultArgs,
  hint: 'This is example hint text',
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

const SingleCheckboxTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox label="Option one" name="example" value="1" />
    </va-checkbox-group>
  );
};

export const SingleCheckbox = SingleCheckboxTemplate.bind(null);
SingleCheckbox.args = {
  ...defaultArgs,
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  error: 'There has been a problem',
  required: true,
};
