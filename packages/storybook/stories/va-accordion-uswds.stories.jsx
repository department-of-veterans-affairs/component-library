import React, { useState, useEffect } from 'react';
import { VaAccordion, VaAccordionItem } from '@department-of-veterans-affairs/web-components/react-bindings';
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

const Template = args => {  
  return (
    <VaAccordion {...args}>
      <VaAccordionItem uswds itemId="first">
        <span slot="header">First Amendment</span>
        <span slot="content">
            <p>
              Congress shall make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of speech,
              or of the press; or the right of the people peaceably to assemble, and to
              petition the Government for a redress of grievances.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="second">
        <span slot="header">Second Amendment</span>
        <span slot="content">
            <p>
              A well regulated Militia, being necessary to the security of a free State, 
              the right of the people to keep and bear Arms, shall not be infringed.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="third">
        <span slot="header">Third Amendment</span>
        <span slot="content">
            <p>
            No Soldier shall, in time of peace be quartered in any house, without the 
            consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
            </p>
        </span>
      </VaAccordionItem>
    </VaAccordion>
  );
};

const BorderedTemplate = args => {  
  return (
    <VaAccordion {...args}>
      <VaAccordionItem uswds itemId="first" bordered="true">
        <span slot="header">First Amendment</span>
        <span slot="content">
            <p>
              Congress shall make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of speech,
              or of the press; or the right of the people peaceably to assemble, and to
              petition the Government for a redress of grievances.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="second" bordered="true">
        <span slot="header">Second Amendment</span>
        <span slot="content">
            <p>
              A well regulated Militia, being necessary to the security of a free State, 
              the right of the people to keep and bear Arms, shall not be infringed.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="third" bordered="true">
        <span slot="header">Third Amendment</span>
        <span slot="content">
            <p>
            No Soldier shall, in time of peace be quartered in any house, without the 
            consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
            </p>
        </span>
      </VaAccordionItem>
    </VaAccordion>
  );
};

const TemplateSubheader = args => {
  return (
    <VaAccordion {...args}>
      <VaAccordionItem uswds itemId="first" bordered="true">
        <span slot="header">First Amendment</span>
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
              Congress shall make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of speech,
              or of the press; or the right of the people peaceably to assemble, and to
              petition the Government for a redress of grievances.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="second" bordered="true">
        <span slot="header">Second Amendment</span>
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
              A well regulated Militia, being necessary to the security of a free State, 
              the right of the people to keep and bear Arms, shall not be infringed.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="third" bordered="true">
        <span slot="header">Third Amendment</span>
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
            No Soldier shall, in time of peace be quartered in any house, without the 
            consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
            </p>
        </span>
      </VaAccordionItem>
    </VaAccordion>
  );
};

const TemplateIconHeaders = args => {
  return (
    <VaAccordion {...args}>
      <VaAccordionItem uswds itemId="first" bordered="true">
        <i slot="header-icon" className="fas fa-info-circle vads-u-color--green"/>
        <span slot="header">First Amendment</span>
        <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
              Congress shall make no law respecting an establishment of religion, or
              prohibiting the free exercise thereof; or abridging the freedom of speech,
              or of the press; or the right of the people peaceably to assemble, and to
              petition the Government for a redress of grievances.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="second" bordered="true">
        <i slot="header-icon" className="fas fa-info-circle vads-u-color--green"/>
        <span slot="header">Second Amendment</span>
        <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
              A well regulated Militia, being necessary to the security of a free State, 
              the right of the people to keep and bear Arms, shall not be infringed.
            </p>
        </span>
      </VaAccordionItem>
      <VaAccordionItem uswds itemId="third" bordered="true">
        <i slot="header-icon" className="fas fa-info-circle vads-u-color--green"/>
        <span slot="header">Third Amendment</span>
        <i aria-hidden="true" className="fas fa-envelope" slot="subheader-icon"/>  
        <span slot="subheader">Subheader</span>
        <span slot="content">
            <p>
            No Soldier shall, in time of peace be quartered in any house, without the 
            consent of the Owner, nor in time of war, but in a manner to be prescribed by law.
            </p>
        </span>
      </VaAccordionItem>
    </VaAccordion>
  );
};



const defaultArgs = {
  'bordered': false,
  'headline': <h6 slot="headline">First Amendment Headline</h6>,
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