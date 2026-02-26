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
  argTypes: {
    ...propStructure(detailsDocs),
    width: {
      control: 'select',
      options: ['xl', '2xl'],
      table: {
        category: 'Properties',
      }
    },
  }
};

const defaultArgs = {
  'disable-analytics': false,
  label: 'Learn more about military addresses',
  open: false,
  width: undefined,
}

const Template = (args) => {
  return (
  <VaDetails
    label={args.label}
    open={args.open}
    width={args.width}
    disableAnalytics={args['disable-analytics']}
  >
    The United States is automatically chosen as your country if you live on a
    military base outside of the country.
  </VaDetails>
  )
}

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
// Default.argTypes = propStructure(detailsDocs);

export const Open = Template.bind({});
Open.args = {
  ...defaultArgs,
  open: true,
};

const WithContentTemplate = (args) => {
  return (
    <VaDetails
      label={args.label}
      open={args.open}
      width={args.width}
      disableAnalytics={args['disable-analytics']}
    >
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
  label: 'Summary label text',
};

const WidthsTemplate = (args) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <VaDetails
        label='This details component has a width of xl'
        open={args.open}
        width={args.width || 'xl'}
        disableAnalytics={args['disable-analytics']}
      >
        The value of "xl" sets the width of the details component to 40ex.
      </VaDetails>
      <VaDetails
        label='This details component has a width of 2xl'
        open={args.open}
        width={args.width || '2xl'}
        disableAnalytics={args['disable-analytics']}
      >
        The value of "2xl" sets the width of the details component to 50ex.
      </VaDetails>
    </div>
  )
}

export const Widths = WidthsTemplate.bind({});
Widths.args = { ...defaultArgs };