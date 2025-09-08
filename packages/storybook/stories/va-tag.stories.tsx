import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const tagDocs = getWebComponentDocs('va-tag');

export default {
  title: 'Components/Tag',
  id: 'components/va-tag',
  component: 'va-tag',
  decorators: [
    (Story) => (
      <div className="vads-u-margin--2">
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
    <va-tag status={args.status} text={args.text}></va-tag>
  );
};

export const Default = Template.bind({});
Default.args = {
  status: 'default',
  text: 'Default Tag',
};

export const Informational = Template.bind({});
Informational.args = {
  status: 'informational',
  text: 'Informational Tag',
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

export const USWDSTag = {
  render: () => <span className="usa-label">New</span>,
};

