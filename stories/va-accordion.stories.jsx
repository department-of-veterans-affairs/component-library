import React from 'react';
import componentDocs from 'web-components/component-docs.json';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

const getWebComponentDocs = tag =>
  componentDocs.components.filter(comp => comp.tag === tag)[0];

const componentStructure = comp => {
  const props = comp.props.reduce((propObj, prop) => {
    propObj[prop.name] = {
      description: prop.docs,
      required: prop.required,
      type: {
        name: prop.type,
      },
    };
    return propObj;
  }, {});

  return {
    [comp.tag]: {
      __docgenInfo: {
        props,
      },
    },
  };
};

const accordionDocs = getWebComponentDocs('va-accordion');

const accordionItem = getWebComponentDocs('va-accordion-item');

export default {
  title: 'Components/va-accordion',
  subcomponents: componentStructure(accordionItem),
  parameters: {
    docs: {
      // Add the contacts table to the docs page
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Primary />
          <Description markdown={accordionDocs.docs} />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
};

const Template = args => {
  return (
    <va-accordion {...args}>
      <va-accordion-item header="First Ammendment">
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item header="Second Ammendment">
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
