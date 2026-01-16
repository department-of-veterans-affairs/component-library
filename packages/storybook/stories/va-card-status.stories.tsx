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
  'header-level': 3,
  'header-text': 'Mobile phone number',
  'subheader-text': '',
  'tag-status': 'info',
  'tag-text': '',
  'error': '',
  'link-href': 'https://www.va.gov',
  'link-text': 'Edit mobile phone number',
  'required': false,
};

const Template = ({
  'header-level': headerLevel,
  'header-text': headerText,
  'subheader-text': subheaderText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error': error,
  'link-href': linkHref,
  'link-text': linkText,
  'required': required,
}) => (
  <va-card-status
    header-level={headerLevel}
    header-text={headerText}
    subheader-text={subheaderText}
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
  'header-level': headerLevel,
  'header-text': headerText,
  'subheader-text': subheaderText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error': error,
  'link-href': linkHref,
  'link-text': linkText,
  'required': required,
}) => (
  <va-card-status
    header-level={headerLevel}
    header-text={headerText}
    subheader-text={subheaderText}
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
  'subheader-text': 'Optional subheader',
};
