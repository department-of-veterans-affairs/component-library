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
  'required': true,
  'heading-level': 3,
  'heading-text': 'Card Status Heading',
  'error': '',
  'show-error': false,
  'link-href': '',
  'link-text': '',
  'show-shadow': false,
};

const Template = ({ 
    'required': required,
    'heading-level': headingLevel,
    'heading-text': headingText,
    'error': error,
    'show-error': showError,
    'link-href': linkHref,
    'link-text': linkText,
    'show-shadow': showShadow,
}) => (
  <va-card-status
    required={required}
    heading-level={headingLevel}
    heading-text={headingText}
    error={error}
    show-error={showError}
    link-href={linkHref}
    link-text={linkText}
    show-shadow={showShadow} 
    >
    <div>
      <p>Example card content</p>
    </div>
  </va-card-status>
);

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(cardStatusDocs);

// export const withDropShadow = Template.bind(null);
// withDropShadow.args = {
//   ...defaultArgs,
//   'show-shadow': true,
// };
