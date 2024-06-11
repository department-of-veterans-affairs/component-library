import React from 'react';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Address block',
  id: 'components/Address block',
  parameters: {
    componentSubtitle: 'Address block component class',
    docs: {
      page: () => <StoryDocs storyDefault={Default} componentName="Address block" />,
    },
  },
};


const Template = ({
}) => (
  <p className="va-address-block">
    Department of Veterans Affairs Claims Intake Center <br />
    Attention: C-123 Claims
    <br />
    PO Box 5088
    <br />
    Janesville, WI 53547-5088
    <br />
  </p>
);

export const Default = Template.bind(null);