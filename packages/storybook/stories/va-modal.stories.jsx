import React, { useState } from 'react';
import { VaModal } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure } from './wc-helpers';
import { generateEventsDescription } from './events';

VaModal.displayName = 'VaModal';

const modalDocs = getWebComponentDocs('va-modal');

export default {
  title: 'Components/va-modal',
  parameters: {
    docs: {
      description: {
        component: generateEventsDescription(modalDocs),
      },
    },
  },
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['continue', 'error', 'info', 'success', 'warning'],
      },
    },
  },
};

const Template = ({
  'click-to-close': clickToClose,
  'disable-analytics': disableAnalytics,
  'modal-title': modalTitle,
  'hide-close-button': hideCloseButton,
  'initial-focus-selector': initialFocusSelector,
  'primary-button': primaryButton,
  'secondary-button': secondaryButton,
  status,
  visible,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const onCloseEvent = () => setIsVisible(!isVisible);
  const openModal = () => setIsVisible(true);
  return (
    <div style={{ height: '500px' }}>
      <h1>Testing h1 heading</h1>
      <button onClick={openModal}>Click here to open modal</button>
      <VaModal
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        modalTitle={modalTitle}
        hideCloseButton={hideCloseButton}
        initialFocusSelector={initialFocusSelector}
        onCloseEvent={onCloseEvent}
        primaryButton={primaryButton}
        secondaryButton={secondaryButton}
        status={status}
        visible={isVisible}
      >
        <p>
          A modal may pass any React nodes as children to be displayed within
          it.
        </p>
        <p>
          By default, a modal may have up to one primary button, and up to one
          secondary button. Check the console log when clicking the buttons to
          see the events fired.
        </p>
        <p>If more buttons are required, pass them in as children.</p>
      </VaModal>
    </div>
  );
};

const defaultArgs = {
  'click-to-close': false,
  'disable-analytics': false,
  'modal-title': 'Modal title goes here',
  'hide-close-button': false,
  'initial-focus-selector': undefined,
  'primary-button': {
    text: 'Primary button',
    action: e => console.log('Primary button clicked. Event fired:', e),
  },
  'secondary-button': {
    text: 'Secondary button',
    action: e => console.log('Secondary button clicked. Event fired:', e),
  },
  'status': undefined,
  'visible': false,
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(modalDocs);
