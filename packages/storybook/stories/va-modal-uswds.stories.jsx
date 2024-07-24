import React, { useState } from 'react';
import { VaModal } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

VaModal.displayName = 'VaModal';

const modalDocs = getWebComponentDocs('va-modal');

export default {
  title: 'Components/Modal USWDS',
  id: 'uswds/va-modal',
  parameters: {
    componentSubtitle: 'va-modal web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={modalDocs} />,
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
  'modal-title': 'Title',
  'initial-focus-selector': undefined,
  'status': undefined,
  'visible': false,
  'primaryButtonClick': () => window.alert('Primary button clicked!'),
  'primary-button-text': 'Primary',
  'secondaryButtonClick': () => window.alert('Secondary button clicked!'),
  'secondary-button-text': 'Secondary',
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
          This is a succinct, helpful {status} message
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
  forcedModal,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);
  return (
    <div>
      <h1>Testing h1 heading</h1>
      <va-button onClick={openModal} text="Click here to open modal"/>
      <VaModal
        forcedModal={forcedModal}
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
Info.args = { ...defaultArgs, 'modal-title': 'Info status', status: 'info' };
export const Continue = Template.bind(null);
Continue.args = { ...defaultArgs, 'modal-title': 'Continue status', status: 'continue' };
export const Success = Template.bind(null);
Success.args = { ...defaultArgs, 'modal-title': 'Success status', status: 'success' };
export const Warning = Template.bind(null);
Warning.args = { ...defaultArgs, 'modal-title': 'Warning status', status: 'warning' };
export const Error = Template.bind(null);
Error.args = { ...defaultArgs, 'modal-title': 'Error status', status: 'error' };

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

