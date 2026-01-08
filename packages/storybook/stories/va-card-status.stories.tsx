import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardStatusDocs = getWebComponentDocs('va-card-status');

export default {
  title: 'Components/Card Status',
  id: 'components/va-card-status',
  parameters: {
    componentSubtitle: 'va-card-status web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={cardStatusDocs} />,
    },
  },
};

const defaultArgs = {
  'heading-level': 3,
  'heading-text': 'Card Status Heading',
  'sub-header-text': '',
  'tag-status': 'informational',
  'tag-text': '',
  'error-message': '',
  'link-href': 'https://www.va.gov',
  'link-text': 'Link to more info',
  'required': false,
};

const Template = ({
  'heading-level': headingLevel,
  'heading-text': headingText,
  'sub-header-text': subHeaderText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error-message': errorMessage,
  'link-href': linkHref,
  'link-text': linkText,
  'required': required,
}) => (
  <va-card-status
    heading-level={headingLevel}
    heading-text={headingText}
    sub-header-text={subHeaderText}
    tag-status={tagStatus}
    tag-text={tagText}
    error-message={errorMessage}
    link-href={linkHref}
    link-text={linkText}
    required={required}
  >
    <p>Example card content</p>
  </va-card-status>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardStatusDocs);

export const withTagAndRequired = Template.bind(null);
withTagAndRequired.args = {
  ...defaultArgs,
  'tag-text': 'Status',
  'tag-status': 'informational',
  'required': true,
};
export const withSubHeader = Template.bind(null);
withSubHeader.args = {
  ...defaultArgs,
  'heading-text': 'Contact Information',
  'sub-header-text': 'Mailing Address',
};

export const withErrorMessageAndRequired = Template.bind(null);
withErrorMessageAndRequired.args = {
  ...defaultArgs,
  'heading-text': 'Date of Birth',
  'error-message':
    'Your date of birth is required. Use the "Add date of birth" link to provide this information.',
  'tag-status': 'error',
  'tag-text': 'Missing',
  'required': true,
  'link-href': 'https://www.va.gov',
  'link-text': 'Your Personal Information',
};
