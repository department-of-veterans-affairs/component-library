import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
} from '@storybook/addon-docs/blocks';

import Telephone, { CONTACTS } from './Telephone';
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

export default {
  title: 'Library/Telephone',
  component: Telephone,
  parameters: {
    docs: {
      // Add the contacts table to the docs page
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <ArgsTable />
          <Contacts />
          <br />
          <Stories />
        </>
      ),
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

export const Extension = Template.bind({});
Extension.args = { ...defaultArgs, extension: '123' };
