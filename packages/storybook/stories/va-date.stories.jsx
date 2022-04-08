import React, { useState } from 'react';
import { VaDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

VaDate.displayName = 'VaDate';

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
  argTypes: {
    month: {
      control: {
        type: 'select',
        options: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
        ],
      },
    },
    day: {
      control: {
        type: 'select',
        options: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31',
        ],
      },
    },
  },
};

const defaultArgs = {
  'label': 'Test Label',
  'name': 'test',
  'required': false,
  'error': undefined,
  'month': undefined,
  'day': undefined,
  'year': undefined,
  'min-year': '1900',
  'max-year': '2000',
  'aria-describedby': undefined,
};

const Template = ({
  label,
  name,
  required,
  error,
  month,
  day,
  year,
  'aria-describedby': ariaDescribedby,
  'min-year': minYear,
  'max-year': maxYear,
}) => {
  const [yearVal, setYearVal] = useState(year);
  if (yearVal < minYear || yearVal > maxYear) {
    error = `Please enter a year between ${minYear} and ${maxYear}`;
  }
  return (
    <VaDate
      label={label}
      name={name}
      required={required}
      error={error}
      month={month}
      day={day}
      year={year}
      aria-describedby={ariaDescribedby}
      min-year={minYear}
      max-year={maxYear}
      onMonthBlurEvent={e => console.log(e, 'Month BLUR FIRED')}
      onDayBlurEvent={e => console.log(e, 'Day BLUR FIRED')}
      onYearBlurEvent={e => console.log(e, 'Year BLUR FIRED')}
      onMonthChangeEvent={e => console.log(e, 'Month Change FIRED')}
      onDayChangeEvent={e => console.log(e, 'Day Change FIRED')}
      onYearChangeEvent={e => setYearVal(e.detail.path[0].value)}
    >
      Header text slot
    </VaDate>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const AriaDescribedby = Template.bind({});
AriaDescribedby.args = {
  ...defaultArgs,
  'aria-describedby': 'Aria Describe Test',
};
