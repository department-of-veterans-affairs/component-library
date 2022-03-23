import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

const searchDocs = getWebComponentDocs('va-search');

export default {
  title: 'Components/va-search',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(searchDocs),
      },
    },
  },
  argTypes: {
    method: {
      control: {
        type: 'select',
        options: ['GET', 'POST', 'dialog'],
      },
    },
  },
};

const Template = ({ action, label, method, submit }) => (
  <va-search action={action} label={label} method={method} onsubmit={submit} />
);

const defaultArgs = {
  action: undefined,
  label: 'Search',
  method: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  method: 'GET',
  // not working
  submit: e => {
    e.preventDefault();
    console.log(e);
  },
};
Default.argTypes = propStructure(searchDocs);
