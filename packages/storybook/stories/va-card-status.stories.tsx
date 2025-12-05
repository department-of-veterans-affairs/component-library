import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardDocs = getWebComponentDocs('va-card-status');

export default {
  title: 'Components/Card Status',
  id: 'components/va-card-status',
  parameters: {
    componentSubtitle: 'va-card-status web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={cardDocs} />,
    },
  },
};

const defaultArgs = {
  'heading-level': 3,
  'heading-text': 'Card Status Heading',
  'tag-status': 'informational',
  'tag-text': '',
  'error-message': '',
  'link-href': '',
  'link-text': '',
  'show-sub-header': false,
  'show-footer-slot': false,
  'required': false,
};

const Template = ({
  'heading-level': headingLevel,
  'heading-text': headingText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error-message': errorMessage,
  'link-href': linkHref,
  'link-text': linkText,
  'show-sub-header': showSubHeader,
  'show-footer-slot': showFooterSlot,
  'required': required,
}) => (
  <va-card-status
    heading-level={headingLevel}
    heading-text={headingText}
    tag-status={tagStatus}
    tag-text={tagText}
    error-message={errorMessage}
    link-href={linkHref}
    link-text={linkText}
    required={required}
  >
    <h3 slot="header" className="vads-u-margin-y--1p5">
      <span className="vads-c-eyebrow">Eyebrow Title</span>
      Heading slot
    </h3>
    {showSubHeader && (
      <h4 slot="subHeader" className="vads-u-margin-top--1p5">
        Subheader Optional
      </h4>
    )}
    <div>
      <p>Example card content</p>
    </div>
    {showFooterSlot && (
      <div slot="footer" className="vads-u-margin-top--3">
        <va-button text="Update" />
        <va-button secondary text="Delete" />
      </div>
    )}
  </va-card-status>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardDocs);

export const withRequired = Template.bind(null);
withRequired.args = {
  ...defaultArgs,
  'required': true,
};

export const withTag = Template.bind(null);
withTag.args = {
  ...defaultArgs,
  'tag-text': 'Status',
  'tag-status': 'informational',
};

export const withErrorMessageAndRequired = Template.bind(null);
withErrorMessageAndRequired.args = {
  ...defaultArgs,
  'error-message': 'This is an error message.',
  'required': true,
};

export const withErrorTagAndLink = Template.bind(null);
withErrorTagAndLink.args = {
  ...defaultArgs,
  'error-message': 'This is an error message.',
  'tag-status': 'error',
  'tag-text': 'Missing',
  'link-href': 'https://www.va.gov',
  'link-text': 'Link to more info',
};

export const headingSlot = Template.bind(null);
headingSlot.args = {
  ...defaultArgs,
  'heading-text': '',
};

export const subHeadingSlot = Template.bind(null);
subHeadingSlot.args = {
  ...defaultArgs,
  'show-sub-header': true,
};

export const footerSlot = Template.bind(null);
footerSlot.args = {
  ...defaultArgs,
  'show-footer-slot': true,
};
