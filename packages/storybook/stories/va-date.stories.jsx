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
};

const defaultArgs = {
  'label': 'Test Label',
  'name': 'test',
  'required': false,
  'error': undefined,
  'value': undefined,
  'min-year': undefined,
  'max-year': undefined,
};

const Template = ({
  label,
  name,
  required,
  error,
  value,
  'min-year': minYear,
  'max-year': maxYear,
}) => {
  return (
    <VaDate
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
      min-year={minYear}
      max-year={maxYear}
      onDateBlurEvent={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChangeEvent={e => console.log(e, 'DATE CHANGE FIRED')}
    />
  );
};

const CustomValidationTemplate = ({
  label,
  name,
  required,
  error,
  value,
  'min-year': minYear,
  'max-year': maxYear,
}) => {
  const [defaultYear, defaultMonth, defaultDay] = (value || '').split('-');
  const [monthVal, setMonthVal] = useState(defaultMonth);
  const [dayVal, setDayVal] = useState(defaultDay);
  const [yearVal, setYearVal] = useState(defaultYear);
  const setMonthDayYear = target => {
    if (target.classList.contains('select-month')) {
      setMonthVal(target.value);
    }
    if (target.classList.contains('select-day')) {
      setDayVal(target.value);
    }
    if (target.tagName === 'INPUT') {
      setYearVal(target.value);
    }
  };
  const isInTheFuture = date => {
    const today = new Date();
    return date > today;
  };

  const daysForSelectedMonth = monthVal ? days[parseInt(monthVal, 10)] : [];
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
        value={value}
        min-year={minYear}
        max-year={maxYear}
        onDateBlurEvent={e => console.log(e, 'DATE BLUR EVENT')}
        onDateChangeEvent={e => setMonthDayYear(e.detail.path[0])}
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
        <h5>Sample Variables</h5>
        <pre>const [defaultYear, defaultMonth, defaultDay] = (value || '').split('-');</pre>
        <pre>const [monthVal, setMonthVal] = useState(defaultMonth);</pre>
        <pre>const [dayVal, setDayVal] = useState(defaultDay);</pre>
        <pre>const [yearVal, setYearVal] = useState(defaultYear);</pre>
        <pre>const daysForSelectedMonth = monthVal ? days[parseInt(monthVal, 10)] : [];</pre>
        <h5>Sample Functions</h5>
        <pre>const setMonthDayYear = target =&gt; &#123; </pre>
        <pre>if (target.classList.contains('select-month')) &#123; </pre>
        <pre>setMonthVal(target.value);</pre>
        <pre>&#125;</pre>
        <pre>if (target.classList.contains('select-day')) &#123; </pre>
        <pre>setDayVal(target.value);</pre>
        <pre>&#125;</pre>
        <pre>if (target.tagName === 'INPUT') &#123; </pre>
        <pre>setYearVal(target.value);</pre>
        <pre>&#125;</pre>
        <pre>&#125;</pre>
        <pre>const isInTheFuture = (date) =&gt; &#123; </pre>
        <pre>const today = new Date();</pre>
        <pre>return date &gt; today;</pre>
        <pre>&#125;</pre>
        <h5>Sample Conditional Statements</h5>
        <strong>Day Check</strong>
        <pre>
          if (dayVal === '' || dayVal &gt; daysForSelectedMonth.length) &#123;
        </pre>
        <pre>error = 'Please select a day';</pre>
        <pre>&#125;</pre>
        <strong>Month Check</strong>
        <pre>if (monthVal === '') &#123;</pre>
        <pre>error = 'Please select a month';</pre>
        <pre>&#125;</pre>
        <strong>Year Check</strong>
        <pre>if (yearVal &lt; minYear || yearVal &gt; maxYear) &#123;</pre>
        <pre>
          error = `Please enter a year between $&#123;minYear&#125; and
          $&#123;maxYear&#125;`;
        </pre>
        <pre>&#125;</pre>
        <strong>Blank Date Check</strong>
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
        <strong>Date in Future Check</strong>
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

export const CustomValidation = CustomValidationTemplate.bind({});
CustomValidation.args = {
  ...defaultArgs,
  'min-year': '1900',
  'max-year': '2122',
  'required': true,
  'value': '2022-04-19',
};
