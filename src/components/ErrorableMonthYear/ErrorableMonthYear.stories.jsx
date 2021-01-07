import React, { useState } from 'react';
import ErrorableMonthYear from './ErrorableMonthYear';

export default {
  title: 'Library/ErrorableMonthYear',
  component: ErrorableMonthYear,
};

const Template = args => {
  const [date, setDate] = useState(args.date);
  const onChange = newDate => {
    setDate(newDate);
  };
  return (
    <div style={{ paddingLeft: '1em' }}>
      <ErrorableMonthYear {...args} date={date} onValueChange={onChange} />
    </div>
  );
};

const defaultArgs = {
  name: 'birthMonth',
  label: 'Birth Month',
  date: {
    month: { dirty: false },
    year: { dirty: false },
  },
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const Error = Template.bind({});
Error.args = Object.assign({}, defaultArgs, {
  date: {
    month: { value: '13', dirty: true },
    year: { dirty: true },
  },
  invalidMessage: "That date doesn't work...",
});

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };
