import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaDetails } from '@department-of-veterans-affairs/web-components/react-bindings';

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

const defaultArgs = {
  label: 'Summary text',
  open: false,
}

const Template = (args) => {
  return (
  <VaDetails label={args.label} open={args.open}>
    The United States is automatically chosen as your country if you live on a
    military base outside of the country.
  </VaDetails>
  )
}

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(detailsDocs);

export const Open = Template.bind({});
Open.args = {
  label: 'Summary text',
  open: true,
};

const WithContentTemplate = (args) => {
  return (
    <VaDetails label={args.label} open={args.open}>
      <div>
        <p>Here are some popular pets to consider</p>
        <ul>
          <li>Dogs</li>
          <li>Cats</li>
          <li>Fish</li>
          <li>Birds</li>
        </ul>
      </div>
    </VaDetails>
  )
}

export const WithContentComponent = WithContentTemplate.bind({});
WithContentComponent.args = {
  ...defaultArgs,
};

const WidthsTemplate = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <VaDetails label={args.label} open={args.open} width="xl">
        This details component has a width of xl (40ex).
      </VaDetails>
      <VaDetails label={args.label} open={args.open} width="2xl">
        This details component has a width of 2xl (50ex).
      </VaDetails>
    </div>
  )
}

export const Widths = WidthsTemplate.bind({});
Widths.args = {
  ...defaultArgs,
};