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
  title: 'USWDS/Accordion USWDS',
  id: 'uswds/va-accordion',
  subcomponents: componentStructure(accordionItem),
  parameters: {
    componentSubtitle: `va-accordion web component`,
    docs: {
      page: () => <StoryDocs data={accordionDocs} />,
    },
  },
};

const Template = args => (
  <va-accordion {...args}>
    <va-accordion-item uswds id="first" header="First Amendment">
        <p>
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of speech,
          or of the press; or the right of the people peaceably to assemble, and to
          petition the Government for a redress of grievances.
        </p>
    </va-accordion-item>
    <va-accordion-item uswds id="second" header="Second Amendment">
        <p>
          A well regulated Militia, being necessary to the security of a free State, 
          the right of the people to keep and bear Arms, shall not be infringed.
        </p>
    </va-accordion-item>
    <va-accordion-item uswds id="third" header="Third Amendment">
        <p>
          No Soldier shall, in time of peace be quartered in any house, without the 
          consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
        </p>
    </va-accordion-item>
  </va-accordion>
);

const BorderedTemplate = args => {  
  return (
    <va-accordion {...args}>
      <va-accordion-item uswds id="first" bordered="true" header="First Amendment">
          <p>
            Congress shall make no law respecting an establishment of religion, or
            prohibiting the free exercise thereof; or abridging the freedom of speech,
            or of the press; or the right of the people peaceably to assemble, and to
            petition the Government for a redress of grievances.
          </p>
      </va-accordion-item>
      <va-accordion-item uswds id="second" bordered="true" header="Second Amendment">
          <p>
            A well regulated Militia, being necessary to the security of a free State, 
            the right of the people to keep and bear Arms, shall not be infringed.
          </p>
      </va-accordion-item>
      <va-accordion-item uswds id="third" bordered="true" header="Third Amendment">
          <p>
            No Soldier shall, in time of peace be quartered in any house, without the 
            consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
          </p>
      </va-accordion-item>
    </va-accordion>
  );
};

const TemplateSubheader = args => (
  <va-accordion {...args}>
    <va-accordion-item uswds id="first" header="First Amendment" subheader="Subheader">
        <p>
          Congress shall make no law respecting an establishment of religion, or
          prohibiting the free exercise thereof; or abridging the freedom of speech,
          or of the press; or the right of the people peaceably to assemble, and to
          petition the Government for a redress of grievances.
        </p>
    </va-accordion-item>
    <va-accordion-item uswds id="second" header="Second Amendment" subheader="Subheader">
        <p>
          A well regulated Militia, being necessary to the security of a free State, 
          the right of the people to keep and bear Arms, shall not be infringed.
        </p>
    </va-accordion-item>
    <va-accordion-item uswds id="third" header="Third Amendment" subheader="Subheader">
        <p>
          No Soldier shall, in time of peace be quartered in any house, without the 
          consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
        </p>
    </va-accordion-item>
  </va-accordion>
);

const TemplateIconHeaders = args => (
  <va-accordion {...args}>
    <va-accordion-item uswds id="first" header="First Amendment" subheader="Subheader">
      <i slot="icon" className="fas fa-info-circle vads-u-color--green"/>
      <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
      <p>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of speech,
        or of the press; or the right of the people peaceably to assemble, and to
        petition the Government for a redress of grievances.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds id="second" header="Second Amendment" subheader="Subheader">
      <i slot="icon" className="fas fa-info-circle vads-u-color--green"/>
      <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
      <p>
        A well regulated Militia, being necessary to the security of a free State, 
        the right of the people to keep and bear Arms, shall not be infringed.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds id="third" header="Third Amendment" subheader="Subheader">
      <i slot="icon" className="fas fa-info-circle vads-u-color--green"/>
      <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
      <p>
        No Soldier shall, in time of peace be quartered in any house, without the 
        consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
      </p>
    </va-accordion-item>
  </va-accordion>
);

const TemplateHeadlineSlot = args => (
  <va-accordion {...args}>
    <va-accordion-item uswds id="first">
      <h6 slot="headline">First Amendment</h6>
      <p>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of speech,
        or of the press; or the right of the people peaceably to assemble, and to
        petition the Government for a redress of grievances.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds id="second">
      <h6 slot="headline">Second Amendment</h6>
      <p>
        A well regulated Militia, being necessary to the security of a free State, 
        the right of the people to keep and bear Arms, shall not be infringed.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds id="third">
      <h6 slot="headline">Third Amendment</h6>
      <p>
        No Soldier shall, in time of peace be quartered in any house, without the 
        consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
      </p>
    </va-accordion-item>
  </va-accordion>
);


const TemplateLevel = args => (
  <va-accordion {...args}>
    <va-accordion-item uswds level="5" id="first" header="First Amendment">
      <p>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of speech,
        or of the press; or the right of the people peaceably to assemble, and to
        petition the Government for a redress of grievances.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds level="5" id="second" header="Second Amendment">
      <p>
        A well regulated Militia, being necessary to the security of a free State, 
        the right of the people to keep and bear Arms, shall not be infringed.
      </p>
    </va-accordion-item>
    <va-accordion-item uswds level="5" id="third" header="Third Amendment">
        <p>
          No Soldier shall, in time of peace be quartered in any house, without the 
          consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
        </p>
    </va-accordion-item>
  </va-accordion>
);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <va-accordion uswds>
        <va-accordion-item id="first" header="First Amendment" uswds>
          <p>
            Congress shall make no law respecting an establishment of religion, or
            prohibiting the free exercise thereof; or abridging the freedom of
            speech, or of the press; or the right of the people peaceably to
            assemble, and to petition the Government for a redress of grievances.
          </p>
        </va-accordion-item>
        <va-accordion-item id="second" header="Second Amendment" uswds>
          <p>
            A well regulated Militia, being necessary to the security of a free
            State, the right of the people to keep and bear Arms, shall not be
            infringed.
          </p>
        </va-accordion-item>
        <va-accordion-item id="third" header="Third Amendment" uswds>
          <p>
            No Soldier shall, in time of peace be quartered in any house, without
            the consent of the Owner, nor in time of war, but in a manner to be
            prescribed by law.
          </p>
        </va-accordion-item>
      </va-accordion>
    </div>
  );
};


const defaultArgs = {
  'bordered': false,
  'open-single': undefined,
  uswds: true
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

export const Bordered = BorderedTemplate.bind(null);
Bordered.args = {
  ...defaultArgs,
  bordered: true,
};

export const Subheader = TemplateSubheader.bind(null);
Subheader.args = {
  ...defaultArgs,
};

export const IconHeaders = TemplateIconHeaders.bind(null);
IconHeaders.args = {
  ...defaultArgs,
};

export const HeadlineSlot = TemplateHeadlineSlot.bind(null);
HeadlineSlot.args = {
  ...defaultArgs,
};

export const CustomHeaderLevel = TemplateLevel.bind(null);
CustomHeaderLevel.args = {
  ...defaultArgs
}

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
};