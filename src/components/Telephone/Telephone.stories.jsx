import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from '@storybook/addon-docs/blocks';

import Telephone, { CONTACTS, PATTERNS } from './Telephone';
import { contactsMap } from './contacts';
import { patternsMap } from './patterns';
import Table from '../Table/Table';

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
      value: <Telephone contact={c[1].phoneNumber} />,
      description: <div style={{ maxWidth: '30em' }}>{c[1].description}</div>,
    }))}
  />
);

// This builds the available "PATTERNS" list table
// Descriptions are included in the patterns.js file
const patternFields = [
  { label: 'Pattern name (PATTERN.x)', value: 'key' },
  { label: 'Pattern', value: 'value' },
  { label: 'Description', value: 'description' },
];
const Patterns = () => (
  <Table
    fields={patternFields}
    data={Object.entries(patternsMap).map(p => ({
      key: p[1].pattern,
      value: PATTERNS[p[1].pattern],
      description: <div style={{ maxWidth: '30em' }}>{p[1].description}</div>,
    }))}
  />
);

const Page = () => (
  <>
    <Title />
    <Subtitle />
    <Description />
    <Primary />
    <ArgsTable />
    <Contacts />
    <br />
    <Patterns />
    <br />
    <Stories />
  </>
);

export default {
  title: 'Components/Telephone',
  component: Telephone,
  parameters: {
    docs: {
      // Add the contacts & pattern table to the docs page
      page: Page,
    },
  },
};

const Template = args => <Telephone {...args} />;

const defaultArgs = {
  contact: CONTACTS.GI_BILL,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const DisplayOnly = Template.bind({});
DisplayOnly.args = { ...defaultArgs, notClickable: true };

export const ThreeDigitNumber = Template.bind({});
ThreeDigitNumber.args = { contact: '711' };

export const Extension = Template.bind({});
Extension.args = { ...defaultArgs, extension: '123' };

export const CustomContent = Template.bind({});
CustomContent.args = {
  contact: CONTACTS['222_VETS'],
  children: '877-222-VETS (8387)',
};
