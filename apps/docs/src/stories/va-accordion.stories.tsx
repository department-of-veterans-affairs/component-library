import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'va-accordion': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          bordered?: boolean;
          'open-single'?: boolean;
        },
        HTMLElement
      >;
      'va-accordion-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          header?: string;
          open?: boolean;
          level?: number;
          subheader?: string;
        },
        HTMLElement
      >;
    }
  }
}

const meta: Meta = {
  title: 'Components/Accordion USWDS',
  id: 'uswds-va-accordion',
  parameters: {
    docs: {
      description: {
        component: 'VA Design System accordion component for expandable content sections.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <va-accordion>
      <va-accordion-item header="First Amendment" level={2}>
        Congress shall make no law respecting an establishment of religion, or
        prohibiting the free exercise thereof; or abridging the freedom of
        speech, or of the press; or the right of the people peaceably to
        assemble, and to petition the Government for a redress of grievances.
      </va-accordion-item>
      <va-accordion-item header="Second Amendment" level={2}>
        A well regulated Militia, being necessary to the security of a free
        State, the right of the people to keep and bear Arms, shall not be
        infringed.
      </va-accordion-item>
      <va-accordion-item header="Third Amendment" level={2}>
        No Soldier shall, in time of peace be quartered in any house, without
        the consent of the Owner, nor in time of war, but in a manner to be
        prescribed by law.
      </va-accordion-item>
    </va-accordion>
  ),
};

export const SingleOpen: Story = {
  name: 'Single Select',
  render: () => (
    <va-accordion open-single>
      <va-accordion-item header="Section One" level={2}>
        This accordion only allows one section to be open at a time. When you
        open another section, the current one will close automatically.
      </va-accordion-item>
      <va-accordion-item header="Section Two" level={2}>
        This is the content for section two. Notice how opening this section
        closes the previous one.
      </va-accordion-item>
      <va-accordion-item header="Section Three" level={2}>
        This is the content for section three. The single-select behavior
        improves focus and reduces visual clutter.
      </va-accordion-item>
    </va-accordion>
  ),
};

export const Bordered: Story = {
  render: () => (
    <va-accordion bordered>
      <va-accordion-item header="Bordered Section One" level={2}>
        This accordion has a bordered style which adds visual separation
        between items.
      </va-accordion-item>
      <va-accordion-item header="Bordered Section Two" level={2}>
        The bordered variant is useful when you need more visual distinction
        between accordion items.
      </va-accordion-item>
    </va-accordion>
  ),
};

export const WithSubheader: Story = {
  name: 'With Subheader',
  render: () => (
    <va-accordion>
      <va-accordion-item
        header="Main Header"
        subheader="Additional context about this section"
        level={2}
      >
        Content that goes inside the accordion item. The subheader provides
        additional context about what the user will find when they expand this
        section.
      </va-accordion-item>
      <va-accordion-item
        header="Another Header"
        subheader="More supporting information"
        level={2}
      >
        More content here. Subheaders are useful for providing secondary
        information without cluttering the main header.
      </va-accordion-item>
    </va-accordion>
  ),
};

export const OpenByDefault: Story = {
  name: 'Open by Default',
  render: () => (
    <va-accordion>
      <va-accordion-item header="This section starts open" level={2} open>
        This accordion item is open by default. Use the open attribute when
        you want users to see the content immediately without needing to click.
      </va-accordion-item>
      <va-accordion-item header="This section starts closed" level={2}>
        This section is closed by default. Users need to click to expand it.
      </va-accordion-item>
    </va-accordion>
  ),
};
