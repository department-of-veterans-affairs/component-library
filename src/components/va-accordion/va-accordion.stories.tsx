import { html } from 'lit-html';

export default {
  title: 'Components/Accordion',
  component: 'va-accordion',
};

const args = {
  first: 'First',
  middle: 'Middle',
  last: 'Last',
};

const argTypes = {
  first: {
    description: 'The first name',
  },
  middle: {
    description: 'The middle name',
  },
  last: {
    description: 'The last name',
  },
};

const Template = ({ first, middle, last }) => html`
  <va-accordion>
    <va-accordion-item header="First Ammendment">
      Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the
      right of the people peaceably to assemble, and to petition the Government for a redress of grievances.
    </va-accordion-item>
    <va-accordion-item header="Second Ammendment">
      A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.
    </va-accordion-item>
  </va-accordion>
`;

export const Default = Template.bind({});

Default.args = { ...args };
Default.argTypes = { ...argTypes };
