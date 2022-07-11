import React, { useState } from 'react';
import { VaDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaDate.displayName = 'VaDate';

const dateDocs = getWebComponentDocs('va-date');

export default {
  title: 'Components/Date',
  parameters: {
    componentSubtitle: `va-date`,
    docs: {
      page: () => <StoryDocs data={dateDocs} />,
    },
  },
};

const defaultArgs = {
  'label':
    'What’s the date or anticipated date of your release from active duty?',
  'name': 'discharge-date',
  'required': false,
  'error': undefined,
  'value': undefined,
  'month-year-only': undefined,
};

const Template = ({
  label,
  name,
  required,
  error,
  'month-year-only': monthYearOnly,
  value,
}) => {
  return (
    <VaDate
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
      monthYearOnly={monthYearOnly}
      onDateBlur={e => {
        console.log(e, 'DATE BLUR FIRED');
        console.log(e.target.value);
      }}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
    />
  );
};

const CustomValidationTemplate = ({ label, name, required, error, value }) => {
  const [dateVal, setDateVal] = useState(value);
  const [errorVal, setErrorVal] = useState(error);
  const [invalidYear, setInvalidYear] = useState(null);
  const today = new Date();
  // new Date as YYYY-MM-DD is giving the day prior to the day select
  // new Date as YYYY MM DD is giving the correct day selected
  const dateInput = new Date(dateVal.split('-').join(' '));
  function handleDateBlur() {
    if (dateInput <= today) {
      setErrorVal('Date must be in the future');
      // This won't always be the right thing, but it's just a demo
      setInvalidYear(true);
    } else {
      setErrorVal('');
      setInvalidYear(false);
    }
  }

  return (
    <>
      <VaDate
        label={label}
        name={name}
        required={required}
        error={errorVal}
        invalidYear={invalidYear}
        value={dateVal}
        onDateBlur={() => handleDateBlur()}
        onDateChange={e => setDateVal(e.target.value)}
      />
      <hr />
      <div>
        This example has some custom validation logic to detect if the date
        provided is in the future. The validation will occur when the component
        is blurred ie: focus is removed from the component. This will cause the
        error prop to be dynamically set if the parameters are not met.
      </div>
      <div className="vads-u-margin-top--2">
        <a
          href="https://github.com/department-of-veterans-affairs/component-library/tree/main/packages/storybook/stories"
          target="_blank"
        >
          View validation code in our repo
        </a>
      </div>
    </>
  );
};

const WithHintTextTemplate = ({ name, label, error, required, value }) => {
  return (
    <va-date
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
    >
      <div className="vads-u-margin-bottom--1">This is example hint text</div>
    </va-date>
  );
};

const CustomRequiredMessageTemplate = ({
  label,
  name,
  required,
  error,
  value,
}) => {
  const [dateVal, setDateVal] = useState(value);
  const [errorVal, setErrorVal] = useState(error);
  const completeDate = date => /\d{4}-\d{1,2}-\d{1,2}/.test(date);
  function handleDateBlur() {
    if (!completeDate(dateVal)) {
      setErrorVal("Don't forget to fill me out");
    } else {
      setErrorVal(null);
    }
  }

  return (
    <>
      <VaDate
        label={label}
        name={name}
        required={required}
        error={errorVal}
        value={dateVal}
        onDateBlur={() => handleDateBlur()}
        onDateChange={e => setDateVal(e.target.value)}
      />
      <hr />
      <p>We are doing our own required check in the dateBlur handler</p>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const WithHintText = WithHintTextTemplate.bind(null);
WithHintText.args = {
  ...defaultArgs,
};

export const CustomRequiredMessage = CustomRequiredMessageTemplate.bind(null);
CustomRequiredMessage.args = {
  ...defaultArgs,
  required: true,
};

export const WithHintTextError = WithHintTextTemplate.bind(null);
WithHintTextError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const MonthYear = Template.bind({});
MonthYear.args = { ...defaultArgs, 'month-year-only': true };

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};
