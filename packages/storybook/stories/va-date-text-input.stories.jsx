import React, { useState } from 'react';
import { VaDateTextInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaDateTextInput.displayName = 'VaDateTextInput';

const dateTextInputDocs = getWebComponentDocs('va-date-text-input');

export default {
  title: 'Components/va-date-text-input',
  parameters: {
    componentSubtitle: `Date web component`,
    docs: {
      page: () => <StoryDocs data={dateTextInputDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Date of birth',
  name: 'test',
  required: false,
  error: undefined,
  value: undefined,
};

const Template = ({ label, name, required, error, value }) => {
  return (
    <VaDateTextInput
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
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
      <VaDateTextInput
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
        This example has some custom validation logic built out to detect
        changes made to the input fields that fire when the component is blurred
        ie: focus is removed from the component. We can cause the error prop to
        dynamically be set if certain parameters are not met. If the criteria
        below is not met an error message will show:
        <ul>
          <li>Cannot have blank values</li>
          <li>Month and Day are not valid</li>
          <li>The Year falls outside of the range of 1900-2200</li>
          <li>The date provided is not in the future</li>
        </ul>
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
    <va-date-text-input
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
    >
      <div className="vads-u-margin-bottom--1">This is example hint text</div>
    </va-date-text-input>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateTextInputDocs);

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

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};
