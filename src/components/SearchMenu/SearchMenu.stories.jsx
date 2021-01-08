import React, { useState } from 'react';

import SearchMenu from './SearchMenu';

export default {
  title: 'Components/SearchMenu',
  component: SearchMenu,
  decorators: [
    Story => (
      <div style={{ backgroundColor: '#112e51', maxWidth: '30em' }}>
        <Story />
      </div>
    ),
  ],
};

const Template = args => {
  const [open, setOpen] = useState(args.isOpen);
  const handler = () => setOpen(!open);
  return <SearchMenu {...args} isOpen={open} clickHandler={handler} />;
};

const defaultArgs = {};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
