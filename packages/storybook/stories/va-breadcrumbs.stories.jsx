import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { category, level } from './maturity-scale';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');

export default {
  title: 'Components/va-breadcrumbs',
  parameters: {
    componentSubtitle: 'Breadcrumbs web component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            ...breadcrumbsDocs,
            guidance: {
              componentHref: 'breadcrumbs',
              componentName: 'Breadcrumbs',
            },
            maturity: {
              category: category.USE,
              level: level.DEPLOYED,
            },
          }}
        />
      ),
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

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(breadcrumbsDocs);
