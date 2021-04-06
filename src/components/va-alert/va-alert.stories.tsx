import { html } from 'lit-html';

export default {
  title: 'Components/Alert',
  component: 'va-alert',
};

const defaultArgs = {
  headline: 'This is an alert',
};

const Template = ({ headline }) => html`
  <va-alert headline="${headline}">
    <div>
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </div>
  </va-alert>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };
