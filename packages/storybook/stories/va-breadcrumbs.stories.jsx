import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');
const componentName = 'Breadcrumbs';

export default {
  title: `Components/${componentName}`,
  parameters: {
    componentSubtitle: 'va-breadcrumbs',
    docs: {
      page: () => <StoryDocs componentName={componentName} data={breadcrumbsDocs} />,
    },
  },
};

const Template = ({ label, 'disable-analytics': disableAnalytics }) => (
  <va-breadcrumbs label={label} disable-analytics={disableAnalytics}>
    <a href="#home">Home</a>
    <a href="#one">Level one</a>
    <a href="#two">Level two</a>
  </va-breadcrumbs>
);

const defaultArgs = {
  'label': 'Breadcrumb',
  'disable-analytics': false,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(breadcrumbsDocs);
