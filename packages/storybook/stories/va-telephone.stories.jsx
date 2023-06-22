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
const data = Object.entries(contactsMap).map(c => ([
  c[0], c[1].phoneNumber, c[1].description
]));

const Contacts = () => (
  <va-table>
    <va-table-row slot="headers">
      {columns.map((col) => (
        <p key={col.value}>{col.label}</p>
      ))}
    </va-table-row>

    {data.map((row, index) => (
      <va-table-row key={`row-${index}`}>
        {row.map((item, i) => {
          if (i === 1) {
            return <p><va-telephone key={`row-${i}`} contact={item}></va-telephone></p>
          }
          return <p key={`row-${i}`}>{item}</p>;
        })}
      </va-table-row>
    ))}
  </va-table>
);

export default {
  title: `Components/Telephone`,
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
  ariaDescribedby,
  vanity,
  tty,
  sms
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
        sms={sms}
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
  ariaDescribedby: 'numberDescription',
};

export const VanityNumber = Template.bind(null);
VanityNumber.args = {
  ...defaultArgs,
  contact: '8772228387',
  vanity: 'VETS',
};
