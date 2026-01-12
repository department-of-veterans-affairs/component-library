import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within, findByTestId } from 'storybook/test';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaOmbInfo } from '@department-of-veterans-affairs/web-components/react-bindings';

const ombInfoDocs = getWebComponentDocs('va-omb-info');

const meta: Meta<typeof VaOmbInfo> = {
  component: VaOmbInfo,
  title: 'Components/OMB info',
  id: 'components/va-omb-info',
  parameters: {
    componentSubtitle: 'va-omb-info web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={ombInfoDocs} />,
    },
  },
  argTypes: propStructure(ombInfoDocs),
} satisfies Meta<typeof VaOmbInfo>;

export default meta;

type Story = StoryObj<typeof VaOmbInfo>;

const defaultArgs = {
  'benefitType': undefined,
  'expDate': '12/31/2077',
  'ombNumber': '12-3456',
  'resBurden': 120,
  'formId': undefined,
};

// export default {
//   title: 'Components/OMB info',
//   id: 'components/va-omb-info',
//   parameters: {
//     componentSubtitle: 'va-omb-info web component',
//     docs: {
//       page: () => <StoryDocs storyDefault={Default} data={ombInfoDocs} />,
//     },
//   },
//   args: defaultArgs,
//   argTypes: propStructure(ombInfoDocs),
// };

export const Test: Story = {
  args: {
    ...defaultArgs,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ombInfo = await canvas.findByTestId('va-omb-info');

    // Verify that the privacy act statement is visible
    expect(ombInfo).toBeInTheDocument();

    const vaButton = ombInfo.shadowRoot.querySelector('va-button');
    expect(vaButton).toBeInTheDocument();

    const button = vaButton.shadowRoot.querySelector('button');
    expect(button).toBeInTheDocument();

    // Open the modal
    await userEvent.click(button);

    const modal = ombInfo.shadowRoot.querySelector('va-modal');
    expect(modal).toBeInTheDocument();
    await expect(modal).toBeVisible();
  },
}

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
