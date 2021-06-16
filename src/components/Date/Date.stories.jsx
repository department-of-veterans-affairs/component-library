import React, { useState } from 'react';
import Date from './Date';

export default {
  title: 'Components/Date',
  component: Date,
};

const Template = args => {
  const [date, setDate] = useState(args.date);
  return (
    <Date {...args} date={date} onValueChange={newDate => setDate(newDate)} />
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind({});
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

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = {
  ...defaultArgs,
  ariaDescribedby: 'some-id',
};
