import React, { useState } from 'react';
import Modal from '../../react-components/src/components/Modal/Modal';
import { StoryDocs } from './wc-helpers';

export default {
  title: 'Components/Modal/React Component/Modal',
  id: 'Components/Modal',
  component: Modal,
  parameters: {
    componentSubtitle: 'Modal React component',
    docs: {
      page: () => <StoryDocs componentName="Modal react" />,
    },
  },
};

const Template = args => {
  const [visible, setVisible] = useState(args.visible);
  const onClose = () => setVisible(!visible);
  const openModal = () => setVisible(true);
  return (
    <div style={{ height: '500px' }}>
      <h1>Testing h1 heading</h1>
      <button onClick={openModal}>Click here to open modal</button>
      <Modal {...args} visible={visible} onClose={onClose}>
        {args.children}
      </Modal>
    </div>
  );
};

const CrisisTemplate = args => {
  const [visible, setVisible] = useState(args.visible);
  const onClose = () => setVisible(!visible);
  const openModal = () => setVisible(true);
  return (
    <>
      <div
        className="va-crisis-line"
        style={{ position: 'static', height: '600px', maxWidth: 'none' }}
      >
        <div className="va-flex">
          <button
            data-show="#modal-crisisline"
            className="va-crisis-line-button va-overlay-trigger"
            onClick={openModal}
          >
            <span className="va-flex">
              <span className="vcl"></span>
              Get help from Veterans Crisis Line
            </span>
          </button>
        </div>
      </div>
      <Modal {...args} visible={visible} onClose={onClose}>
        {args.children}
      </Modal>
      <div
        id="modal-crisisline"
        className="va-overlay va-modal va-modal-large"
        role="alertdialog"
      ></div>
    </>
  );
};

const defaultArgs = {
  ...Modal.defaultProps,
  visible: false,
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
    action: e => console.log('Primary button clicked. Event fired:', e),
  },
  secondaryButton: {
    text: 'Secondary button',
    // eslint-disable-next-line no-console
    action: e => console.log('Secondary button clicked. Event fired:', e),
  },
  title: 'Modal title goes here',
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };

// Statuses
export const Info = Template.bind(null);
Info.args = { ...defaultArgs, status: 'info' };
export const Continue = Template.bind(null);
Continue.args = { ...defaultArgs, status: 'continue' };
export const Success = Template.bind(null);
Success.args = { ...defaultArgs, status: 'success' };
export const Warning = Template.bind(null);
Warning.args = { ...defaultArgs, status: 'warning' };
export const Error = Template.bind(null);
Error.args = { ...defaultArgs, status: 'error' };

export const ClickOutsideToClose = Template.bind(null);
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

export const WithoutButtons = Template.bind(null);
WithoutButtons.args = {
  ...defaultArgs,
  primaryButton: undefined,
  secondaryButton: undefined,
};

export const WithoutTitle = Template.bind(null);
WithoutTitle.args = { ...defaultArgs, title: undefined };

export const HideCloseButton = Template.bind(null);
HideCloseButton.args = {
  ...defaultArgs,
  hideCloseButton: true,
  clickToClose: true,
};

export const CrisisLineModal = CrisisTemplate.bind(null);
CrisisLineModal.args = {
  ...defaultArgs,
  primaryButton: null,
  secondaryButton: null,
  title: 'Get help from Veterans Crisis Line',
  children: (
    <div className="va-crisis-panel" style={{ transform: 'none' }}>
      <div className="va-overlay-body va-crisis-panel-body">
        <ul>
          <li>
            <a href="tel:18002738255">
              Call <strong>1-800-273-8255 (Press 1)</strong>
            </a>
          </li>
          <li>
            <a href="sms:838255">
              Text to <b>838255</b>
            </a>
          </li>
          <li>
            <a href="https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat">
              Chat <b>confidentially now</b>
            </a>
          </li>
        </ul>
        <p>
          If you are in crisis or having thoughts of suicide, visit{' '}
          <a href="https://www.veteranscrisisline.net/">
            VeteransCrisisLine.net
          </a>{' '}
          for more resources.
        </p>
      </div>
    </div>
  ),
};
