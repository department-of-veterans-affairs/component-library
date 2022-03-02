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
  primaryButtonClick,
  'primary-button-text': primaryButtonText,
  secondaryButtonClick,
  'secondary-button-text': secondaryButtonText,
  status,
  visible,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const onCloseEvent = () => setIsVisible(!isVisible);
  const openModal = () => setIsVisible(true);
  return (
    <div>
      <h1>Testing h1 heading</h1>
      <button onClick={openModal}>Click here to open modal</button>
      <VaModal
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        modalTitle={modalTitle}
        hideCloseButton={hideCloseButton}
        initialFocusSelector={initialFocusSelector}
        onCloseEvent={onCloseEvent}
        onPrimaryButtonClick={primaryButtonClick}
        primaryButtonText={primaryButtonText}
        onSecondaryButtonClick={secondaryButtonClick}
        secondaryButtonText={secondaryButtonText}
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
  'status': undefined,
  'visible': false,
  'primaryButtonClick': () => window.alert('Primary button clicked!'),
  'primary-button-text': 'Primary Button',
  'secondaryButtonClick': () => window.alert('Secondary button clicked!'),
  'secondary-button-text': 'Secondary Button',
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(modalDocs);

// Statuses
export const Info = Template.bind({});
Info.args = { ...defaultArgs, status: 'info' };
export const Continue = Template.bind({});
Continue.args = { ...defaultArgs, status: 'continue' };
export const Success = Template.bind({});
Success.args = { ...defaultArgs, status: 'success' };
export const Warning = Template.bind({});
Warning.args = { ...defaultArgs, status: 'warning' };
export const Error = Template.bind({});
Error.args = { ...defaultArgs, status: 'error' };

export const ClickOutsideToClose = Template.bind({});
ClickOutsideToClose.args = {
  ...defaultArgs,
  'click-to-close': true,
};

export const WithoutButtons = Template.bind({});
WithoutButtons.args = {
  ...defaultArgs,
  'primaryButtonClick': undefined,
  'primary-button-text': undefined,
  'secondaryButtonClick': undefined,
  'secondary-button-text': undefined,
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = { ...defaultArgs, 'modal-title': undefined };

export const HideCloseButton = Template.bind({});
HideCloseButton.args = {
  ...defaultArgs,
  'hide-close-button': true,
  'click-to-close': true,
};
