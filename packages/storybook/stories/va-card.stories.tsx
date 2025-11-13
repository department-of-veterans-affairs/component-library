import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const cardDocs = getWebComponentDocs('va-card');

export default {
  title: 'Components/Card',
  id: 'components/va-card',
  parameters: {
    componentSubtitle: 'va-card web component',
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
  'show-error': false,
  'link-href': '',
  'link-text': '',
  'show-shadow': false,
  'background': false,
  'icon-name': '',
  'show-sub-header': false,
  'show-footer-slot': false,
};

const Template = ({
  'heading-level': headingLevel,
  'heading-text': headingText,
  'tag-status': tagStatus,
  'tag-text': tagText,
  'error-message': errorMessage,
  'show-error': showError,
  'link-href': linkHref,
  'link-text': linkText,
  'show-shadow': showShadow,
  'background': background,
  'icon-name': iconName,
  'show-sub-header': showSubHeader,
  'show-footer-slot': showFooterSlot,
}) => (
  <va-card
    heading-level={headingLevel}
    heading-text={headingText}
    tag-status={tagStatus}
    tag-text={tagText}
    error-message={errorMessage}
    show-error={showError}
    link-href={linkHref}
    link-text={linkText}
    show-shadow={showShadow}
    background={background}
    icon-name={iconName}
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
  </va-card>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardDocs);

export const withBackground = Template.bind(null);
withBackground.args = {
  ...defaultArgs,
  background: true,
};

export const withDropShadow = Template.bind(null);
withDropShadow.args = {
  ...defaultArgs,
  'show-shadow': true,
};

export const withIcon = Template.bind(null);
withIcon.args = {
  ...defaultArgs,
  'icon-name': 'location_city',
};
withIcon.argTypes = {
  ...propStructure(cardDocs),
  'icon-name': {
    control: 'text',
    description:
      'Displays an icon at the top of the card in a blue circle. Value is the icon name.',
  },
};

export const withTag = Template.bind(null);
withTag.args = {
  ...defaultArgs,
  'tag-text': 'Status',
  'tag-status': 'informational',
};

export const withErrorMessage = Template.bind(null);
withErrorMessage.args = {
  ...defaultArgs,
  'show-error': true,
  'error-message': 'This is an error message.',
};

export const withErrorTagAndLink = Template.bind(null);
withErrorTagAndLink.args = {
  ...defaultArgs,
  'show-error': true,
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
