/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const featuredContentDocs = getWebComponentDocs('va-featured-content');

export default {
  title: 'Components/va-featured-content',
  parameters: {
    docs: {
      page: () => <StoryDocs data={featuredContentDocs} />,
    },
    componentSubtitle: `Featured content web component`,
  },
};

const Template = () => (
  <va-featured-content>
    <h3 slot="headline">
      If I'm a Veteran, can I get VR&E benefits and services?
    </h3>
    <p>
      You may be eligible for VR&amp;E benefits and services if you're a
      Veteran, and you meet all of the requirements listed below.
    </p>
    <p>
      <strong>All of these must be true. You:</strong>
    </p>
    <ul>
      <li>
        Didn't receive a dishonorable discharge, <strong>and</strong>
      </li>
      <li>
        Have a service-connected disability rating of at least 10% from VA,
        <strong> and</strong>
      </li>
      <li>
        <a href="#">Apply for VR&amp;E services</a>
      </li>
    </ul>
  </va-featured-content>
);

export const Default = Template.bind({});
Default.argTypes = propStructure(featuredContentDocs);
