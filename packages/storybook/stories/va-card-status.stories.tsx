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
  'heading-text': 'Mobile phone number',
  'sub-header-text': '',
  'tag-status': 'informational',
  'tag-text': '',
  'error': '',
  'link-href': 'https://www.va.gov',
  'link-text': 'Edit mobile phone number',
  'required': false,
};

const Template = ({
  'heading-level': headingLevel,
  'heading-text': headingText,
  'sub-header-text': subHeaderText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error': error,
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
    error={error}
    link-href={linkHref}
    link-text={linkText}
    required={required}
  >
    <p>123-867-5309</p>
  </va-card-status>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardStatusDocs);

const TemplateErrorState = ({
  'heading-level': headingLevel,
  'heading-text': headingText,
  'sub-header-text': subHeaderText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error': error,
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
    error={error}
    link-href={linkHref}
    link-text={linkText}
    required={required}
  >
    <p>Not provided</p>
  </va-card-status>
);

export const missingContentState = TemplateErrorState.bind(null);
missingContentState.args = {
  ...defaultArgs,
  'tag-text': 'Missing',
  'tag-status': 'error',
  'link-text': 'Add mobile phone number',
  'required': true,
};

export const errorState = TemplateErrorState.bind(null);
errorState.args = {
  ...defaultArgs,
  'error':
    'Your mobile phone number is missing. Select "Add" to enter your mobile phone number.',
  'tag-text': 'Missing',
  'tag-status': 'error',
  'link-text': 'Add mobile phone number',
  'required': true,
};

export const withInfoTagAndSubheader= Template.bind(null);
withInfoTagAndSubheader.args = {
  ...defaultArgs,
  'tag-text': 'Status',
  'required': true,
  'sub-header-text': 'Optional subheader',
};
