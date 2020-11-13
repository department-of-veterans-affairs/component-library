import React, { useState } from 'react';
import ErrorableDate from './ErrorableDate';

export default {
  title: 'Library/Form controls/ErrorableDate',
  component: ErrorableDate,
};

const Template = args => {
  const [date, setDate] = useState(args.date);
  return (
    <ErrorableDate
      {...args}
      date={date}
      onValueChange={newDate => setDate(newDate)}
    />
  );
};

const defaultArgs = {
  required: true,
  label: 'Please tell us a date',
  name: 'Errorable Date',
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
