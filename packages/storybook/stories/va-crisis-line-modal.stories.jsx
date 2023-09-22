import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const crisisLineModalDocs = getWebComponentDocs('va-crisis-line-modal');

export default {
  title: `Components/Crisis Line Modal`,
  id: 'components/va-crisis-line-modal',
  parameters: {
    componentSubtitle: 'va-crisis-line-modal web component',
    docs: {
      page: () => <StoryDocs data={crisisLineModalDocs} />,
    },
  },
};

const Template = () => {
  return (
    <>
      <va-crisis-line-modal />
    </>
  );
};

const defaultArgs = {};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(crisisLineModalDocs);
