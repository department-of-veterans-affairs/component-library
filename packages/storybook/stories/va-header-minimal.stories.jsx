import React from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  componentStructure,
} from './wc-helpers';

const minimalHeaderDocs = getWebComponentDocs('va-header-minimal');

export default {
  title: 'V1 Components/Header - Minimal',
  id: 'components/va-header-minimal',
  parameters: {
    componentSubtitle: `va-header-minimal web component`,
    docs: {
      page: () => <StoryDocs data={minimalHeaderDocs} />,
    },
  },
};

const defaultArgs = {
  header: 'Authorization To Disclose Personal Information To A Third Party',
  subheader: '',
};
const Template = ({ header, subheader }) => {
  return <va-header-minimal header={header} subheader={subheader} />;
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(minimalHeaderDocs);

export const withSubheader = Template.bind(null);
withSubheader.args = {
  ...defaultArgs,
  subheader: '(VA Form 21-0845)',
};
