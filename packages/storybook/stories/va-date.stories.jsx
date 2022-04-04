import React from 'react';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const dateDocs = getWebComponentDocs('va-date');

export default {
  title: 'Components/va-date',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(dateDocs),
      },
    },
  },
};

const defaultArgs = {
  label: 'Test Label',
  name: 'test',
  required: false,
  error: undefined,
  month: '3',
  day: '5',
  year: '2000',
};

const Template = ({ label, name, required, error, month, day, year }) => {
  return (
    <>
      <va-date
        label={label}
        name={name}
        required={required}
        error={error}
        month={month}
        day={day}
        year={year}
      >
        Header text slot
      </va-date>
    </>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);
