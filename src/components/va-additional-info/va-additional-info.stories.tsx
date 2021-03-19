import { html } from 'lit-html';

export default {
  title: 'Components/AdditionalInfo',
  component: 'va-additional-info',
};

const defaultArgs = {
  trigger: 'Show more',
};

const Template = ({ trigger }) => html`
  <va-additional-info trigger="${trigger}">
    <div>Testing</div>
  </va-additional-info>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };
