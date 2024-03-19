import React from 'react';
import {
  CONTACTS,
  contactsMap,
} from '@department-of-veterans-affairs/component-library';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const telephoneDocs = getWebComponentDocs('va-telephone');

// This builds the available "CONTACTS" list table
// Descriptions are available in the contacts.js file
const columns = [
  { label: 'Property name (CONTACTS.x)', value: 'key' },
  { label: 'Phone number', value: 'phone' },
  { label: 'Description', value: 'description' },
];
const data = Object.entries(contactsMap).map(c => (
  {key: c[0], phoneNumber: c[1].phoneNumber, description: c[1].description}
));

const Contacts = () => (
  <va-table>
    <va-table-row slot="headers">
      {columns.map((col) => (
        <span key={col.value}>{col.label}</span>
      ))}
    </va-table-row>

    {data.map(row => (
      <va-table-row key={row.key}>
        <span>{row.key}</span>
        <span><va-telephone contact={row.phoneNumber}></va-telephone></span>
        <span>{row.description}</span>
      </va-table-row>
    ))}
  </va-table>
);

export default {
  title: 'V1 Components/Telephone',
  id: 'components/va-telephone',
  parameters: {
    componentSubtitle: `va-telephone web component`,
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
  vanity,
  tty,
  sms,
  'message-aria-describedby': messageAriaDescribedBy,
}) => {
  return (
    <div>
      {messageAriaDescribedBy && (
        <span>Main number to facility</span>
      )}
      <va-telephone
        contact={contact}
        extension={extension}
        not-clickable={notClickable}
        international={international}
        vanity={vanity}
        tty={tty}
        sms={sms}
        message-aria-describedby={messageAriaDescribedBy}
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
  'sms': false,
  'vanity': undefined,
};

export const Default = Template.bind(null);
Default.args = {
  'message-aria-describedby': false,
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

export const SMS = Template.bind(null);
SMS.args = {
  ...defaultArgs,
  sms: true,
  contact: '838255'
};

export const AriaDescribedBy = Template.bind(null);
AriaDescribedBy.args = {
  ...defaultArgs,
  'message-aria-describedby': 'Main number to facility',
};

export const VanityNumber = Template.bind(null);
VanityNumber.args = {
  ...defaultArgs,
  contact: '8772228387',
  vanity: 'VETS',
};
