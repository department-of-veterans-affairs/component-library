import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tagDocs = getWebComponentDocs('va-tag-status');

export default {
  title: 'Components/Tag - Status',
  id: 'components/va-tag-status',
  component: 'va-tag-status',
  decorators: [
    (Story) => (
      <div className="vads-u-margin--1">
        <Story />
      </div>
    ),
  ],
  parameters: {
    componentSubtitle: 'va-tag-status web component',
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
    // @ts-ignore - Custom web component
    <va-tag-status status={args.status} text={args.text} screen-reader-text={args.screenReaderText}></va-tag-status>
  );
};

export const Default = Template.bind({});
Default.args = {
  status: 'info',
  text: 'Info Tag',
};

export const Warning = Template.bind({});
Warning.args = {
  status: 'warning',
  text: 'Warning Tag',
};

export const Success = Template.bind({});
Success.args = {
  status: 'success',
  text: 'Success Tag',
};

export const Error = Template.bind({});
Error.args = {
  status: 'error',
  text: 'Error Tag',
};

export const WithCustomScreenReaderText = Template.bind({});
WithCustomScreenReaderText.args = {
  status: 'error',
  text: 'Error Tag',
  screenReaderText: 'Custom screen reader status text:',
};