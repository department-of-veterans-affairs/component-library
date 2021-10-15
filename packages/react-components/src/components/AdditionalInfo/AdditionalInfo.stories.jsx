import React from 'react';
import AdditionalInfo from './AdditionalInfo';

export default {
  title: 'Components/AdditionalInfo',
  component: AdditionalInfo,
  argTypes: {
    infoA: { control: 'text' },
    infoB: { control: 'text' },
    infoC: { control: 'text' },
    infoD: { control: 'text' },
  },
};

const Template = (args) => (
  <AdditionalInfo {...args}>
    <ul>
      <li>{args.infoA}</li>
      <li>{args.infoB}</li>
      <li>{args.infoC}</li>
      <li>{args.infoD}</li>
    </ul>
  </AdditionalInfo>
);

const defaultArgs = {
  infoA: 'info A',
  infoB: 'info B',
  infoC: 'info C',
  infoD: 'info D',
  triggerText: 'Additional Information',
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
};
