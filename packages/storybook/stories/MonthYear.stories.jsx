import React, { useState } from 'react';
import { MonthYear } from '@department-of-veterans-affairs/component-library';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Month Year/React Component/Month Year',
  id: 'Components/MonthYear',
  component: MonthYear,
  parameters: {
    docs: {
      page: () => <StoryDocs componentName="Month year react" />,
    },
  },
};

const Template = args => {
  const [date, setDate] = useState(args.date);
  const onChange = newDate => {
    setDate(newDate);
  };
  return (
    <div style={{ paddingLeft: '1em' }}>
      <MonthYear {...args} date={date} onValueChange={onChange} />
    </div>
  );
};

const defaultArgs = {
  name: 'birthMonth',
  label: 'Birth Month',
  date: {
    month: { dirty: false },
    year: { dirty: false, value: '2000' },
  },
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const Error = Template.bind(null);
Error.args = Object.assign({}, defaultArgs, {
  date: {
    month: { value: '13', dirty: true },
    year: { dirty: true },
  },
  invalidMessage: "That date doesn't work...",
});

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };
