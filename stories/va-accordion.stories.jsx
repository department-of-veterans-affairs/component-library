import React from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const accordionDocs = getWebComponentDocs('va-accordion');
const accordionItem = getWebComponentDocs('va-accordion-item');

export default {
  title: 'Components/va-accordion',
  subcomponents: componentStructure(accordionItem),
  parameters: {
    docs: {
      /* eslint-disable-next-line react/display-name */
      page: () => <StoryDocs docs={accordionDocs.docs} />,
    },
  },
};

const Template = args => {
  const { level, ...rest } = args;
  return (
    <va-accordion {...rest}>
      <va-accordion-item level={level} header="First Amendment">
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item level={level} header="Second Amendment">
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
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
  multi: false,
  bordered: false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(accordionDocs);

export const Multi = Template.bind({});
Multi.args = {
  ...defaultArgs,
  multi: true,
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
