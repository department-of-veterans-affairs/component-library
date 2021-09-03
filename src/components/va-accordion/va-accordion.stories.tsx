import { html } from 'lit-html';
import fixture from './fixtures/va-accordion.fixture.json';

export default {
  title: 'Components/Accordion',
  component: 'va-accordion',
};

const defaultArgs = {
  multi: false,
  bordered: false,
  subheader: false,
  level: 2,
};

const Template = ({ multi, bordered, level }) => html`
  <va-accordion bordered="${bordered}" multi="${multi}">
    <va-accordion-item header="First Amendment" level=${level}>
      Congress shall make no law respecting an establishment of religion, or
      prohibiting the free exercise thereof; or abridging the freedom of speech,
      or of the press; or the right of the people peaceably to assemble, and to
      petition the Government for a redress of grievances.
    </va-accordion-item>
    <va-accordion-item header="Second Amendment" level=${level}>
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </va-accordion-item>
  </va-accordion>
`;

const TemplateSubheader = ({ subheader1, subheader2, level }) => html`
  <va-accordion>
    <va-accordion-item
      header="First Amendment"
      subheader=${subheader1}
      level=${level}
    >
      Congress shall make no law respecting an establishment of religion, or
      prohibiting the free exercise thereof; or abridging the freedom of speech,
      or of the press; or the right of the people peaceably to assemble, and to
      petition the Government for a redress of grievances.
    </va-accordion-item>
    <va-accordion-item
      header="Second Amendment"
      subheader=${subheader2}
      level=${level}
    >
      A well regulated Militia, being necessary to the security of a free State,
      the right of the people to keep and bear Arms, shall not be infringed.
    </va-accordion-item>
  </va-accordion>
`;

const TemplateLargeItems = ({ multi, bordered, level }) => html`
  <va-accordion bordered="${bordered}" multi="false" open-single>
    <va-accordion-item header="Prufrock pt. 1" level=${level}>
      <pre>${fixture.first}</pre>
    </va-accordion-item>
    <va-accordion-item header="Prufrock pt. 2" level=${level}>
      <pre>${fixture.second}</pre>
    </va-accordion-item>
    <va-accordion-item header="Prufrock pt. 3" level=${level}>
      <pre>${fixture.third}</pre>
    </va-accordion-item>
    <va-accordion-item header="Prufrock pt. 4" level=${level}>
      <pre>${fixture.fourth}</pre>
    </va-accordion-item>
  </va-accordion>
  <div>
    <pre>${fixture.remainder}</pre>
  </div>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Multiselect = Template.bind({});

Multiselect.args = { ...defaultArgs, multi: true };

export const Bordered = Template.bind({});

Bordered.args = { ...defaultArgs, bordered: true };

export const Subheaders = TemplateSubheader.bind({});

Subheaders.args = {
  ...defaultArgs,
  subheader1: 'First Amendment Subheader',
  subheader2: 'Second Amendment Subheader',
};

export const LargeItems = TemplateLargeItems.bind({});

LargeItems.args = { ...defaultArgs, bordered: true };
