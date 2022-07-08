import React, { useState } from 'react';
import DropDownPanel from '../../react-components/src/components/DropDownPanel/DropDownPanel';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Dropdown panel',
  component: DropDownPanel,
  parameters: {
    componentSubtitle: 'Dropdown panel React component',
    docs: {
      page: () => <StoryDocs componentName="Dropdown panel" />,
    },
  },
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
