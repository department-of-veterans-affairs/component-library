import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

export default {
  title: 'Components/va-telephone',
};

const Template = ({ contact }) => {
  return <va-telephone contact={contact}></va-telephone>;
};

const defaultArgs = {
  contact: '8773459876',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);
