import { html } from 'lit-html';

export default {
  title: 'Components/Alert',
  component: 'va-alert',
};

const defaultArgs = {
  headline: 'This is an alert',
  status: 'info',
  backgroundOnly: false,
  closeable: false,
  fullWidth: false,
};

const Template = ({
  backgroundOnly,
  fullWidth,
  headline,
  status,
  closeable,
}) => html`
  <div>
    <va-alert
      background-only="${backgroundOnly}"
      status="${status}"
      closeable="${closeable}"
      full-width="${fullWidth}"
    >
      <h3 slot="headline">${headline}</h3>
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

export const Closeable = Template.bind({});
Closeable.args = {
  ...defaultArgs,
  closeable: true,
};

export const Fullwidth = Template.bind({});
Fullwidth.args = {
  ...defaultArgs,
  fullWidth: true,
  closeable: true,
};

export const BackgroundOnly = Template.bind({});
BackgroundOnly.args = {
  ...defaultArgs,
  backgroundOnly: 'true',
};
