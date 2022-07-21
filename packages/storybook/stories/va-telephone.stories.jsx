import React from 'react';
import {
  CONTACTS,
  contactsMap,
  Table,
} from '@department-of-veterans-affairs/component-library';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

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

export default {
  title: 'Components/va-telephone',
  parameters: {
    componentSubtitle: `Telephone web component`,
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: () => (
        <StoryDocs data={telephoneDocs}>
          <Contacts />
          <br />
        </StoryDocs>
      ),
    },
  },
};

const Template = ({
  contact,
  extension,
  'not-clickable': notClickable,
  international,
  ariaDescribedby,
  vanity,
  tty,
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
        vanity={vanity}
        tty={tty}
      ></va-telephone>
    </div>
  );
};

const defaultArgs = {
  'contact': '8773459876',
  'extension': undefined,
  'not-clickable': false,
  'international': false,
  'tty': false,
  'vanity': undefined,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(telephoneDocs);

export const ThreeDigitNumber = Template.bind(null);
ThreeDigitNumber.args = {
  ...defaultArgs,
  contact: '711',
};

export const Extension = Template.bind(null);
Extension.args = {
  ...defaultArgs,
  extension: '123',
};

export const NotClickable = Template.bind(null);
NotClickable.args = {
  ...defaultArgs,
  'not-clickable': true,
};

export const International = Template.bind(null);
International.args = {
  ...defaultArgs,
  international: true,
};

export const TTY = Template.bind(null);
TTY.args = {
  ...defaultArgs,
  tty: true,
};

export const AriaDescribedBy = Template.bind(null);
AriaDescribedBy.args = {
  ...defaultArgs,
  ariaDescribedby: 'numberDescription',
};

export const VanityNumber = Template.bind(null);
VanityNumber.args = {
  ...defaultArgs,
  contact: '8772228387',
  vanity: 'VETS',
};
