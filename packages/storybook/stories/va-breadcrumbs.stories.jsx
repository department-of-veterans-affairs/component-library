import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');

export default {
  title: 'Components/va-breadcrumbs',
};

const Template = ({ label, 'disable-analytics': disableAnalytics }) => (
  <va-breadcrumbs label={label} disable-analytics={disableAnalytics}>
    <a href="#">Home</a>
    <a href="#">Level One</a>
    <a href="#">Level Two</a>
  </va-breadcrumbs>
);

const defaultArgs = {
  'label': 'Breadcrumb',
  'disable-analytics': false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(breadcrumbsDocs);
