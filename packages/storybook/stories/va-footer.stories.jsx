import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const footerDocs = getWebComponentDocs('va-footer');

export default {
  title: 'Components/Footer',
  id: 'components/va-footer',
  parameters: {
    componentSubtitle: `va-footer web component`,
    docs: {
      page: () => <StoryDocs data={footerDocs} />,
    },
  },
};

// const defaultArgs = {};

const Template = ({}) => {
  return (
    <va-footer />
  );
};

export const Default = Template.bind(null);
// Default.args = {};
Default.argTypes = propStructure(footerDocs);
