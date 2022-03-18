import React from 'react';
import { VaSearch } from '@department-of-veterans-affairs/web-components/react-bindings';
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
};

VaSearch.displayName = 'VaSearch';

const Template = ({ action, label, method, submitEvent }) => (
  <VaSearch
    action={action}
    label={label}
    method={method}
    onSubmitEvent={submitEvent}
  />
);

const defaultArgs = {
  action: undefined,
  label: 'Search',
  method: undefined,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  submitEvent: e => console.log(e),
};
Default.argTypes = propStructure(searchDocs);
