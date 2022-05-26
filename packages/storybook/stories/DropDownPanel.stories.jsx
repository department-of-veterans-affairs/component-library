import React, { useState } from 'react';
import { DropDownPanel } from '@department-of-veterans-affairs/component-library';

export default {
  title: 'Components/DropDownPanel',
  component: DropDownPanel,
};

export const Default = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div style={{ backgroundColor: '#112e51' }}>
      <DropDownPanel
        buttonText="Helpdesk"
        isOpen={isOpen}
        clickHandler={() => setOpen(!isOpen)}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
        ullamcorper at eros eu suscipit. Ut imperdiet libero et luctus pretium.
      </DropDownPanel>
    </div>
  );
};
