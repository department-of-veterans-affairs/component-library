import { useState, useEffect } from 'react';
import { VaMemorableDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  applyFocus,
} from './wc-helpers';

VaMemorableDate.displayName = 'VaMemorableDate';

const memorableDateInputDocs = getWebComponentDocs('va-memorable-date');

export default {
  title: 'Components/Memorable date USWDS',
  id: 'uswds/va-memorable-date',
  parameters: {
    componentSubtitle: 'va-memorable-date web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={memorableDateInputDocs} />
      ),
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
  'month-select': false,
  'remove-date-hint': false,
  customYearErrorMessage: `Please enter a year between 1900 and ${new Date().getFullYear()}`,
};

const Template = ({
  label,
  name,
  hint,
  required,
  error,
  value,
  'month-select': monthSelect,  
  'remove-date-hint': removeDateHint,
  customYearErrorMessage,
}) => {
  return (
    <VaMemorableDate
      monthSelect={monthSelect}
      label={label}
      name={name}
      hint={hint}
      required={required}
      error={error}  
      value={value}
      removeDateHint={removeDateHint}
      customYearErrorMessage={customYearErrorMessage}
      onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
      onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
    />
  );
};

const CustomValidationTemplate = ({
  label,
  name,
  hint,
  required,
  error,
  value,
}) => {
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
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={errorVal}
        invalidYear={!!errorVal || undefined}
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
        <pre className="vads-u-font-size--sm vads-u-background-color--gray-lightest vads-u-padding--2">
          <code>
            const [dateVal, setDateVal] = useState(value);
            <br />
            const [errorVal, setErrorVal] = useState(error);
            <br />
            const today = new Date();
            <br />
            // new Date as YYYY-MM-DD is giving the day prior to the day select
            <br />
            // new Date as YYYY MM DD is giving the correct day selected
            <br />
            const dateInput = new Date(dateVal.split('-').join(' '));
            <br />
            function handleDateBlur() &#x7b;
            <br />
              if (dateInput &lt;= today) &#x7b;
            <br />
                setErrorVal('Date must be in the future');
            <br />
              &#x7d; else &#x7b;
            <br />
                setErrorVal('');
            <br />
              &#x7d;
            <br />
            &#x7d;
          </code>
        </pre>
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

const I18nTemplate = ({ label, name, required, hint, error, value, customYearErrorMessage }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main')?.setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button
        style={{ fontSize: '16px' }}
        onClick={e => setLang('es')}
        text="Español"
      />
      <va-button
        style={{ fontSize: '16px' }}
        onClick={e => setLang('en')}
        text="English"
      />
      <va-button
        style={{ fontSize: '16px' }}
        onClick={e => setLang('tl')}
        text="Tagalog"
      />
      <VaMemorableDate
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={error}
        value={value}
        onDateBlur={e => console.log(e, 'DATE BLUR FIRED')}
        onDateChange={e => console.log(e, 'DATE CHANGE FIRED')}
        customYearErrorMessage={customYearErrorMessage}
      />
    </div>
  );
};

const FormsPatternSingleTemplate = ({
  label,
  name,
  hint,
  required,
  error,
  value,
  'month-select': monthSelect,
  customYearErrorMessage,
}) => {
  const id = Math.floor(Math.random() * 100) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <VaMemorableDate
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
        customYearErrorMessage={customYearErrorMessage}
      >
        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul className="vads-u-margin-bottom--2">
            <li>Month</li>
            <li>Day</li>
            <li>Year</li>
          </ul>
        </div>
      </VaMemorableDate>
      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

const FormsPatternMultipleTemplate = ({
  label,
  name,
  hint,
  required,
  error,
  value,
  monthSelect,
  customYearErrorMessage,
}) => {
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-input-multiple`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <VaMemorableDate
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
        customYearErrorMessage={customYearErrorMessage}
      />
      <VaMemorableDate
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
        customYearErrorMessage={customYearErrorMessage}
      />
      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

const CustomErrorMessageTemplate = ({
  label,
  name,
  hint,
  required,
  error,
  value,
  customYearErrorMessage,
}) => {
  return (
    <>
      <VaMemorableDate
        id="custom-error-message"
        label={label}
        name={name}
        hint={hint}
        required={required}
        error={error}
        invalidDay={true}
        value={value}
        onDateBlur={() => {}}
        onDateChange={() => {}}
        customDayErrorMessage="This is a custom error message for an invalid day"
        customYearErrorMessage={customYearErrorMessage}
      />
      <hr />
      <div>
        To display a custom error message when a day, month, or year is invalid,
        use the &nbsp;<code>customDayErrorMessage</code>,{' '}
        <code>customMonthErrorMessage</code>, or{' '}
        <code>customYearErrorMessage</code>, prop respectively.
      </div>
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

export const WithMonthSelect = Template.bind(null);
WithMonthSelect.args = {
  ...defaultArgs,
  'month-select': true,
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
  'month-select': true,
};

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};

export const CustomErrorMessage = CustomErrorMessageTemplate.bind(null);
CustomErrorMessage.args = {
  ...defaultArgs,
  value: '2024-11-99',
  error: 'true',
};

// export const Internationalization = I18nTemplate.bind(null);
// Internationalization.args = {
//   ...defaultArgs,
//   error: 'Error Message Example',
//   required: true,
// };

export const FormsPatternSingleWithMonthDropdown =
  FormsPatternSingleTemplate.bind(null);
FormsPatternSingleWithMonthDropdown.args = {
  ...defaultArgs,
  'month-select': true,
};

export const FormsPatternSingleWithoutMonthDropdown =
  FormsPatternSingleTemplate.bind(null);
FormsPatternSingleWithoutMonthDropdown.args = {
  ...defaultArgs,
  'month-select': false,
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

export const FormsPatternMultipleError =
  FormsPatternMultipleTemplate.bind(null);
FormsPatternMultipleError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};
