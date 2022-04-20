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
      onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
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
  const [dateVal, setDateVal] = useState(value);
  const [currentYear, currentMonth, currentDay] = (dateVal || '').split('-');

  if (currentYear < minYear || currentYear > maxYear) {
    error = `Please enter a year between ${minYear} and ${maxYear}`;
  }
  const today = new Date();
  // new Date as YYYY-MM-DD is giving the day prior to the day select
  // new Date as YYYY MM DD is giving the correct day selected
  const dateInput = new Date(dateVal.split('-').join(' '));
  if (dateInput <= today) {
    error = 'Date must be in the future';
  }
  return (
    <>
      <VaDate
        label={label}
        name={name}
        required={required}
        error={error}
        value={dateVal}
        min-year={minYear}
        max-year={maxYear}
        onDateBlur={e => console.log(e, 'DATE BLUR')}
        onDateChange={e => setDateVal(e.target.value)}
      />
      <div>
        This example has some custom validation logic built out to detect
        changes made to the select and input fields. If the criteria below is
        not met an error message will show:
        <ul>
          <li>Cannot have blank values</li>
          <li>The Year falls outside of the range of 1900-2122</li>
          <li>The date provided is not in the future</li>
          <pre></pre>
        </ul>
        These are examples of how Custom Validation could be used with this
        component.
        <h5>Sample Variables</h5>
        <pre>const [dateVal, setDateVal] = useState(value);</pre>
        <pre>
          const [currentYear, currentMonth, currentDay] = (dateVal ||
          '').split('-');
        </pre>
        <pre>const today = new Date();</pre>
        <pre>const dateInput = new Date(dateVal.split('-').join(' '));</pre>
        <h5>Sample Custom Validation Conditional Statements</h5>
        <strong>Year Check</strong>
        <pre>
          if (currentYear &lt; minYear || currentYear &gt; maxYear) &#123;
        </pre>
        <pre>
          error = `Please enter a year between $&#123;minYear&#125; and
          $&#123;maxYear&#125;`;
        </pre>
        <pre>&#125;</pre>
        <strong>Date in Future Check</strong>
        <pre>if (dateInput &lt;= today)&#123;</pre>
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
