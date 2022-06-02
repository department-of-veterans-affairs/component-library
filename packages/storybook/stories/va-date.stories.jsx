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
  'label': 'Label should be specific',
  'name': 'test',
  'required': false,
  'error': undefined,
  'value': undefined,
  'custom-validation-boolean': false,
  'custom-validation-message': '',
  'aria-describedby': '',
};

const Template = ({
  label,
  name,
  required,
  error,
  value,
  'aria-describedby': ariaDescribedby,
  'custom-validation-boolean': customValidationBoolean,
  'custom-validation-message': customValidationMessage,
}) => {
  return (
    <VaDate
      label={label}
      name={name}
      required={required}
      error={error}
      value={value}
      custom-validation-boolean={customValidationBoolean}
      custom-validation-message={customValidationMessage}
      aria-describedby={ariaDescribedby}
      onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
    >
      I am hint text in a slot
    </VaDate>
  );
};

const CustomValidationTemplate = ({
  label,
  name,
  required,
  error,
  value,
  'aria-describedby': ariaDescribedby,
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
      <VaDate
        label={label}
        name={name}
        required={required}
        error={error}
        value={dateVal}
        custom-validation-boolean={customValidationBoolean}
        custom-validation-message={customValidationMessage}
        aria-describedby={ariaDescribedby}
        onDateBlur={e => console.log(e, 'DATE BLUR')}
        onDateChange={e => setDateVal(e.target.value)}
      />
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

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(dateDocs);

export const Error = Template.bind({});
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const CustomValidation = CustomValidationTemplate.bind({});
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};
