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

const Template = ({}) => (
  <va-sidenav>
    <va-sidenav-item href="#" label="Parent item"></va-sidenav-item>
    <va-sidenav-item href="#" label="Current page" is-current-page={true}>
      <va-sidenav-submenu>
        <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
        <va-sidenav-item href="#" label="Child item with children">
          <va-sidenav-submenu>
            <va-sidenav-item href="#" label="Grandchild item" is-current-page={true}></va-sidenav-item>
            <va-sidenav-item href="#" label="Grandchild item"></va-sidenav-item>
          </va-sidenav-submenu>
        </va-sidenav-item>
      </va-sidenav-submenu>
    </va-sidenav-item>
    <va-sidenav-item href="#" label="Another parent item"></va-sidenav-item>
  </va-sidenav>
);

export const Default = Template.bind(null);
Default.argTypes = propStructure(sidenavDocs);
