/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const additionalInfoDocs = getWebComponentDocs('va-additional-info');

export default {
  title: 'Components/va-additional-info',
  parameters: {
    actions: {
      handles: ['component-library-analytics'],
    },
  },
};

const defaultArgs = {
  trigger: 'Additional Information',
};

const Template = ({ trigger }) => {
  return (
    <va-additional-info trigger={trigger}>
      <div>Here are some popular pets to consider</div>
      <ul>
        <li>Dogs</li>
        <li>Cats</li>
        <li>Fish</li>
        <li>Birds</li>
      </ul>
    </va-additional-info>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(additionalInfoDocs);
