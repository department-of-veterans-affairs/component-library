import { html } from 'lit-html';

export default {
  title: 'Components/Table',
  component: 'va-table',
};

const defaultArgs = {
  columns: [
    { label: 'one', value: 'one' },
    { label: 'two', value: 'two' },
  ],
  data: [
    {
      one: 'hello darkness',
      two: 'my old friend',
    },
  ],
};

const Template = ({ columns, data }) => html`
  <va-table> </va-table>
  <script>
    console.log(document.querySelectorAll('va-table'));
    const todoListElement = document.querySelector('va-table');
    todoListElement.columns = ${JSON.stringify(columns)};
    todoListElement.data = ${JSON.stringify(data)};
  </script>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };
