import React, { useEffect, useState } from 'react';

import { Select } from '../../react-components';

export default {
  title: 'Components/Select (deprecated)',
  component: Select,
};

const Template = args => {
  const [value, setValue] = useState(args.value);
  const onValueChange = newValue => {
    setValue(newValue);
  };

  return <Select {...args} value={value} onValueChange={onValueChange} />;
};

const defaultArgs = {
  label: 'Branch of Service',
  name: 'branch',
  value: {
    value: 'Marines',
    dirty: false,
  },
  options: ['Army', 'Navy', 'Air Force', 'Marines', 'Coast Guard'],
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const ErrorMessage = Template.bind({});
ErrorMessage.args = {
  ...defaultArgs,
  errorMessage: 'There was a problem',
};

export const Required = Template.bind({});
Required.args = {
  ...defaultArgs,
  required: true,
};

export const NoBlankOption = Template.bind({});
NoBlankOption.args = {
  ...defaultArgs,
  includeBlankOption: false,
};

export const AriaLiveRegion = Template.bind({});
AriaLiveRegion.args = {
  ...defaultArgs,
  ariaLiveRegionText: 'The following branch was selected: ',
};

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = {
  ...defaultArgs,
  errorMessage: 'This is also an error',
  ariaDescribedby: 'testing-id',
};

export const WithAnalytics = Template.bind({});
WithAnalytics.args = {
  ...defaultArgs,
  enableAnalytics: true,
};

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');
  const [value, setValue] = useState(args.value);
  const onValueChange = newValue => {
    setValue(newValue);
  };

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <Select {...args} value={value} onValueChange={onValueChange} />
    </div>
  );
};

export const Internationalization = I18nTemplate.bind({});
Internationalization.args = {
  ...defaultArgs,
  required: true,
};
