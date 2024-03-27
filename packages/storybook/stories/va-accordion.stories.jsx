import React, { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-accordion');
const accordionItem = getWebComponentDocs('va-accordion-item');

export default {
  title: 'V1 Components/Accordion',
  id: 'components/va-accordion',
  subcomponents: componentStructure(accordionItem),
  parameters: {
    componentSubtitle: `va-accordion web component`,
    docs: {
      page: () => <StoryDocs data={accordionDocs} />,
    },
  },
};

const Template = args => {
  const { headline, level, ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item id="first" uswds="false">
        {headline}
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item id="second" level={level} header="Second Amendment" uswds="false">
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
      <va-accordion-item id="third" level={level} header="Third Amendment" uswds="false">
        No Soldier shall, in time of peace be quartered in any house, without
        the consent of the Owner, nor in time of war, but in a manner to be
        prescribed by law.
      </va-accordion-item>
    </va-accordion>
  );
};

const TemplateSubheader = args => {
  const { level, ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item
        level={level}
        header="First Amendment"
        subheader="First Amendment Subheader"
        uswds="false"
      >
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item
        level={level}
        header="Second Amendment"
        subheader="Second Amendment Subheader"
        uswds="false"
      >
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
    </va-accordion>
  );
};

const TemplateIcons = args => {
  const { headline, level, ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item id="first" uswds="false">
        {headline}
        <i slot="icon" className="fas fa-paperclip" aria-hidden="true"></i>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item id="second" level={level} header="Second Amendment" uswds="false">
        <i slot='icon' className="fas fa-info-circle vads-u-color--green"></i>	
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
      <va-accordion-item id="third" level={level} header="Third Amendment" subheader="Third Amendment Subheader" uswds="false">
         <i slot='icon' className="fas fa-info-circle vads-u-color--green"></i>	
         <i slot="subheader-icon" aria-hidden="true" className="fas fa-envelope"></i>
        No Soldier shall, in time of peace be quartered in any house, without
        the consent of the Owner, nor in time of war, but in a manner to be
        prescribed by law.
      </va-accordion-item>
    </va-accordion>
  );
};

const I18nTemplate = args => {
  const { headline, level, ...rest } = args;
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <va-accordion {...rest}>
        <va-accordion-item id="first" uswds="false">
          {headline}
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of
          speech, or of the press; or the right of the people peaceably to
          assemble, and to petition the Government for a redress of grievances.
        </va-accordion-item>
        <va-accordion-item id="second" level={level} header="Second Amendment" uswds="false">
          A well regulated Militia, being necessary to the security of a free
          State, the right of the people to keep and bear Arms, shall not be
          infringed.
        </va-accordion-item>
        <va-accordion-item id="third" level={level} header="Third Amendment" uswds="false">
          No Soldier shall, in time of peace be quartered in any house, without
          the consent of the Owner, nor in time of war, but in a manner to be
          prescribed by law.
        </va-accordion-item>
      </va-accordion>
    </div>
  );
};

const ManyItemsTemplate = args => (
  <va-accordion {...args}>
    <va-accordion-item id="first" header="First Amendment" uswds="false">
        <p>
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of speech,
          or of the press; or the right of the people peaceably to assemble, and to
          petition the Government for a redress of grievances.
        </p>
    </va-accordion-item>
    <va-accordion-item id="second" header="Second Amendment" uswds="false">
        <p>
          A well regulated Militia, being necessary to the security of a free State, 
          the right of the people to keep and bear Arms, shall not be infringed.
        </p>
    </va-accordion-item>
    <va-accordion-item id="third" header="Third Amendment" uswds="false">
        <p>
          No Soldier shall, in time of peace be quartered in any house, without the 
          consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
        </p>
    </va-accordion-item>
    <va-accordion-item id="fourth" header="Fourth Amendment" uswds="false">
        <p>
        The right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures, 
        shall not be violated, and no Warrants shall issue, but upon probable cause, supported by Oath or affirmation, and particularly 
        describing the place to be searched, and the persons or things to be seized.
        </p>
    </va-accordion-item>
    <va-accordion-item id="fifth" header="Fifth Amendment" uswds="false">
        <p>
        No person shall be held to answer for a capital, or otherwise infamous crime, unless on a presentment or indictment of a Grand Jury, 
        except in cases arising in the land or naval forces, or in the Militia, when in actual service in time of War or public danger; 
        nor shall any person be subject for the same offence to be twice put in jeopardy of life or limb; nor shall be compelled in any 
        criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law; nor
        shall private property be taken for public use, without just compensation.
        </p>
    </va-accordion-item>
    <va-accordion-item id="sixth" header="Sixth Amendment" uswds="false">
        <p>
        In all criminal prosecutions, the accused shall enjoy the right to a speedy and public trial, by an impartial jury of the State 
        and district wherein the crime shall have been committed, which district shall have been previously ascertained by law, and to 
        be informed of the nature and cause of the accusation; to be confronted with the witnesses against him; to have compulsory process 
        for obtaining witnesses in his favor, and to have the Assistance of Counsel for his defence.
        </p>
    </va-accordion-item>
    <va-accordion-item id="seventh" header="Seventh Amendment" uswds="false">
        <p>
        In Suits at common law, where the value in controversy shall exceed twenty dollars, the right of trial by jury shall be preserved, 
        and no fact tried by a jury, shall be otherwise re-examined in any Court of the United States, than according to the rules of the common law.
        </p>
    </va-accordion-item>
    <va-accordion-item id="eighth" header="Eighth Amendment" uswds="false">
        <p>
        Excessive bail shall not be required, nor excessive fines imposed, nor cruel and unusual punishments inflicted.
        </p>
    </va-accordion-item>
    <va-accordion-item id="ninth" header="Ninth Amendment" uswds="false">
        <p>
        The enumeration in the Constitution, of certain rights, shall not be construed to deny or disparage others retained by the people.
        </p>
    </va-accordion-item>
    <va-accordion-item id="tenth" header="Tenth Amendment" uswds="false">
        <p>
        The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people.
        </p>
    </va-accordion-item>
  </va-accordion>
);


const defaultArgs = {
  'bordered': false,
  'headline': <h6 slot="headline">First Amendment Headline</h6>,
  'open-single': undefined,
  'uswds': false
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(accordionDocs);

export const SingleSelect = Template.bind(null);
SingleSelect.args = {
  ...defaultArgs,
  'open-single': true,
};

export const Bordered = Template.bind(null);
Bordered.args = {
  ...defaultArgs,
  bordered: true,
};

export const ChangeHeaderLevel = Template.bind(null);
ChangeHeaderLevel.args = {
  ...defaultArgs,
  level: 4,
};

export const Subheader = TemplateSubheader.bind(null);
Subheader.args = {
  ...defaultArgs,
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
};

export const UsingIcons = TemplateIcons.bind(null);
UsingIcons.args = {
  ...defaultArgs,
};

export const ManyAccordions = ManyItemsTemplate.bind(null);
ManyAccordions.args = {
  ...defaultArgs,
};
