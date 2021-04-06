import { html } from 'lit-html';

export default {
  title: 'Components/Alert',
  component: 'va-alert',
};

const defaultArgs = {
  headline: 'This is an alert',
  status: 'info',
};

const Template = ({ headline, status }) => html`
  <va-alert headline="${headline}" status="${status}">
    <div>
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </div>
  </va-alert>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Continue = Template.bind({});

Continue.args = { ...defaultArgs, status: 'continue' };
