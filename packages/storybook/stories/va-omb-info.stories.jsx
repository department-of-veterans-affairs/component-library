import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const ombInfoDocs = getWebComponentDocs('va-omb-info');

export default {
  title: 'Components/OMB info',
  id: 'components/va-omb-info',
  parameters: {
    componentSubtitle: `va-omb-info web component`,
    docs: {
      page: () => <StoryDocs data={ombInfoDocs} />,
    },
  },
};

const defaultArgs = {
  'benefit-type': undefined,
  'exp-date': undefined,
  'omb-number': undefined,
  'res-burden': undefined,
};

const Template = ({
  'benefit-type': benefitType,
  'exp-date': expDate,
  'omb-number': ombNumber,
  'res-burden': resBurden,
}) => {
  return (
    <va-omb-info
      benefit-type={benefitType}
      exp-date={expDate}
      omb-number={ombNumber}
      res-burden={resBurden}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  'benefit-type': undefined,
  'exp-date': '12/31/2077',
  'omb-number': '12-3456',
  'res-burden': 120,
};
Default.argTypes = propStructure(ombInfoDocs);

export const WithoutOMBNumber = Template.bind(null);
WithoutOMBNumber.args = {
  ...defaultArgs,
  'exp-date': '12/31/2077',
  'res-burden': 120,
};

export const WithoutResponseBurden = Template.bind(null);
WithoutResponseBurden.args = {
  ...defaultArgs,
  'exp-date': '12/31/2077',
  'omb-number': '12-3456',
};

export const WithCustomRespondentBurdenBenefitType = Template.bind(null);
WithCustomRespondentBurdenBenefitType.args = {
  ...defaultArgs,
  'benefit-type': 'EXAMPLE BENEFITS',
  'exp-date': '12/31/2077',
  'omb-number': '12-3456',
  'res-burden': 90,
};

const SlotTemplate = ({
  'benefit-type': benefitType,
  'exp-date': expDate,
  'omb-number': ombNumber,
  'res-burden': resBurden,
}) => {
  return (
    <va-omb-info
      benefit-type={benefitType}
      exp-date={expDate}
      omb-number={ombNumber}
      res-burden={resBurden}
    >
      Passing children content will override the default privacy act statement
    </va-omb-info>
  );
};

export const Children = SlotTemplate.bind(null);
Children.args = {
  ...defaultArgs,
  'benefit-type': undefined,
  'exp-date': '12/31/2077',
  'omb-number': '12-3456',
  'res-burden': 120,
};
