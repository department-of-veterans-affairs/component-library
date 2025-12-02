import { useEffect, useState } from 'react';
import { VaTelephoneInput } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
} from './wc-helpers';

VaTelephoneInput.displayName = 'VaTelephoneInput';
const inputTelephoneDocs = getWebComponentDocs('va-telephone-input');

export default {
  title: 'Components/Telephone Input',
  id: 'components/va-telephone-input',
  parameters: {
    componentSubtitle: 'va-telephone-input web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={inputTelephoneDocs} />,
    },
  },
};

const defaultArgs = {
  contact: "",
  country: null,
  'no-country': false,
  hint: "",
  error: "",
  required: false,
  label: "",
  'show-external-errors': true
};

const Template = ({
  hint,
  'no-country': noCountry,
  contact,
  country,
  error,
  label,
  required,
  'show-internal-errors': showInternalErrors
}) => {
  return (
    // @ts-ignore - Custom web component
    <va-telephone-input
      hint={hint}
      label={label ? label : null}
      country={country}
      contact={contact}
      no-country={noCountry}
      error={error}
      required={required}
      show-internal-errors={showInternalErrors}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs
}
Default.argTypes = propStructure(inputTelephoneDocs);

export const WithContact = Template.bind(null);
WithContact.args = {
  ...defaultArgs,
  contact: "2345678910"
}

export const WithCountry = Template.bind(null);
WithCountry.args = {
  ...defaultArgs,
  country: "MX"
}

export const WithCustomLabel = Template.bind(null);
WithCustomLabel.args = {
  ...defaultArgs,
  label: 'Secondary phone number'
}

const ErrorTemplate = (args) => (
  <div style={{ paddingLeft: window.innerWidth >= 1024 ? '1rem' : 0 }}>
    {Template(args)}
  </div>
);

export const WithCustomError = ErrorTemplate.bind(null);
WithCustomError.args = {
  ...defaultArgs,
  error: 'This is a custom error message'
}


const WithPhoneFormatTemplate = ({}) => {

  const [err, setErr] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setErr('Enter a United States of America phone number in a valid format, for example, (xxx) xxx-xxxx');
    }, 0);
  }, []);

  return (
    <VaTelephoneInput contact="234" error={err} />
  );
};

const WithPhoneFormatErrorWithPadding = (args) => (
  <div style={{ paddingLeft: window.innerWidth >= 1024 ? '1rem' : 0 }}>
    {WithPhoneFormatTemplate(args)}
  </div>
);

export const WithPhoneFormatError = WithPhoneFormatErrorWithPadding.bind(null);

export const WithHint = Template.bind(null);
WithHint.args = {
  ...defaultArgs,
  hint: 'Enter a phone number where you can be reached if we have questions about your application',
}

export const WithRequired = Template.bind(null);
WithRequired.args = {
  ...defaultArgs,
  required: true
}

export const WithNoCountry = Template.bind(null);
WithNoCountry.args = {
  ...defaultArgs,
  'no-country': true,
}

export const WithShowInternalErrors = ErrorTemplate.bind(null);
WithShowInternalErrors.args = {
  ...defaultArgs,
  'show-internal-errors': false,
  hint: 'This component will only show external errors.',
  error: 'This error is externally passed to the component.'
}
