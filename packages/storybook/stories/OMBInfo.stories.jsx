import React from 'react';
import OMBInfo from '../../react-components/src/components/OMBInfo/OMBInfo';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/OMBInfo',
  component: OMBInfo,
  parameters: {
    componentSubtitle: 'OMB info React component',
    docs: {
      page: () => <StoryDocs componentName="OMBInfo" />,
    },
  },
};

const Template = args => <OMBInfo {...args} />;

const defaultArgs = {
  resBurden: 120,
  ombNumber: '12-3456',
  expDate: '12/31/2077',
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

export const WithoutOMBNumber = Template.bind(null);
WithoutOMBNumber.args = { ...defaultArgs, ombNumber: '' };

export const WithoutResponseBurden = Template.bind(null);
WithoutResponseBurden.args = { ...defaultArgs, resBurden: undefined };

export const WithCustomRespondentBurdenBenefitType = Template.bind(null);
WithCustomRespondentBurdenBenefitType.args = {
  ...defaultArgs,
  resBurden: 90,
  benefitType: 'EXAMPLE BENEFITS',
};
