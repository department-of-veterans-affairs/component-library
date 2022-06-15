import React, { useEffect, useState } from 'react';
import { Date } from '@department-of-veterans-affairs/component-library';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Form/Date input/React Component/Date',
  id: 'Components/Date',
  component: Date,
  parameters: {
    componentSubtitle: 'Date React component',
    docs: {
      page: () => <StoryDocs componentName="Date" />,
    },
  },
};

const Template = args => {
  const [date, setDate] = useState(args.date);
  const [lang, setLang] = useState('en');
  const onValueChange = newField => {
    setField(newField);
  };

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);
  return (
    <>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <Date {...args} date={date} onValueChange={newDate => setDate(newDate)} />
    </>
  );
};

const defaultArgs = {
  required: true,
  label: 'Please tell us a date',
  name: 'Date',
  requiredMessage: 'Please provide a response',
  date: {
    day: {
      value: '1',
      dirty: false,
    },
    month: {
      value: '4',
      dirty: false,
    },
    year: {
      value: '1976',
      dirty: false,
    },
  },
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  date: {
    day: {
      value: '1',
      dirty: true,
    },
    month: {
      value: '4',
      dirty: true,
    },
    year: {
      value: '0000',
      dirty: true,
    },
  },
};

export const AriaDescribedby = Template.bind(null);
AriaDescribedby.args = {
  ...defaultArgs,
  ariaDescribedby: 'some-id',
};
