import React from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-accordion');
const accordionItem = getWebComponentDocs('va-accordion-item');

export default {
  title: 'Components/va-accordion',
  subcomponents: componentStructure(accordionItem),
};

const Template = args => {
  const { headline, level, ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item id="first">
        {headline}
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item id="second" level={level} header="Second Amendment">
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
      <va-accordion-item id="third" level={level} header="Third Amendment">
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
      >
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
    </va-accordion>
  );
};

const defaultArgs = {
  bordered: false,
  headline: <h6 slot="headline">First Amendment Headline</h6>,
  'open-single': undefined
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(accordionDocs);

export const SingleSelect = Template.bind({});
SingleSelect.args = {
  ...defaultArgs,
  'open-single': true,
};

export const Bordered = Template.bind({});
Bordered.args = {
  ...defaultArgs,
  bordered: true,
};

export const ChangeHeaderLevel = Template.bind({});
ChangeHeaderLevel.args = {
  ...defaultArgs,
  level: 4,
};

export const Subheader = TemplateSubheader.bind({});
Subheader.args = {
  ...defaultArgs,
};
