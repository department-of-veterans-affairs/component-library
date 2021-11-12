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
  trigger: 'Show more',
};

const Template = ({ trigger }) => {
  return (
    <va-additional-info trigger={trigger}>
      <ul>
        <li>Part 1</li>
        <li>Part 1</li>
        <li>Part 1</li>
        <li>Part 1</li>
      </ul>
    </va-additional-info>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(additionalInfoDocs);
