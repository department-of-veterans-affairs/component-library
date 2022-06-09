import React, { useState } from 'react';
import { VaDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaDate.displayName = 'VaDate';

const dateDocs = getWebComponentDocs('va-date');

export default {
  title: 'Components/va-date',
  parameters: {
    componentSubtitle: `Date web component`,
    docs: {
      page: () => <StoryDocs data={dateDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Date of birth',
  name: 'test',
  required: false,
  error: undefined,
  value: undefined,
  monthYear: undefined,
};

const Template = ({ label, name, required, error, monthYear, value }) => {
  return (
    <VaDate
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
      monthYear={monthYear}
      onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
    />
  );
};

const CustomValidationTemplate = ({ label, name, required, error, value }) => {
  const [dateVal, setDateVal] = useState(value);
  const [errorVal, setErrorVal] = useState(error);
  const today = new Date();
  // new Date as YYYY-MM-DD is giving the day prior to the day select
  // new Date as YYYY MM DD is giving the correct day selected
  const dateInput = new Date(dateVal.split('-').join(' '));
  function handleDateBlur() {
    if (dateInput <= today) {
      setErrorVal('Date must be in the future');
    } else {
      setErrorVal('');
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
      <div>
        This example has some custom validation logic to detect if the date
        provided is in the future. The validation will occur when the component
        is blurred ie: focus is removed from the component. This will cause the
        error prop to be dynamically set if the parameters are not met.
      </div>
      <div className="vads-u-margin-top--2">
        <a
          href="https://github.com/department-of-veterans-affairs/component-library/tree/master/packages/storybook/stories"
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

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const WithHintText = WithHintTextTemplate.bind(null);
WithHintText.args = {
  ...defaultArgs,
};

export const WithHintTextError = WithHintTextTemplate.bind(null);
WithHintTextError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const MonthYear = Template.bind({});
MonthYear.args = { ...defaultArgs, monthYear: true };

export const CustomValidation = CustomValidationTemplate.bind(null);
export const CustomValidation = CustomValidationTemplate.bind({});
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};
