import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const sidenavDocs = getWebComponentDocs('va-sidenav');

export default {
  title: 'Components/Side Navigation',
  id: 'components/va-sidenav',
  parameters: {
    componentSubtitle: 'va-sidenav web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={sidenavDocs} />,
    },
  },
};

const Template = () => { 

  return (
    <va-sidenav header="Profile" icon-name="account_circle" icon-background-color="vads-color-primary">
      <va-sidenav-item href="#" label="Personal information"></va-sidenav-item>
      <va-sidenav-item href="#" label="Contact information"></va-sidenav-item>
      <va-sidenav-item href="#" label="Personal health care contacts"></va-sidenav-item>
      <va-sidenav-item href="#" label="Military service"></va-sidenav-item>
      <va-sidenav-item href="#" label="Direct deposit information"></va-sidenav-item>
      <va-sidenav-submenu label="Communication settings">
        <va-sidenav-item href="#" label="Notification settings"></va-sidenav-item>
        <va-sidenav-item current-page={true} href="#" label="Paperless delivery"></va-sidenav-item>
      </va-sidenav-submenu>
      <va-sidenav-item href="#" label="Account security"></va-sidenav-item>
      <va-sidenav-item href="#" label="Connected apps"></va-sidenav-item>
    </va-sidenav>
  )
};

export const Default = Template.bind(null);
Default.argTypes = propStructure(sidenavDocs);
