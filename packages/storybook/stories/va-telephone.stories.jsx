import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

export default {
  title: 'Components/va-telephone',
};

const Template = ({ contact, extension, international }) => {
  return (
    <va-telephone
      contact={contact}
      extension={extension}
      international={international}
    ></va-telephone>
  );
};

const defaultArgs = {
  contact: '8773459876',
  extension: 123,
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

export const International = Template.bind({});
International.args = {
  ...defaultArgs,
  international: true,
};
