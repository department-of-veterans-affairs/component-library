import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const inputTelephoneDocs = getWebComponentDocs('va-input-telephone');

export default {
  title: 'Components/Input Telephone USWDS',
  id: 'uswds/va-input-telephone',
  parameters: {
    componentSubtitle: 'va-input-telephone web component',
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
  error: ""
};

const Template = ({
  hint,
  'no-country': noCountry,
  contact,
  country,
  error,
  header
}) => {
  return (
    <va-input-telephone
      hint={hint}
      header={header}
      country={country}
      contact={contact}
      no-country={noCountry}
      error={error}
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

export const WithCustomHeader = Template.bind(null);
WithCustomHeader.args = {
  ...defaultArgs,
  header: 'Secondary phone number'
}

export const WithCustomError = Template.bind(null);
WithCustomError.args = {
  ...defaultArgs,
  error: 'This is a custom error message'
}

export const WithPhoneFormatError = Template.bind(null);
WithPhoneFormatError.args = {
  ...defaultArgs,
  contact: "234"
}

export const WithHint = Template.bind(null);
WithHint.args = {
  ...defaultArgs,
  hint: 'Enter a phone number where you can be reached if we have questions about your application',
}

export const WithNoCountry = Template.bind(null);
WithNoCountry.args = {
  ...defaultArgs,
  'no-country': true,
}
