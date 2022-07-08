import React, { useState } from 'react';
import HelpMenu from '../../react-components/src/components/HelpMenu/HelpMenu';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Help menu',
  component: HelpMenu,
  parameters: {
    componentSubtitle: 'Help menu React component',
    docs: {
      page: () => <StoryDocs componentName="Help menu" />,
    },
  },
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

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
