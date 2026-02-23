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
  summaryText: 'Summary text',
  open: false,
}

const Template = (args) => {
  return (
    <div style={{ padding: '1rem'}}>
    <VaDetails summaryText={args.summaryText} open={args.open}>
      <p>
        This is the content of the details component. It can be any HTML
        content, including links like this one:
      </p>
    </VaDetails>
    </div>
  )
}

export const Default = Template.bind({});
Default.args = {
  summaryText: 'Summary text',
};

export const Open = Template.bind({});
Open.args = {
  summaryText: 'Summary text',
  open: true,
};

const WithContentTemplate = (args) => {
  return (
    <div style={{ padding: '1rem'}}>
    <VaDetails summaryText={args.summaryText} open={args.open}>
      <va-summary-box>
        <h3 slot="headline">
          If I'm a Veteran, can I get VR&E benefits and services?
        </h3>
        <p>
          You may be eligible for VR&amp;E benefits and services if you're a
          Veteran, and you meet all of the requirements listed below.
        </p>
        <p>
          <strong>All of these must be true. You:</strong>
        </p>
        <ul>
          <li>
            Didn't receive a dishonorable discharge, <strong>and</strong>
          </li>s
          <li>
            Have a service-connected disability rating of at least 10% from VA,
            <strong> and</strong>
          </li>
          <li>
            <a href="#">Apply for VR&amp;E services</a>
          </li>
        </ul>
      </va-summary-box>
      
    </VaDetails>
    </div>
  )
}

export const WithContentComponent = WithContentTemplate.bind({});
WithContentComponent.args = {
  ...defaultArgs,
};