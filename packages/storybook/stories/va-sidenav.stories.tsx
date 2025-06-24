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
    <va-sidenav-item href="#" label="Parent item with current page" is-current-page={true}></va-sidenav-item>
    <va-sidenav-item href="#" label="Parent item"></va-sidenav-item>
    <va-sidenav-item href="#" label="Parent item with a very long label for a sidenav item to see how it reflows when it is very long or if we zoom in"></va-sidenav-item>
    <va-sidenav-submenu label="Parent item for submenu (non-accordion)">
        <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
        <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
    </va-sidenav-submenu>
    <va-sidenav-accordion label="Parent item for submenu (accordion)">
      <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
      <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
      <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
      <va-sidenav-item href="#" label="Child item"></va-sidenav-item>
    </va-sidenav-accordion>
  </va-sidenav>
);

export const Default = Template.bind(null);
Default.argTypes = propStructure(sidenavDocs);