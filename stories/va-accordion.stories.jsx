import React from 'react';
import {VaAccordion} from 'web-components/dist/collection/components/va-accordion/va-accordion.js';

export default {
  title: 'Components/va-accordion',
  component: VaAccordion,
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
