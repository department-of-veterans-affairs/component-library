import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const searchDocs = getWebComponentDocs('va-search');

export default {
  title: 'Components/va-search',
};

const Template = () => <va-search />;

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(searchDocs);
