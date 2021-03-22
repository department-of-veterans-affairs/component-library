import { html } from 'lit-html';

export default {
  title: 'Components/Table',
  component: 'va-table',
};

const defaultArgs = {
  columns: ['one', 'two'],
};

const Template = ({ columns }) => html`
  <va-table columns="${columns}">
    <div slot="head">
      <th>One</th>
      <th>Two</th>
    </div>
    <div slot="body">
      <span>test</span>
    </div>
  </va-table>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };
