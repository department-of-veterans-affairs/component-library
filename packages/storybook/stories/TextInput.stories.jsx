import React, { useEffect, useState } from 'react';
import TextInput from '../../react-components/src/components/TextInput/TextInput';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Form/Text input/React Component/Text input',
  id: 'Components/TextInput',
  component: TextInput,
  parameters: {
    componentSubtitle: 'Text input React component',
    docs: {
      page: () => <StoryDocs componentName="TextInput" />,
    },
  },
};

const Template = args => {
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  return <TextInput {...args} field={field} onValueChange={onValueChange} />;
};

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');
  const [field, setField] = useState(args.field);
  const onValueChange = newField => {
    setField(newField);
  };

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <TextInput {...args} field={field} onValueChange={onValueChange} />
    </div>
  );
};

const defaultArgs = {
  label: 'First name',
  name: 'first_name',
  field: {
    value: '',
    dirty: false,
  },
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  required: true,
};

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = {
  ...defaultArgs,
  errorMessage: 'There was a problem',
};

export const Required = Template.bind(null);
Required.args = {
  ...defaultArgs,
  required: true,
};

export const WithPlaceholder = Template.bind(null);
WithPlaceholder.args = {
  ...defaultArgs,
  placeholder: 'This is a placeholder',
};

export const MaxChars = Template.bind(null);
MaxChars.args = {
  ...defaultArgs,
  charMax: 16,
  placeholder: 'No more than 16 characters',
};

export const Autocomplete = Template.bind(null);
Autocomplete.args = {
  ...defaultArgs,
  autocomplete: 'email',
  label: 'Email',
  name: 'email',
  placeholder: 'This should autocomplete using email addresses',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};
