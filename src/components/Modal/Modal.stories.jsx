import React, { useState } from 'react';
import Modal from './Modal';

export default {
  title: 'Library/Modal',
  component: Modal,
};

const Template = (args) => {
  const [visible, setVisible] = useState(args.visible);
  const onClose = () => setVisible(!visible);
  return (
    <Modal {...args} visible={visible} onClose={onClose}>
      {args.children}
    </Modal>
  );
};

const defaultArgs = {
  ...Modal.defaultProps,
  visible: true,
  // Note: This is not a prop of Modal. This is to demonstrate the use of children in the Modal.
  children: (
    <>
      <p>
        A modal may pass any React nodes as children to be displayed within it.
      </p>
      <p>
        By default, a modal may have up to one primary button, and up to one
        secondary button. Check the console log when clicking the buttons to see
        the events fired.
      </p>
      <p>If more buttons are required, pass them in as children.</p>
    </>
  ),
  primaryButton: {
    text: 'Primary button',
    // eslint-disable-next-line no-console
    action: (e) => console.log('Primary button clicked. Event fired:', e),
  },
  secondaryButton: {
    text: 'Secondary button',
    // eslint-disable-next-line no-console
    action: (e) => console.log('Secondary button clicked. Event fired:', e),
  },
  title: 'Modal title goes here',
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

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
  children: (
    <p>
      Click outside the modal to close it when <code>clickToClose</code> is
      true.
    </p>
  ),
  clickToClose: true,
};

export const WithoutButtons = Template.bind({});
WithoutButtons.args = {
  ...defaultArgs,
  primaryButton: undefined,
  secondaryButton: undefined,
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = { ...defaultArgs, title: undefined };

export const HideCloseButton = Template.bind({});
HideCloseButton.args = { ...defaultArgs, hideCloseButton: true };
