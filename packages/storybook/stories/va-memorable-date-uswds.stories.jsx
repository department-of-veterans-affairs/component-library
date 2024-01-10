import React, { useState, useEffect } from 'react';
import { VaMemorableDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs, applyFocus } from './wc-helpers';

VaMemorableDate.displayName = 'VaMemorableDate';

const memorableDateInputDocs = getWebComponentDocs('va-memorable-date');

export default {
  title: 'USWDS/Memorable date USWDS',
  id: 'uswds/va-memorable-date',
  parameters: {
    componentSubtitle: `va-memorable-date web component`,
    docs: {
      page: () => <StoryDocs data={memorableDateInputDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Date of birth',
  name: 'test',
  hint: undefined,
  required: false,
  error: undefined,
  value: undefined,
  uswds: true,
  monthSelect: true,
};

const Template = ({ label, name, hint, required, error, uswds, value, monthSelect }) => {
  return (
    <VaMemorableDate
      uswds={uswds}
      monthSelect={monthSelect}
      label={label}
      name={name}
      hint={hint}
      required={required}
      error={error}
      value={value}
      onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
    />
  );
};

const CustomValidationTemplate = ({ label, name, hint, required, error, uswds, value }) => {
  const [dateVal, setDateVal] = useState(value);
  const [errorVal, setErrorVal] = useState(error);
  const today = new Date();
  // new Date as YYYY-MM-DD is giving the day prior to the day select
  // new Date as YYYY MM DD is giving the correct day selected
  const dateParts = dateVal.split('-');
  const dateInput = new Date();
  dateInput.setFullYear(dateParts[0]);
  dateInput.setMonth(dateParts[1] - 1);
  dateInput.setDate(dateParts[2]);
  function handleDateBlur() {
    if (dateInput <= today) {
      setErrorVal('Date must be in the future');
    } else {
      setErrorVal('');
    }
  }

  return (
    <>
      <VaMemorableDate
        uswds={uswds}
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={errorVal}
        invalidYear={!!errorVal || null}
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
      <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2"><code>
const [dateVal, setDateVal] = useState(value);<br/>
const [errorVal, setErrorVal] = useState(error);<br/>
const today = new Date();<br/>
// new Date as YYYY-MM-DD is giving the day prior to the day select<br/>
// new Date as YYYY MM DD is giving the correct day selected<br/>
const dateInput = new Date(dateVal.split('-').join(' '));<br/>
function handleDateBlur() &#x7b;<br/>
  if (dateInput &lt;= today) &#x7b;<br/>
    setErrorVal('Date must be in the future');<br/>
  &#x7d; else &#x7b;<br/>
    setErrorVal('');<br/>
  &#x7d;<br/>
&#x7d;</code></pre>
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

const I18nTemplate = ({ label, name, required, error, uswds, value }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button uswds style={{fontSize: '16px'}} onClick={e => setLang('es')} text="Español"/>
      <va-button uswds style={{fontSize: '16px'}} onClick={e => setLang('en')} text="English"/>
      <va-button uswds style={{fontSize: '16px'}} onClick={e => setLang('tl')} text="Tagalog"/>
      <VaMemorableDate
        uswds={uswds}
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={error}
        value={value}
        onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
        onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
      />
    </div>
)};

const FormsPatternSingleTemplate = ({ label, name, hint, required, error, uswds, value, monthSelect }) => {

  const id = (Math.floor(Math.random() * 100) + 1);
  const handleClick = () => {
    const header = document.getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <VaMemorableDate
        uswds={uswds}
        monthSelect={monthSelect}
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={error}
        value={value}
        onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
        onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
        use-forms-pattern="single"
        id={`form-pattern-single-input-${id}`}
        form-heading-level={1}
        form-heading="Enter a date"
        form-description="This is the additional form-description prop"
      >
        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul>
            <li>Month</li>
            <li>Day</li>
            <li>Year</li>
          </ul>
        </div>
      </VaMemorableDate>
      <hr />

      <va-button 
        text="click to focus header" 
        onClick={handleClick}>
      </va-button>
    </>
  );
};


const FormsPatternMultipleTemplate = ({ label, name, hint, required, error, uswds, value, monthSelect }) => {

  const handleClick = () => {
    const header = document.getElementById(`form-pattern-single-input-multiple`)
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <VaMemorableDate
        uswds={uswds}
        monthSelect={monthSelect}
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={error}
        value={value}
        onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
        onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
        use-forms-pattern="single"
        id={`form-pattern-single-input-multiple`}
        form-heading-level={1}
        form-heading="Enter dates"
        form-description="This is the additional form-description prop"
      />
      <VaMemorableDate
        uswds={uswds}
        monthSelect={monthSelect}
        label={'Date of enrollment'}
        name={name}
        hint={hint}
        required={required}
        value={value}
        onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
        onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
        use-forms-pattern="single"
        id={`form-pattern-single-input-multiple`}
      />
      <hr />

      <va-button 
        text="click to focus header" 
        onClick={handleClick}>
      </va-button>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(memorableDateInputDocs);

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const WithoutMonthSelect = Template.bind(null);
WithoutMonthSelect.args = {
  ...defaultArgs,
  monthSelect: false,
  value: '2022-04-19',
};

export const ExtraHintText = Template.bind(null);
ExtraHintText.args = {
  ...defaultArgs,
  value: '2022-04-19',
  hint: 'Extra hint text',
};

export const ErrorWithMonthSelect = Template.bind(null);
ErrorWithMonthSelect.args = {
  ...defaultArgs,
  error: 'Error Message Example',
  monthSelect: true,
};

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};

// export const Internationalization = I18nTemplate.bind(null);
// Internationalization.args = {
//   ...defaultArgs,
//   error: 'Error Message Example',
//   required: true,
// };


export const FormsPatternSingleWithMonthDropdown = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleWithMonthDropdown.args = {
  ...defaultArgs,
};


export const FormsPatternSingleWithoutMonthDropdown = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleWithoutMonthDropdown.args = {
  ...defaultArgs,
  monthSelect: false,
};

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = {
  ...defaultArgs,
};

export const FormsPatternMultipleError = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultipleError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};
