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
  'show-shadow': false,
  'background': false,
  'with-icon': '',
};

const Template = ({ 'show-shadow': showShadow, 'background': background, 'with-icon': withIcon }) => (
  <va-card show-shadow={showShadow} background={background} with-icon={withIcon}>
    <p>Example card content</p>
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
  'with-icon': 'location_city',
};
withIcon.argTypes = {
  ...propStructure(cardDocs),
  'with-icon': {
    control: 'text',
    description: 'Displays an icon at the top of the card in a blue circle. Value is the icon name.',
  },
};
