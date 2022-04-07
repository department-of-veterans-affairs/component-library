import React from 'react';
import { VaDate } from '@department-of-veterans-affairs/web-components/react-bindings';
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
  'min-year': undefined,
  'max-year': undefined,
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
      onDateBlurEvent={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChangeEvent={e => console.log(e, 'DATE CHANGE FIRED')}
    >
      Header text slot
    </VaDate>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);
