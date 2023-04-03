import React, { useState } from 'react';
import DropDownPanel from '../../react-components/src/components/DropDownPanel/DropDownPanel';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Deprecated/Dropdown panel - React',
  component: DropDownPanel,
  id: 'components/dropdownpanel',
  parameters: {
    componentSubtitle: 'Dropdown panel React component',
    docs: {
      page: () => <StoryDocs componentName="Dropdown panel - React" />,
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
