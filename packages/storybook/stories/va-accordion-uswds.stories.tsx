import { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-accordion');

const defaultValues = {
  bordered: false,
  headerIconSlot: false,
  headlineSlot: false,
  level: undefined,
  open: false,
  subheader: '',
};

const accordionContent = [
  {
    ...defaultValues,
    id: 'first',
    header: 'First Amendment',
    body: 'Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.',
  },
  {
    ...defaultValues,
    id: 'second',
    header: 'Second Amendment',
    body: 'A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.',
  },
  {
    ...defaultValues,
    id: 'third',
    header: 'Third Amendment',
    body: 'No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.',
  },
];

export default {
  title: 'Components/Accordion USWDS',
  id: 'uswds/va-accordion',
  parameters: {
    componentSubtitle: 'va-accordion web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={accordionDocs} />,
    },
  },
  argTypes: {
    ...propStructure(accordionDocs),
    accordionItems: {
      name: 'Accordion items',
      description: 'Array of accordion items to be displayed',
      control: { type: 'object' },
      table: { category: 'Extras' },
    },
    i18n: {
      name: 'Internationalization',
      description: 'Adds buttons to change the language of the component',
      control: { type: 'boolean' },
      table: { category: 'Extras' },
    },
  },
  args: {
    accordionItems: accordionContent,
    i18n: false,
    'section-heading': undefined,
  },
};

const Template = args => {
  const [lang, setLang] = useState('en');
  useEffect(() => {
    document.querySelector('main')?.setAttribute('lang', lang);
  }, [lang]);

  return (
    <>
      {args.i18n && (
        <div>
          <va-button onClick={e => setLang('es')} text="Español" />
          <va-button onClick={e => setLang('en')} text="English" />
          <va-button onClick={e => setLang('tl')} text="Tagalog" />
        </div>
      )}
      <va-accordion {...args.props}>
        {args.accordionItems.map(accordion => (
          <va-accordion-item
            id={accordion.id}
            header={accordion.headlineSlot ? undefined : accordion.header}
            bordered={accordion.bordered}
            subheader={accordion.subheader ? accordion.subheader : accordion.headerIconSlot ? 'Subheader' : undefined}
            level={accordion.level ? accordion.level : undefined}
            open={accordion.open}
          >
            {accordion.headerIconSlot && (
              <>
                <span slot="icon" className="vads-u-color--green">
                  <va-icon icon="info" />
                </span>
                <va-icon
                  icon="mail"
                  slot="subheader-icon"
                />
              </>
            )}
            {accordion.headlineSlot && (
              <h3 slot="headline">Slotted {accordion.header}</h3>
            )}
            <p>{accordion.body}</p>
          </va-accordion-item>
        )
      )}
      </va-accordion>
    </>
  );
};

export const Default = Template.bind(null);

export const SingleSelect = Template.bind(null);
SingleSelect.args = {
  props: {
    'open-single': true,
  },
};

export const Bordered = Template.bind(null);
Bordered.args = {
  accordionItems: accordionContent.map(item => ({
    ...item,
    bordered: true,
  })),
};

export const Subheader = Template.bind(null);
Subheader.args = {
  accordionItems: accordionContent.map(item => ({
    ...item,
    subheader: 'Subheader',
  })),
};

export const IconHeaders = Template.bind(null);
IconHeaders.args = {
  accordionItems: accordionContent.map(item => ({
    ...item,
    headerIconSlot: true,
  })),
};

export const HeadlineSlot = Template.bind(null);
HeadlineSlot.args = {
  accordionItems: accordionContent.map(item => ({
    ...item,
    headlineSlot: true,
  })),
};

export const CustomHeaderLevel = Template.bind(null);
CustomHeaderLevel.args = {
  accordionItems: accordionContent.map(item => ({
    ...item,
    level: 4,
  })),
};

export const Internationalization = Template.bind(null);
Internationalization.args = {
  i18n: true,
};

export const ManyAccordions = Template.bind(null);
ManyAccordions.args = {
  accordionItems: [
    ...accordionContent,
    {
      ...defaultValues,
      id: 'fourth',
      header: 'Fourth Amendment',
      body: 'The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly describing the place to be searched, and the persons or things to be seized.',
    },
    {
      ...defaultValues,
      id: 'fifth',
      header: 'Fifth Amendment',
      body: 'No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor shall private property be taken for public use, without just compensation.',
    },
    {
      ...defaultValues,
      id: 'sixth',
      header: 'Third Amendment',
      body: 'In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process for obtaining witnesses in his favor, and to have the Assistance of Counsel for his defence.',
    },
      {
      ...defaultValues,
      id: 'seventh',
      header: 'Seventh Amendment',
      body: 'In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law.',
    },
    {
      ...defaultValues,
      id: 'Eighth',
      header: 'Eighth Amendment',
      body: 'Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.',
    },
    {
      ...defaultValues,
      id: 'Ninth',
      header: 'Ninth Amendment',
      body: 'The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.',
    },
    {
      ...defaultValues,
      id: 'Tenth',
      header: 'Tenth Amendment',
      body: 'The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.',
    },
  ],
};

// todo: after upgrading to storybook 8 we can hide this story from the sidebar: https://storybook.js.org/docs/writing-stories/tags
export const PrintAccordion = Template.bind(null);
PrintAccordion.args = {
  accordionItems: [
    {
      ...defaultValues,
      id: 'first',
      header: 'First Item',
      body: 'This story is for the Design System Team to be able to test the accordion items being opened when the page they\'re on is being printed.',
    },
    {
      ...defaultValues,
      id: 'second',
      header: 'Second Item',
      body: 'Accordion items will always open when being printed.',
    },
  ],
};
PrintAccordion.parameters = {
  chromatic: {
    media: 'print',
  },
};
