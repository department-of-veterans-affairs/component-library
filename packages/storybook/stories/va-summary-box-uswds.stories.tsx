import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const summaryBoxDocs = getWebComponentDocs('va-summary-box');

export default {
  title: 'Components/Summary box USWDS',
  id: 'uswds/va-summary-box',
  parameters: {
    componentSubtitle: 'va-summary-box web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={summaryBoxDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({}) => {
  return (
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
        </li>
        <li>
          Have a service-connected disability rating of at least 10% from VA,
          <strong> and</strong>
        </li>
        <li>
          <a href="#">Apply for VR&amp;E services</a>
        </li>
      </ul>
    </va-summary-box>
  );
};

export const Default = Template.bind(null);
Default.args = defaultArgs;
Default.argTypes = propStructure(summaryBoxDocs);
