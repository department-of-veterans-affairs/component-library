import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const ombInfoDocs = getWebComponentDocs('va-omb-info');

const defaultArgs = {
  'benefit-type': undefined,
  'exp-date': '12/31/2077',
  'omb-number': '12-3456',
  'res-burden': 120,
  'form-id': undefined,
};

export default {
  title: 'Components/OMB info',
  id: 'components/va-omb-info',
  parameters: {
    componentSubtitle: 'va-omb-info web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={ombInfoDocs} />,
    },
  },
  args: defaultArgs,
  argTypes: propStructure(ombInfoDocs),
};


const Template = ({
  'benefit-type': benefitType,
  'exp-date': expDate,
  'omb-number': ombNumber,
  'res-burden': resBurden,
  'form-id': formId,
}) => {
  return (
    // @ts-ignore ignoring the hyphenated prop names
    <va-omb-info
      benefit-type={benefitType}
      exp-date={expDate}
      omb-number={ombNumber}
      res-burden={resBurden}
      form-id={formId ? formId : undefined}
    />
  );
};

export const Default = Template.bind(null);

export const WithFormId = Template.bind(null);
WithFormId.args = {
  ...defaultArgs,
  'form-id': '34-5678',
};

export const WithoutOMBNumber = Template.bind(null);
WithoutOMBNumber.args = {
  ...defaultArgs,
  'omb-number': undefined,
};

export const WithoutResponseBurden = Template.bind(null);
WithoutResponseBurden.args = {
  ...defaultArgs,
  'res-burden': undefined,
};

export const WithCustomRespondentBurdenBenefitType = Template.bind(null);
WithCustomRespondentBurdenBenefitType.args = {
  ...defaultArgs,
  'benefit-type': 'EXAMPLE BENEFITS',
  'res-burden': 90,
};

const SlotTemplate = ({
  'benefit-type': benefitType,
  'exp-date': expDate,
  'omb-number': ombNumber,
  'res-burden': resBurden,
  'form-id': formId,
}) => {
  return (
    // @ts-ignore ignoring the hyphenated prop names
    <va-omb-info
      benefit-type={benefitType}
      exp-date={expDate}
      omb-number={ombNumber}
      res-burden={resBurden}
      form-id={formId ? formId : undefined}
    >
      Passing children content will override the default privacy act statement
    </va-omb-info>
  );
};

export const Children = SlotTemplate.bind(null);
Children.args = {
  ...defaultArgs,
  'benefit-type': undefined,
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
Children.parameters = {
  chromatic: { disableSnapshot: true },
};