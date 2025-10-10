import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tagDocs = getWebComponentDocs('va-tag');

export default {
  title: 'Components/Tag',
  id: 'components/va-tag',
  component: 'va-tag',
  decorators: [
    (Story) => (
      <div className="vads-u-margin--1">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle: 'va-tag web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={tagDocs} />,
    },
  },
  argTypes: {
    ...propStructure(tagDocs),
  }
};

const Template = (args) => {
  return (
    <va-tag text={args.text}></va-tag>
  );
};

export const Default = Template.bind({});
Default.args = {
  text: 'New',
};
