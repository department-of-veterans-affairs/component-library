import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { screen } from "shadow-dom-testing-library"
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';
import { VaOmbInfo } from '@department-of-veterans-affairs/web-components/react-bindings';

const ombInfoDocs = getWebComponentDocs('va-omb-info');

const meta: Meta<typeof VaOmbInfo> = {
  component: VaOmbInfo,
  title: 'Interaction Tests/OMB info',
  id: 'interaction-tests/va-omb-info',
  parameters: {
    componentSubtitle: 'va-omb-info web component interaction tests',
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

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const ombInfo = await canvas.findByTestId('va-omb-info');

    await expect(ombInfo).toBeInTheDocument();

    const button = await screen.findByShadowRole('button');
    await expect(button).toBeInTheDocument();

    // Open the modal
    await userEvent.click(button);

    const modal = await screen.findByShadowRole('dialog');
    await expect(modal).toBeInTheDocument();
    await expect(modal).toBeVisible();

    // Close the modal
    const closeButton = await screen.findByShadowLabelText('Close Privacy Act Statement modal');
    await expect(closeButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await expect(modal).not.toHaveAttribute('visible');
  },
}