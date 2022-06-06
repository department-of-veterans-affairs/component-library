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
  'label': 'Date of birth',
  'name': 'test',
  'required': false,
  'error': undefined,
  'value': undefined,
  'custom-validation-boolean': false,
  'custom-validation-message': '',
};

const Template = ({
  label,
  name,
  required,
  error,
  value,
  'custom-validation-boolean': customValidationBoolean,
  'custom-validation-message': customValidationMessage,
}) => {
  return (
    <VaDateTextInput
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
      custom-validation-boolean={customValidationBoolean}
      custom-validation-message={customValidationMessage}
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
  'custom-validation-boolean': customValidationBoolean,
  'custom-validation-message': customValidationMessage,
}) => {
  const [dateVal, setDateVal] = useState(value);
  const today = new Date();
  // new Date as YYYY-MM-DD is giving the day prior to the day select
  // new Date as YYYY MM DD is giving the correct day selected
  const dateInput = new Date(dateVal.split('-').join(' '));
  if (dateInput <= today) {
    customValidationBoolean = true;
    customValidationMessage = 'Date must be in the future';
  } else {
    customValidationBoolean = false;
  }
  return (
    <>
      <VaDateTextInput
        label={label}
        name={name}
        required={required}
        error={error}
        value={dateVal}
        custom-validation-boolean={customValidationBoolean}
        custom-validation-message={customValidationMessage}
        onDateBlur={e => console.log(e, 'DATE BLUR')}
        onDateChange={e => setDateVal(e.target.value)}
      />
      <hr />
      <div>
        This example has some custom validation logic built out to detect
        changes made to the input fields that fire when the component is blurred
        ie: focus is removed from the component. If the criteria below is not
        met an error message will show:
        <ul>
          <li>Cannot have blank values</li>
          <li>Month and Day are not valid</li>
          <li>The Year falls outside of the range of 1900-2200</li>
          <li>The date provided is not in the future</li>
        </ul>
        These are examples of how Custom Validation could be used with this
        component.
        <h5>Sample Variables</h5>
        <pre>const [dateVal, setDateVal] = useState(value);</pre>
        <pre>const today = new Date();</pre>
        <pre>const dateInput = new Date(dateVal.split('-').join(' '));</pre>
        <h5>Sample Custom Validation Conditional Statements</h5>
        <strong>Date in Future Check</strong>
        <pre>if (dateInput &lt;= today)&#123;</pre>
        <pre>customValidationBoolean = true;</pre>
        <pre>customValidationMessage = 'Date must be in the future';</pre>
        <pre>&#125;</pre>
        <pre>else &#123;</pre>
        <pre>customValidationBoolean = false;</pre>
        <pre>&#125;</pre>
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
      <va-additional-info trigger="Why is this required?">
        We need the Veteran’s Social Security number or tax identification
        number to process the application when it’s submitted online, but it’s
        not a requirement to apply for the program.
      </va-additional-info>
    </va-date-text-input>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateTextInputDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const WithHintText = WithHintTextTemplate.bind({});
WithHintText.args = {
  ...defaultArgs,
};

export const WithHintTextError = WithHintTextTemplate.bind({});
WithHintTextError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const CustomValidation = CustomValidationTemplate.bind({});
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};
