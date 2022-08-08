import React, { useState } from 'react';

import ExpandingGroup from '../../react-components/src/components/ExpandingGroup/ExpandingGroup';

export default {
  title: 'Components/ExpandingGroup',
  component: ExpandingGroup,
};

const Template = args => {
  const [open, setOpen] = useState(args.open);

  const toggleOpen = () => setOpen(!open);
  return (
    <div style={{ paddingLeft: '1em' }}>
      <button onClick={toggleOpen}>Toggle Expanding Group</button>
      <ExpandingGroup {...args} open={open} />
    </div>
  );
};

const defaultArgs = {
  open: true,
  showPlus: true,
  children: [
    <div key="visible"> This is the first child </div>,
    <span key="hidden">This is the second child</span>,
  ],
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Closed = Template.bind(null);
Closed.args = {
  ...defaultArgs,
  open: false,
};

export const NoPlus = Template.bind(null);
NoPlus.args = {
  ...defaultArgs,
  showPlus: false,
};
