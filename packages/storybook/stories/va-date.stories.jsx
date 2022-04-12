import React, { useState } from 'react';
import { VaDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { generateEventsDescription } from './events';
import { getWebComponentDocs, propStructure } from './wc-helpers';

import { days } from '../../react-components/src/helpers/options-for-select.js';

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
      onMonthBlurEvent={e => console.log(e, 'Month BLUR FIRED')}
      onDayBlurEvent={e => console.log(e, 'Day BLUR FIRED')}
      onYearBlurEvent={e => console.log(e, 'Year BLUR FIRED')}
      onMonthChangeEvent={e => console.log(e, 'Month Change FIRED')}
      onDayChangeEvent={e => console.log(e, 'Day Change FIRED')}
      onYearChangeEvent={e => console.log(e, 'Year Change FIRED')}
    />
  );
};

const CustomValidationTemplate = ({
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
  const [monthVal, setMonthVal] = useState(month);
  const [dayVal, setDayVal] = useState(day);
  const [yearVal, setYearVal] = useState(year);
  const daysForSelectedMonth = monthVal ? days[monthVal] : [];
  function isInTheFuture(date) {
    const today = new Date();
    return date > today;
  }
  if (dayVal === '' || dayVal > daysForSelectedMonth.length) {
    error = 'Please select a day';
  }
  if (monthVal === '') {
    error = 'Please select a month';
  }
  if (yearVal < minYear || yearVal > maxYear) {
    error = `Please enter a year between ${minYear} and ${maxYear}`;
  }
  if (
    (required && (dayVal === '' || dayVal === undefined)) ||
    (required && (monthVal === '' || monthVal === undefined)) ||
    (required && yearVal === undefined)
  ) {
    error = 'Please enter completed date';
  }
  if (!isInTheFuture(new Date(`${yearVal}-${monthVal}-${dayVal}`))) {
    error = 'Date must be in the future';
  }
  return (
    <>
      <VaDate
        label={label}
        name={name}
        required={required}
        error={error}
        month={monthVal}
        day={dayVal}
        year={yearVal}
        aria-describedby={ariaDescribedby}
        min-year={minYear}
        max-year={maxYear}
        onMonthBlurEvent={e => console.log(e, 'Month BLUR FIRED')}
        onDayBlurEvent={e => console.log(e, 'Day BLUR FIRED')}
        onYearBlurEvent={e => console.log(e, 'Year BLUR FIRED')}
        onMonthChangeEvent={e => setMonthVal(e.detail.path[0].value)}
        onDayChangeEvent={e => setDayVal(e.detail.path[0].value)}
        onYearChangeEvent={e => setYearVal(e.detail.path[0].value)}
      />
      <div>
        This example has some custom validation logic built out to detect
        changes made to the select and input fields. If the criteria below is
        not met an error message will show:
        <ul>
          <li>Cannot have blank values</li>
          <li>The Month or Day does not have an empty value</li>
          <li>The Year falls outside of the range of 1900-2122</li>
          <li>The date provided is in the future</li>
          <pre></pre>
        </ul>
        These are examples of how Custom Validation could be used with this
        component.
        <h6>Sample Variables</h6>
        <pre>const [monthVal, setMonthVal] = useState(month);</pre>
        <pre>const [dayVal, setDayVal] = useState(day);</pre>
        <pre>const [yearVal, setYearVal] = useState(year);</pre>
        <pre>const daysForSelectedMonth = monthVal ? days[monthVal] : [];</pre>
        <h6>Sample Function</h6>
        <pre>function isInTheFuture(date) &#123; </pre>
        <pre>const today = new Date();</pre>
        <pre>return date &gt; today;</pre>
        <pre>&#125;</pre>
        <h6>Sample Conditional Statements</h6>
        <div>Day Check</div>
        <pre>
          if (dayVal === '' || dayVal &gt; daysForSelectedMonth.length) &#123;
        </pre>
        <pre>error = 'Please select a day';</pre>
        <pre>&#125;</pre>
        <div>Month Check</div>
        <pre>if (monthVal === '') &#123;</pre>
        <pre>error = 'Please select a month';</pre>
        <pre>&#125;</pre>
        <div>Year Check</div>
        <pre>if (yearVal &lt; minYear || yearVal &gt; maxYear) &#123;</pre>
        <pre>error = `Please enter a year between $&#123;minYear&#125; and $&#123;maxYear&#125;`;</pre>
        <pre>&#125;</pre>
        <div>Blank Date Check</div>
        <pre>if (</pre>
        <pre>
          (required &#38;&#38; (dayVal === '' || dayVal === undefined)) ||
        </pre>
        <pre>
          (required &#38;&#38; (monthVal === '' || monthVal === undefined)) ||
        </pre>
        <pre>(required &#38;&#38; yearVal === undefined)</pre>
        <pre>) &#123; </pre>
        <pre>error = 'Please enter completed date';</pre>
        <pre>&#125;</pre>
        <div>Date in Future Check</div>
        <pre>
          if (!isInTheFuture(new
          Date(`$&#123;yearVal&#125;-$&#123;monthVal&#125;-$&#123;dayVal&#125;`)))
          &#123;
        </pre>
        <pre>error = 'Date must be in the future';</pre>
        <pre>&#125;</pre>
      </div>
    </>
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

export const CustomValidation = CustomValidationTemplate.bind({});
CustomValidation.args = {
  ...defaultArgs,
  'min-year': '1900',
  'max-year': '2122',
  'required': true,
};
