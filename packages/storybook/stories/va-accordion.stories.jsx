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
  title: 'Components/Accordion',
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
    <va-accordion {...rest} >
      <va-accordion-item id="first">
        {headline}
       Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item id="second" level={level}>
        <h6 slot='headline'>
          Second Amendment
        </h6>        
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
      <va-accordion-item id="third" level={level} header="Third Amendment">
        <h6 slot='headline'>
          Third Amendment
        </h6>
        No Soldier shall, in time of peace be quartered in any house, without
        the consent of the Owner, nor in time of war, but in a manner to be
        prescribed by law.
      </va-accordion-item>
    </va-accordion>
  );
};

const SubHeaderAsProp = args => {
  const { ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item 
        subheader="First Amendment subheader">
        <h5 slot='headline'>
          First Amendment
        </h5>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item
        subheader="First Amendment subheader">
        <h5 slot='headline'>
          Second Amendment
        </h5>
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
    </va-accordion>
  );
};



const SubHeaderAsSlot = args => {
  const { ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item>
        <h5 slot='headline'>
          First Amendment
        </h5>
        <p slot='subheader'> 
          First Amendment subheader
        </p>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item>
        <h5 slot='headline'>
          Second Amendment
        </h5>
        <p slot='subheader'> 
          First Amendment subheader
        </p>
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
    </va-accordion>
  );
};

const I18nTemplate = args => {
  const { headline, ...rest } = args;
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
        <va-accordion-item id="first">
          {headline}
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of
          speech, or of the press; or the right of the people peaceably to
          assemble, and to petition the Government for a redress of grievances.
        </va-accordion-item>
        <va-accordion-item id="second">
          <div slot='headline'>
            <h6>Second Amendment</h6>
          </div>
          A well regulated Militia, being necessary to the security of a free
          State, the right of the people to keep and bear Arms, shall not be
          infringed.
        </va-accordion-item>
        <va-accordion-item id="third">
          <div slot='headline'>
            <h6>Third Amendment</h6>
          </div>
          No Soldier shall, in time of peace be quartered in any house, without
          the consent of the Owner, nor in time of war, but in a manner to be
          prescribed by law.
        </va-accordion-item>
      </va-accordion>
    </div>
  );
};

const defaultArgs = {
  'bordered': false,
  'headline': <h6 slot="headline" className="vads-u-margin--0">First Amendment Headline</h6>,
  'open-single': undefined,
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

export const Subheader = SubHeaderAsSlot.bind(null);
Subheader.args = {
  ...defaultArgs,
};

export const SubheaderAsProp = SubHeaderAsProp.bind(null);
SubheaderAsProp.args = {
  ...defaultArgs,
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
};

const StylingInHeader =() => {
  return (
    <va-accordion >
      <va-accordion-item>
        <h3 slot='headline' className="vads-u-font-style--italic vads-u-margin--0">
          <i className="fas fa-paperclip"></i>Did the thing!
        </h3>
        shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item>
        <h3 style={{fontWeight:400}} className="vads-u-margin--0" slot='headline'>
           Did the thing!
        </h3>
        <p style={{fontWeight:400}} slot='subheader'>
            <i className="fas fa-paperclip"></i>sub text!
        </p>
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
    </va-accordion>
  );
};

export const StylingInHeaderExample  = StylingInHeader.bind(null);