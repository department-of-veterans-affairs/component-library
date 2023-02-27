import React, { useState, useEffect } from 'react';
import { VaMemorableDate } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaMemorableDate.displayName = 'VaMemorableDate';

const memorableDateInputDocs = getWebComponentDocs('va-memorable-date');

export default {
  title: 'Components/Memorable date',
  id: 'components/va-memorable-date',
  parameters: {
    componentSubtitle: `va-memorable-date web component`,
    docs: {
      page: () => <StoryDocs data={memorableDateInputDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Date of birth',
  hint: '',
  name: 'test',
  required: false,
  error: undefined,
  value: undefined,
};

const Template = ({ label, name, required, error, value, hint }) => {
  return (
    <VaMemorableDate
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

const ExtraHintTemplate = ({ label, name, required, error, value, hint }) => {
  return (
    <VaMemorableDate
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

const CustomValidationTemplate = ({ label, name, required, error, value, hint }) => {
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
      <VaMemorableDate
        label={label}
        name={name}
        hint={hint}
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
          href="https://github.com/department-of-veterans-affairs/component-library/tree/main/packages/storybook/stories"
          target="_blank"
        >
          View validation code in our repo
        </a>
      </div>
    </>
  );
};

const I18nTemplate = ({ label, name, required, error, value, hint }) => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <VaMemorableDate
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

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(memorableDateInputDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'Error Message Example' };

export const WithHintTextError = Template.bind(null);
WithHintTextError.args = {
  ...defaultArgs,
  error: 'Error Message Example',
};

export const ExtraHintText = ExtraHintTemplate.bind(null);
ExtraHintText.args = {
  ...defaultArgs,
  hint: 'Extra hint text',
};

export const CustomValidation = CustomValidationTemplate.bind(null);
CustomValidation.args = {
  ...defaultArgs,
  required: true,
  value: '2022-04-19',
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  error: 'Error Message Example',
  required: true,
};
