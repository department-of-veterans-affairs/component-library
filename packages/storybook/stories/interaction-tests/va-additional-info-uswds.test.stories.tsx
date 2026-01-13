import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
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

    expect(component).toBeInTheDocument();

    const trigger = component.shadowRoot.querySelector('a[role="button"]');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Additional Information');

    // Open the additional info via trigger click
    await userEvent.click(trigger);

    // Ensure that the slotted content is present
    const slot = component.shadowRoot.querySelector('slot');
    expect(slot).toBeInTheDocument();
    const assignedNodes = slot.assignedNodes();
    expect(assignedNodes[0].textContent).toBe('Here are some popular pets to consider');
    const slottedList = assignedNodes[1] as HTMLElement;
    expect(slottedList).toBeDefined();
    expect(slottedList.nodeName).toBe('UL');

    // Verify that the border is not present
    const info = component.shadowRoot.querySelector('#info');
    expect(info).toBeInTheDocument();
    const infoStyles = getComputedStyle(info);
    expect(infoStyles.borderLeftStyle).toBe('none');

  }
};