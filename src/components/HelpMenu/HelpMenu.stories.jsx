import React, { useState } from 'react';

import HelpMenu from './HelpMenu';

export default {
  title: 'Library/HelpMenu',
  component: HelpMenu,
};

const Template = args => {
  const [open, setOpen] = useState(args.isOpen);

  const toggleOpen = () => setOpen(!open);
  return (
    <div style={{ backgroundColor: '#112e51' }}>
      <HelpMenu {...args} isOpen={open} clickHandler={toggleOpen} />
    </div>
  );
};

const defaultArgs = {
  isOpen: true,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
