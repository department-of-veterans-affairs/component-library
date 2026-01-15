import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { screen } from "shadow-dom-testing-library"
import { getWebComponentDocs, propStructure, StoryDocs } from '../wc-helpers';
import { VaAdditionalInfo } from '@department-of-veterans-affairs/web-components/react-bindings';

const additionalInfoDocs = getWebComponentDocs('va-additional-info');

const meta: Meta<typeof VaAdditionalInfo> = {
  component: VaAdditionalInfo,
  title: 'Interaction Tests/Additional Info',
  id: 'interaction-tests/va-additional-info',
  parameters: {
    componentSubtitle: 'va-additional-info web component interaction tests',
    docs: {
      page: () => <StoryDocs storyDefault={NoBorder} data={additionalInfoDocs} />,
    },
  },
  argTypes: propStructure(additionalInfoDocs),
} satisfies Meta<typeof VaAdditionalInfo>;

export default meta;

type Story = StoryObj<typeof VaAdditionalInfo>;

const defaultArgs = {
  'trigger': 'Additional Information',
  'disableBorder': false,
  'disableAnalytics': false,
  children: (
    <>
      <p>Here are some popular pets to consider</p>
      <ul data-testid="pets-list">
        <li>Dogs</li>
        <li>Cats</li>
        <li>Fish</li>
        <li>Birds</li>
      </ul>
    </>
  ),
};

export const NoBorder: Story = {
  args: {
    ...defaultArgs,
    disableBorder: true,
  },
  render: (args) => {
    return (
      <>
        <p>Surrounding content.</p>
        <VaAdditionalInfo
          trigger={args.trigger}
          disable-border={args.disableBorder}
          disable-analytics={args.disableAnalytics}
        >
          {args.children}
        </VaAdditionalInfo>
        <p>Surrounding content.</p>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const component = await canvas.findByTestId('va-additional-info');

    await expect(component).toBeInTheDocument();

    // Get trigger button and verify its presence and text
    const trigger = await screen.findByShadowRole('button');
    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveTextContent('Additional Information');

    // Open the additional info via trigger click
    await userEvent.click(trigger);

    // Ensure that the slotted content is present
    const slottedList = await screen.findByShadowTestId('pets-list');
    await expect(slottedList).toBeInTheDocument();
    await expect(slottedList.nodeName).toBe('UL');

    // Verify that the border is not present
    await expect(slottedList).toBeInTheDocument();
    const infoStyles = getComputedStyle(slottedList);
    await expect(infoStyles.borderLeftStyle).toBe('none');
  }
};