import { html } from 'lit-html';

export default {
  title: 'Components/Select',
  component: 'va-select',
};

const defaultArgs = {
  label: 'Branch of Service',
  name: 'branch',
  required: false,
  error: 'There was an error',
  value: 'cat',
};

const Template = ({ label, name, required, error, value }) => html`
  <div>
    <va-select
      label="${label}"
      required="${required}"
      name="${name}"
      value="${value}"
    >
      <option value="">--Please choose an option--</option>
      <option value="dog">Dog</option>
      <option value="cat">Cat</option>
    </va-select>
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
