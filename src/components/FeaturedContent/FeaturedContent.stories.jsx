import React from 'react';
import FeaturedContent from './FeaturedContent';

export default {
  title: 'Components/FeaturedContent',
  component: FeaturedContent,
};

const args = {
  headingLevel: 3,
  headingText: "If I'm a Veteran, can I get VR&amp;E benefits and services?",
};

export const Default = () => {
  return (
    <FeaturedContent {...args}>
      <p>
        You may be eligible for VR&E benefits and services if you’re a Veteran,
        and you meet all of the requirements listed below.
      </p>
      <p>
        <strong>All of these must be true. You:</strong>
      </p>
      <ul>
        <li>
          Didn’t receive a dishonorable discharge, <strong>and</strong>
        </li>
        <li>
          Have a service-connected disability rating of at least 10% from VA,
          <strong>and</strong>
        </li>
        <li>
          <a href="#">Apply for VR&amp;E services</a>
        </li>
      </ul>
    </FeaturedContent>
  );
};
