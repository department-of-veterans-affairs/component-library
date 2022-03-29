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
  // argTypes: {
  //   method: {
  //     control: {
  //       type: 'select',
  //       options: ['GET', 'POST', 'dialog'],
  //     },
  //   },
  // },
};

const Template = ({ action, label }) => (
  <va-search
    action={action}
    label={label}
    // method={method}
    onBlur={() => console.log('BLUR')}
    onChange={() => console.log('CHANGE')}
    onClick={() => console.log('CLICK')}
    onKeyDown={() => console.log('KEYDOWN')}
  />
);

const defaultArgs = {
  action: undefined,
  label: 'Search',
  // method: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  // method: 'GET',
};
Default.argTypes = propStructure(searchDocs);
