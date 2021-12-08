import React from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const breadcrumbsDocs = getWebComponentDocs('va-breadcrumbs');

export default {
  title: 'Components/va-breadcrumbs',
};

const Template = ({
  label,
  'disable-analytics': disableAnalytics,
  'list-id': listId,
  'mobile-first-prop': mobileFirstProp,
  'nav-id': navId,
}) => (
  <va-breadcrumbs
    label={label}
    disable-analytics={disableAnalytics}
    list-id={listId}
    mobile-first-prop={mobileFirstProp}
    nav-id={navId}
  >
    <a href="#">Home</a>
    <a href="#">Level One</a>
    <a href="#">Level Two</a>
  </va-breadcrumbs>
);

const defaultArgs = {
  'label': 'Breadcrumb',
  'disable-analytics': false,
  'list-id': 'breadcrumbs-list-id',
  'mobile-first-prop': false,
  'nav-id': 'breadcrumbs-nav-id',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(breadcrumbsDocs);

export const MobileFirst = Template.bind({});
MobileFirst.args = {
  ...defaultArgs,
  'mobile-first-prop': true,
};
