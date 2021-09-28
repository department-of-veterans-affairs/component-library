import { html } from 'lit-html';

export default {
  title: 'Components/My Component',
  component: 'my-component',
};

const args = {
  first: 'First',
  middle: 'Middle',
  last: 'Last',
};

const argTypes = {
  first: {
    description: 'The first name',
  },
  middle: {
    description: 'The middle name',
  },
  last: {
    description: 'The last name',
  },
};

const Template = ({ first, middle, last }) => html` <my-component first="${first}" middle="${middle}" last="${last}"> </my-component> `;

export const Default = Template.bind({});

Default.args = { ...args };
Default.argTypes = { ...argTypes };
