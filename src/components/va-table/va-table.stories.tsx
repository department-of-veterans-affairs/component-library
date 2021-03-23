import { html } from 'lit-html';

export default {
  title: 'Components/Table',
  component: 'va-table',
};

const defaultArgs = {
  data: [
    {
      title: 'Declaration of Independence',
      description:
        'Statement adopted by the Continental Congress declaring independence from the British Empire',
      year: '1776',
    },
    {
      title: 'Bill of Rights',
      description:
        'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
      year: '1791',
    },
    {
      title: 'Declaration of Sentiments',
      description:
        'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
      year: '1848',
    },
    {
      title: 'Emancipation Proclamation',
      description:
        'An executive order granting freedom to slaves in designated southern states.',
      year: '1863',
    },
  ],
  columns: [
    {
      label: 'Document title',
      value: 'title',
    },
    {
      label: 'Description',
      value: 'description',
    },
    {
      label: 'Year',
      value: 'year',
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
