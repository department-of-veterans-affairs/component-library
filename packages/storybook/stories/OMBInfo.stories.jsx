import React from 'react';
import OMBInfo from '../../react-components/src/components/OMBInfo/OMBInfo';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/OMBInfo',
  component: OMBInfo,
  parameters: {
    componentSubtitle: 'OMB info component',
    docs: {
      page: () => (
        <StoryDocs
          data={{
            componentName: 'OMBInfo',
          }}
        />
      ),
    },
  },
};

const Template = args => <OMBInfo {...args} />;

const defaultArgs = {
  resBurden: 120,
  ombNumber: '12-3456',
  expDate: '12/31/2077',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const WithoutOMBNumber = Template.bind({});
WithoutOMBNumber.args = { ...defaultArgs, ombNumber: '' };

export const WithoutResponseBurden = Template.bind({});
WithoutResponseBurden.args = { ...defaultArgs, resBurden: undefined };

export const WithCustomRespondentBurdenBenefitType = Template.bind({});
WithCustomRespondentBurdenBenefitType.args = {
  ...defaultArgs,
  resBurden: 90,
  benefitType: 'EXAMPLE BENEFITS',
};
