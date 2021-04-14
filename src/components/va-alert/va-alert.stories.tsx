import { html } from 'lit-html';

export default {
  title: 'Components/Alert',
  component: 'va-alert',
};

const defaultArgs = {
  headline: 'This is an alert',
  status: 'info',
  backgroundOnly: false,
};

const Template = ({ backgroundOnly, headline, status }) => html`
  <div>
    <va-alert
      background-only="${backgroundOnly}"
      headline="${headline}"
      status="${status}"
    >
      <div>
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
        <a href="#">test</a>
      </div>
    </va-alert>
    <script>
      const alertElement = document.querySelector('va-alert');
      alertElement.addEventListener('close', event => {
        console.log('Close button clicked');
      });
      alertElement.addEventListener('component-library-analytics', e => {
        console.log(e);
      });
    </script>
  </div>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Continue = Template.bind({});
Continue.args = { ...defaultArgs, status: 'continue' };

export const Success = Template.bind({});
Success.args = { ...defaultArgs, status: 'success' };

export const Warning = Template.bind({});
Warning.args = { ...defaultArgs, status: 'warning' };

export const Error = Template.bind({});
Error.args = { ...defaultArgs, status: 'error' };

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  backgroundOnly: 'true',
};
