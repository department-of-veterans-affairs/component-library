import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

export default {
  title: 'Components/va-telephone',
};

const Template = ({ contact, extension, inactive }) => {
  return (
    <va-telephone
      contact={contact}
      extension={extension}
      inactive={inactive}
    ></va-telephone>
  );
};

const defaultArgs = {
  contact: '8773459876',
  inactive: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = {
  ...defaultArgs,
  contact: '711',
  extension: 0,
};

export const Inactive = Template.bind({});
Inactive.args = {
  ...defaultArgs,
  inactive: true,
};
