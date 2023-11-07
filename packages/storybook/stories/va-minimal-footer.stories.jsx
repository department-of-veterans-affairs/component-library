import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const minimalFooterDocs = getWebComponentDocs('va-minimal-footer');

export default {
  title: 'Components/Minimal Footer',
  id: 'components/va-minimal-footer',
  parameters: {
    componentSubtitle: `va-minimal-footer web component`,
    docs: {
      page: () => <StoryDocs data={minimalFooterDocs} />,
    },
  },
};

const defaultArgs = {};

const Template = ({ }) => {
  return (
    <va-minimal-footer />
  );
};

export const Default = Template.bind(null);
Default.argTypes = propStructure(minimalFooterDocs);
