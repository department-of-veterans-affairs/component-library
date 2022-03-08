import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs/blocks';

import {
  CONTACTS,
  contactsMap,
  Table,
} from '@department-of-veterans-affairs/component-library';

import { getWebComponentDocs, propStructure } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');
//
// This builds the available "CONTACTS" list table
// Descriptions are available in the contacts.js file
const fields = [
  { label: 'Property name (CONTACTS.x)', value: 'key' },
  { label: 'Phone number', value: 'value' },
  { label: 'Description', value: 'description' },
];
const Contacts = () => (
  <Table
    fields={fields}
    data={Object.entries(contactsMap).map(c => ({
      key: c[0],
      value: <va-telephone contact={c[1].phoneNumber} />,
      description: <div style={{ maxWidth: '30em' }}>{c[1].description}</div>,
    }))}
  />
);

const Page = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <ArgsTable story={PRIMARY_STORY} />
    <Contacts />
    <br />
    <Stories />
  </>
);

export default {
  title: 'Components/va-telephone',
  parameters: {
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: Page,
    },
  },
};

const Template = ({
  contact,
  extension,
  'not-clickable': notClickable,
  international,
  ariaDescribedby,
}) => {
  return (
    <div>
      {ariaDescribedby && (
        <span id={ariaDescribedby}>Phone number title: </span>
      )}
      <va-telephone
        contact={contact}
        extension={extension}
        not-clickable={notClickable}
        international={international}
        aria-describedby={ariaDescribedby}
      ></va-telephone>
    </div>
  );
};

const defaultArgs = {
  'contact': '8773459876',
  'extension': undefined,
  'not-clickable': false,
  'international': false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = {
  ...defaultArgs,
  contact: '711',
};

export const Extension = Template.bind({});
Extension.args = {
  ...defaultArgs,
  extension: '123',
};

export const NotClickable = Template.bind({});
NotClickable.args = {
  ...defaultArgs,
  'not-clickable': true,
};

export const International = Template.bind({});
International.args = {
  ...defaultArgs,
  international: true,
};

export const AriaDescribedBy = Template.bind({});
AriaDescribedBy.args = {
  ...defaultArgs,
  ariaDescribedby: 'numberDescription',
};

export const VanityNumber = Template.bind({});
VanityNumber.args = {
  ...defaultArgs,
  contact: '877222VETS',
};
