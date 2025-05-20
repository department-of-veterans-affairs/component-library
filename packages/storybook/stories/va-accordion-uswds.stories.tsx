import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-accordion');
const accordionItem = getWebComponentDocs('va-accordion-item');

const defaultValues = {
  open: false,
  subheader: '',
}

const defaultArgs = {
  accordionItems: {
    accordion1: {
      ...defaultValues,
      id: 'first',
      header: 'First Amendment',
      body: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
    },
    accordion2: {
      ...defaultValues,
      id: 'second',
      header: 'Second Amendment',
      body: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
    },
    accordion3: {
      ...defaultValues,
      id: 'third',
      header: 'Third Amendment',
      body: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
    },
  },
};

export default {
  title: 'Components/Accordion USWDS',
  id: 'uswds/va-accordion',
  subcomponents: componentStructure(accordionItem),
  parameters: {
    componentSubtitle: 'va-accordion web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={accordionDocs} />,
    },
  },
  args: {
    ...defaultArgs,
    accordionItemHeadingLevel: 3,
    accordionItemHeadlineSlot: false,
    accordionItemIconSlot: false,
    accordionItemBorder: false,
  },
  argTypes: {
    ...propStructure(accordionDocs),
    accordionItems: {
      name: 'Accordion items - content',
      control: { type: 'object' },
    },
    accordionItemBorder: {
      name: 'Accordion items - border',
    },
    accordionItemHeadlineSlot: {
      name: 'Accordion items - add headline slot',
    },
    accordionItemIconSlot: {
      name: 'Accordion items - add icon slot',
    },
    accordionItemHeadingLevel: {
      name: 'Accordion items - heading level',
    },
  },

};

const Template = args => {
  const accordionItems = [args.accordionItems.accordion1, args.accordionItems.accordion2, args.accordionItems.accordion3];
  return (
    <va-accordion
      open-single={'open-single'}
    >
      {accordionItems.map(accordion => (
        <va-accordion-item
          id={accordion.id}
          header={args.accordionItemHeadlineSlot ? undefined : accordion.header}
          bordered={args.accordionItemBorder}
          subheader={accordion.subheader ? accordion.subheader : undefined}
          level={args.accordionItemHeadingLevel}
          open={accordion.open}
        >
          {args.accordionItemHeadlineSlot && (
            <h3 slot="headline">Slotted {accordion.header}</h3>
          )}
          {args.accordionItemIconSlot && (
            <span slot="icon" className="vads-u-color--green">
              <va-icon icon="info" />
            </span>
          )}

          <p>{accordion.body}</p>
        </va-accordion-item>
      ))}
    </va-accordion>
  );
};

export const Default = Template.bind(null);

export const SingleSelect = Template.bind(null);
SingleSelect.args = {
  ...defaultArgs,
  'open-single': true,
};

export const Bordered = Template.bind(null);
Bordered.args = {
  accordionItemBorder: true,
};

const subheaderText = 'Subheader text';
export const Subheader = Template.bind(null);
Subheader.args = {
  ...defaultArgs,
  accordionItems: {
    accordion1: {
      ...defaultArgs.accordionItems.accordion1,
      subheader: subheaderText,
    },
    accordion2: {
      ...defaultArgs.accordionItems.accordion2,
      subheader: subheaderText,
    },
    accordion3: {
      ...defaultArgs.accordionItems.accordion3,
      subheader: subheaderText,
    },
  }
};

export const IconHeaders = Template.bind(null);
IconHeaders.args = {
  ...defaultArgs,
  accordionItemIconSlot: true,
};

export const HeadlineSlot = Template.bind(null);
HeadlineSlot.args = {
  ...defaultArgs,
  accordionItemHeadlineSlot: true,
};

export const Level = Template.bind(null);
Level.args = {
  ...defaultArgs,
  accordionItemHeadingLevel: 4,
};

const PrintTemplate = args => (
  <va-accordion {...args}>
    <va-accordion-item id="first" header="First Item">
      <p>
        This story is for the Design System Team to be able to test the
        accordion items being opened when the page they're on is being printed.
      </p>
    </va-accordion-item>
    <va-accordion-item id="second" header="Second Item">
      <p>Accordion items will always open when being printed.</p>
    </va-accordion-item>
  </va-accordion>
);

// todo: after upgrading to storybook 8 we can hide this story from the sidebar: https://storybook.js.org/docs/writing-stories/tags
export const PrintAccordion = PrintTemplate.bind(null);
PrintAccordion.args = {
  ...defaultArgs,
};
PrintAccordion.parameters = {
  chromatic: {
    media: 'print',
  },
};
