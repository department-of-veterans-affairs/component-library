import { html } from 'lit-html';

export default {
  title: 'Components/Table',
  component: 'va-table',
};

const defaultArgs = {
  title: 'My table',
  col1: 'Document title',
  col2: 'Description',
  col3: 'Year',
  data: [
    [
      'Declaration of Independence',
      'Statement adopted by the Continental Congress declaring independence from the British Empire',
      '1776',
    ],
    [
      'Bill of Rights',
      'The first ten ammendements of the U.S. Constitution guaranteeing rights and freedoms',
      '1791',
    ],
    [
      'Declaration of Sentiments',
      'A document written during the Seneca Falls Convention outlining the rights that American women should be entitled to as citizens.',
      '1848',
    ],
    [
      'Emancipation Proclamation',
      'An executive order granting freedom to slaves in designated southern states.',
      '1863',
    ],
  ],
};

const Template = ({ col1, col2, col3, data, title }) => html`
  <va-table title="${title}" col-1="${col1}" col-2="${col2}" col-3="${col3}">
  </va-table>
  <script>
    console.log(document.querySelectorAll('va-table'));
    const todoListElement = document.querySelector('va-table');
    todoListElement.data = ${JSON.stringify(data)};
  </script>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };
