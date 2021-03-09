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
import Table from '../Table/Table';

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

const patternFields = [
  { label: 'Pattern name (PATTERN.x)', value: 'key' },
  { label: 'Pattern', value: 'value' },
  { label: 'Description', value: 'description' },
];
const patternDescriptions = {
  '3_DIGIT':
    'Used for 3-digit numbers (e.g. 711 & 911); automatically set for 3-digit numbers',
  DEFAULT: (
    <>
      Standard telephone format. See the{' '}
      <a href="https://design.va.gov/content-style-guide/dates-and-numbers#phone-numbers">
        phone number design specification
      </a>
      .
    </>
  ),
  OUTSIDE_US:
    'Pattern used for numbers where the Veteran is located outside the United States',
};
const Patterns = () => (
  <Table
    fields={patternFields}
    data={Object.entries(PATTERNS).map(p => ({
      key: p[0],
      value: p[1],
      description: (
        <div style={{ maxWidth: '30em' }}>{patternDescriptions[p[0]]}</div>
      ),
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
