import React, { useState } from 'react';
import { VaModal } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaModal.displayName = 'VaModal';

const modalDocs = getWebComponentDocs('va-modal');

export default {
  title: 'USWDS/Modal USWDS',
  id: 'uswds/va-modal',
  parameters: {
    componentSubtitle: `va-modal web component`,
    docs: {
      page: () => <StoryDocs data={modalDocs} />,
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

const defaultArgs = {
  'click-to-close': false,
  'disable-analytics': false,
  'large': undefined,
  'modal-title': 'Are you sure you want to continue?',
  'initial-focus-selector': undefined,
  'status': undefined,
  'visible': false,
  'primaryButtonClick': () => window.alert('Primary button clicked!'),
  'primary-button-text': 'Continue without saving',
  'secondaryButtonClick': () => window.alert('Secondary button clicked!'),
  'secondary-button-text': 'Go back',
  'uswds': true,
  'forcedModal': false,
};

const Template = ({
  'click-to-close': clickToClose,
  'disable-analytics': disableAnalytics,
  large,
  'modal-title': modalTitle,
  'initial-focus-selector': initialFocusSelector,
  primaryButtonClick,
  'primary-button-text': primaryButtonText,
  secondaryButtonClick,
  'secondary-button-text': secondaryButtonText,
  status,
  visible,
  uswds,
  forcedModal,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const onCloseEvent = () => setIsVisible(!isVisible);
  const openModal = () => setIsVisible(true);
  return (
    <div>
      <h1>Testing h1 heading</h1>
      <va-button uswds onClick={openModal} text="Click here to open modal"/>
      <VaModal
        forcedModal={forcedModal}
        uswds={uswds}
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        large={large}
        modalTitle={modalTitle}
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
          You have unsaved changes that will be lost.
        </p>
      </VaModal>
    </div>
  );
};

const ForcedTemplate = ({
  'click-to-close': clickToClose,
  'disable-analytics': disableAnalytics,
  large,
  'modal-title': modalTitle,
  'initial-focus-selector': initialFocusSelector,
  'primary-button-text': primaryButtonText,
  'secondary-button-text': secondaryButtonText,
  status,
  visible,
  uswds,
  forcedModal,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);
  return (
    <div>
      <h1>Testing h1 heading</h1>
      <va-button uswds onClick={openModal} text="Click here to open modal"/>
      <VaModal
        forcedModal={forcedModal}
        uswds={uswds}
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        large={large}
        modalTitle={modalTitle}
        initialFocusSelector={initialFocusSelector}
        onPrimaryButtonClick={closeModal}
        primaryButtonText={primaryButtonText}
        onSecondaryButtonClick={closeModal}
        secondaryButtonText={secondaryButtonText}
        status={status}
        visible={isVisible}
      >
        <p>
          You have unsaved changes that will be lost.
        </p>
      </VaModal>
    </div>
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(modalDocs);

export const Large = Template.bind(null);
Large.args = { ...defaultArgs, large: true };

export const WithForcedAction = ForcedTemplate.bind(null);
WithForcedAction.args = { ...defaultArgs, forcedModal: true };

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
  'click-to-close': true,
};

export const WithoutButtons = Template.bind(null);
WithoutButtons.args = {
  ...defaultArgs,
  'primaryButtonClick': undefined,
  'primary-button-text': undefined,
  'secondaryButtonClick': undefined,
  'secondary-button-text': undefined,
};

export const WithoutTitle = Template.bind(null);
WithoutTitle.args = { ...defaultArgs, 'modal-title': undefined };

export const WithNestedWebComponents = ({
  'click-to-close': clickToClose,
  'disable-analytics': disableAnalytics,
  large,
  'modal-title': modalTitle,
  'initial-focus-selector': initialFocusSelector,
  primaryButtonClick,
  'primary-button-text': primaryButtonText,
  secondaryButtonClick,
  'secondary-button-text': secondaryButtonText,
  status,
  visible,
  uswds,
  forcedModal,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const onCloseEvent = () => setIsVisible(!isVisible);
  const openModal = () => setIsVisible(true);
  return (
    <div>
      <h1>Testing h1 heading</h1>
      <va-button uswds onClick={openModal} text="Click here to open modal"/>
      <input id="pre-modal-input" type="checkbox" />
      <label htmlFor="pre-modal-input">Checkbox before the modal</label>
      <VaModal
        forcedModal={forcedModal}
        uswds={uswds}
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        large={large}
        modalTitle={modalTitle}
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
        <blockquote>
          <input id="plain-checkbox" type="checkbox" />
          <label htmlFor="plain-checkbox">Plain checkbox</label>
        </blockquote>
        <va-checkbox label="va-checkbox" />
      </VaModal>
      <input id="post-modal-input" type="checkbox" />
      <label htmlFor="post-modal-input">Checkbox after the modal</label>
    </div>
  );
};
WithNestedWebComponents.args = defaultArgs;

const CrisisTemplate = ({
  'click-to-close': clickToClose,
  'disable-analytics': disableAnalytics,
  large,
  'modal-title': modalTitle,
  'initial-focus-selector': initialFocusSelector,
  primaryButtonClick,
  'primary-button-text': primaryButtonText,
  secondaryButtonClick,
  'secondary-button-text': secondaryButtonText,
  status,
  visible,
  uswds,
  forcedModal,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const onCloseEvent = () => setIsVisible(!isVisible);
  const openModal = () => setIsVisible(true);
  return (
    <div>
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
      <VaModal
        forcedModal={forcedModal}
        uswds={uswds}
        clickToClose={clickToClose}
        disableAnalytics={disableAnalytics}
        large={large}
        modalTitle={modalTitle}
        initialFocusSelector={initialFocusSelector}
        onCloseEvent={onCloseEvent}
        onPrimaryButtonClick={primaryButtonClick}
        primaryButtonText={primaryButtonText}
        onSecondaryButtonClick={secondaryButtonClick}
        secondaryButtonText={secondaryButtonText}
        status={status}
        visible={isVisible}
      >
        <div className="va-crisis-panel" style={{ transform: 'none' }}>
          <div className="va-overlay-body va-crisis-panel-body">
            <ul>
              <li>
                <a href="tel:18002738255">
                  Call <strong>1-800-273-8255<br/>(Press 1)</strong>
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
      </VaModal>
    </div>
  );
};

export const CrisisLineModal = CrisisTemplate.bind(null);
CrisisLineModal.args = {
  ...defaultArgs,
  'primaryButtonClick': undefined,
  'primary-button-text': undefined,
  'secondaryButtonClick': undefined,
  'secondary-button-text': undefined,
  'modal-title': 'Get help from Veterans Crisis Line',
};
