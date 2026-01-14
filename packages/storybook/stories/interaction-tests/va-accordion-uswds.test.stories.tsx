import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, within } from 'storybook/test';
import { screen } from "shadow-dom-testing-library"
import { getWebComponentDocs, propStructure, StoryDocs, propDefaults, getDefaultPropValue } from '../wc-helpers';
import { VaAccordion, VaAccordionItem } from '@department-of-veterans-affairs/web-components/react-bindings';

const accordionDocs = getWebComponentDocs('va-accordion');
const accordionItemDocs = getWebComponentDocs('va-accordion-item');
const defaultItemValues = {
  open: getDefaultPropValue('va-accordion-item', 'open'),
  subheader: getDefaultPropValue('va-accordion-item', 'subheader')
};

const items = [
  {
    ...defaultItemValues,
    id: 'first',
    header: 'First Amendment',
    body: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    ...defaultItemValues,
    id: 'second',
    header: 'Second Amendment',
    body: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    ...defaultItemValues,
    id: 'third',
    header: 'Third Amendment',
    body: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
  },
];

const itemsJsx = items.map(({ id, header, body, ...props }) => (
  <VaAccordionItem key={id} id={id} header={header} {...props}>
    <p>{body}</p>
  </VaAccordionItem>
));

const clickExpandAllOrCollapseAndCheckForOpen = async (button: HTMLElement, status: string) => {
  await userEvent.click(button);
  const accordionItems = await screen.findAllByTestId('va-accordion-item');

  let i = 0;
  for (const item of items) {
    if (status === 'open') {
      await expect(accordionItems[i]).toHaveAttribute('open');
      await expect(accordionItems[i]).not.toHaveAttribute('open', 'false');
    }
    else {
      await expect(accordionItems[i]).toHaveAttribute('open', 'false');
    }
    
    const accordionItem = await screen.findByShadowText(item.header);
    await expect(accordionItem).toBeInTheDocument();
    i++;
  }
}

const meta: Meta<typeof VaAccordion> = {
  component: VaAccordion,
  title: 'Interaction Tests/Accordion',
  id: 'interaction-tests/va-accordion',
  parameters: {
    componentSubtitle: 'va-accordion web component interaction tests',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={accordionDocs} />,
    },
  },
  argTypes: {
    ...propStructure(accordionDocs),
    ...propStructure(accordionItemDocs, 'va-accordion-item'),
    children: {
      table: { disable: true },
    }
  },
  args: {
    ...propDefaults(getWebComponentDocs('va-accordion')),
    children: itemsJsx,
  }
} satisfies Meta<typeof VaAccordion>;

export default meta;

type Story = StoryObj<typeof VaAccordion>;

export const Default: Story = {
  async play({ canvasElement }) {
    // Set lang to 'en' to avoid any i18n issues
    document.querySelector('main')?.setAttribute('lang', 'en');

    const canvas = within(canvasElement);

    const vaAccordion = await canvas.findByTestId('va-accordion');
    await expect(vaAccordion).toBeInTheDocument();

    const expandButton = await screen.findByShadowTestId('expand-all-accordions');
    const collapseButton = await screen.findByShadowTestId('collapse-all-accordions');

    await expect(expandButton).toBeInTheDocument();
    await expect(expandButton).toHaveTextContent('Expand all');
    await expect(expandButton).toHaveAttribute('aria-label', 'Expand all accordions');

    await expect(collapseButton).toBeInTheDocument();
    await expect(collapseButton).toHaveTextContent('Collapse all');
    await expect(collapseButton).toHaveAttribute('aria-label', 'Collapse all accordions');
    await clickExpandAllOrCollapseAndCheckForOpen(expandButton, 'open');
    await clickExpandAllOrCollapseAndCheckForOpen(collapseButton, 'closed');
  }
};

export const InternationalizationEspanol: Story = {
  async play({ canvasElement }) {
    // Set lang to 'es' to test Spanish internationalization
    document.querySelector('main')?.setAttribute('lang', 'es');

    const canvas = within(canvasElement);

    const vaAccordion = await canvas.findByTestId('va-accordion');
    await expect(vaAccordion).toBeInTheDocument();

    const expandButton = await screen.findByShadowTestId('expand-all-accordions');
    const collapseButton = await screen.findByShadowTestId('collapse-all-accordions');

    await expect(expandButton).toBeInTheDocument();
    await expect(expandButton).toHaveTextContent('Expandir todo');
    await expect(expandButton).toHaveAttribute('aria-label', 'Expandir todos los acordeones');

    await expect(collapseButton).toBeInTheDocument();
    await expect(collapseButton).toHaveTextContent('Contraer todo');
    await expect(collapseButton).toHaveAttribute('aria-label', 'Contraer todos los acordeones');
    await clickExpandAllOrCollapseAndCheckForOpen(expandButton, 'open');
    await clickExpandAllOrCollapseAndCheckForOpen(collapseButton, 'closed');
  }
};

export const InternationalizationTagalog: Story = {
  async play({ canvasElement }) {
    // Set lang to 'tl' to test Tagalog internationalization
    document.querySelector('main')?.setAttribute('lang', 'tl');

    const canvas = within(canvasElement);

    const vaAccordion = await canvas.findByTestId('va-accordion');
    await expect(vaAccordion).toBeInTheDocument();

    const expandButton = await screen.findByShadowTestId('expand-all-accordions');
    const collapseButton = await screen.findByShadowTestId('collapse-all-accordions');

    await expect(expandButton).toBeInTheDocument();
    await expect(expandButton).toHaveTextContent('I-expand lahat');
    await expect(expandButton).toHaveAttribute('aria-label', 'I-expand ang lahat ng accordion');

    await expect(collapseButton).toBeInTheDocument();
    await expect(collapseButton).toHaveTextContent('I-collapse ang lahat');
    await expect(collapseButton).toHaveAttribute('aria-label', 'I-collapse ang lahat ng accordion');
    await clickExpandAllOrCollapseAndCheckForOpen(expandButton, 'open');
    await clickExpandAllOrCollapseAndCheckForOpen(collapseButton, 'closed');
  }
};