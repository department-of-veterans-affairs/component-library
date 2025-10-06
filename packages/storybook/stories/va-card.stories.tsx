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
  'icon-name': '',
  'has-cta': false,
};

const Template = ({ 'show-shadow': showShadow, 'background': background, 'icon-name': iconName, 'has-cta': hasCta }) => (
  <va-card show-shadow={showShadow} background={background} icon-name={iconName}>
    <div>
      <h3 className='vads-u-margin-top--1'>Example card title</h3>
      <p>Example card content</p>
      {hasCta ? (
        <va-link
          href="https://www.va.gov"
          text="Example call to action link"
        />
      ) : null}
    </div>
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
    description: 'Displays an icon at the top of the card in a blue circle. Value is the icon name.',
  },
};

export const withCallToAction = Template.bind(null);
withCallToAction.args = {
  ...defaultArgs,
  'has-cta': true,
};
