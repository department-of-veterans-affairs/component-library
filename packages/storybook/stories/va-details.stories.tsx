import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const detailsDocs = getWebComponentDocs('va-details');

export default {
  title: 'Components/Details',
  id: 'components/va-details',
  parameters: {
    componentSubtitle: 'va-details web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={detailsDocs} />,
    },
  },
};

const Template = (args) => {
  return (
    <div style={{ padding: '1rem'}}>
    <va-details trigger={args.trigger} open={args.open}>
      <p>
        This is the content of the details component. It can be any HTML
        content, including links like this one:
      </p>
    </va-details>
    </div>
  )
}

export const Default = Template.bind({});
Default.args = {
  trigger: 'Summary text',
};

export const Open = Template.bind({});
Open.args = {
  trigger: 'Summary text',
  open: true,
};