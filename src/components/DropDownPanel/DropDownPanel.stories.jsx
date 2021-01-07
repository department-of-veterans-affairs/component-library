import React, { useState } from 'react';
import DropDownPanel from './DropDownPanel';

export default {
  title: 'Components/DropDownPanel',
  component: DropDownPanel,
};

const Template = (args) => {
  const [isOpen, setOpen] = useState(args.isOpen);

  return (
    <div style={{ backgroundColor: '#112e51' }}>
      <DropDownPanel
        {...args}
        isOpen={isOpen}
        clickHandler={() => setOpen(!isOpen)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        ullamcorper at eros eu suscipit. Ut imperdiet libero et luctus pretium.
      </DropDownPanel>
    </div>
  );
};

const defaultArgs = {
  buttonText: 'Helpdesk',
  isOpen: false,
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
