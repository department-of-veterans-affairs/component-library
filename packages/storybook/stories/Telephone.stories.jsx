import React from 'react';
import {
  Telephone,
  CONTACTS,
} from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/Telephone',
  component: Telephone,
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
