import React from 'react';
import CollapsiblePanel from './CollapsiblePanel';

export default {
  title: 'Components/CollapsiblePanel',
  component: CollapsiblePanel,
};

const Template = (args) => (
  <CollapsiblePanel {...args}>
    <div>Panel contents go here.</div>
  </CollapsiblePanel>
);

const defaultArgs = {
  panelName: 'Collapsible panel example',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const StartOpen = Template.bind({});
StartOpen.args = { ...defaultArgs, startOpen: true };

export const Borderless = Template.bind({});
Borderless.args = { ...defaultArgs, borderless: true };
