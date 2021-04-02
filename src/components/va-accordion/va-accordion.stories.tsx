import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
  component: 'va-accordion',
};

const defaultArgs = {
  multi: false,
  bordered: false,
};

const Template = ({ multi, bordered }) => html`
  <va-accordion bordered="${bordered}" multi="${multi}">
    <va-accordion-item header="First Amendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the
      right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </va-accordion-item>
    <va-accordion-item header="Second Amendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </va-accordion-item>
  </va-accordion>
`;

export const Default = Template.bind({});

Default.args = { ...defaultArgs };

export const Multiselect = Template.bind({});

Multiselect.args = { ...defaultArgs, multi: true };

export const Bordered = Template.bind({});

Bordered.args = { ...defaultArgs, bordered: true };
