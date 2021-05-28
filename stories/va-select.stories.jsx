/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, StoryDocs, propStructure } from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/va-select',
  parameters: {
    docs: {
      /* eslint-disable-next-line react/display-name */
      page: () => <StoryDocs docs={selectDocs.docs} />,
    },
  },
};

const defaultArgs = {
  label: 'Branch of Service',
  value: 'army',
  required: false,
  options: [
    <option key="1" value="navy">
      Navy
    </option>,
    <option key="2" value="army">
      Army
    </option>,
    <option key="3" value="marines">
      Marines
    </option>,
    <option key="4" value="air-force">
      Air Force
    </option>,
    <option key="5" value="coastguard">
      Coastguard
    </option>,
  ],
};

const Template = ({ label, value, required, options }) => {
  return (
    <va-select label={label} value={value} required={required}>
      {options}
    </va-select>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);
