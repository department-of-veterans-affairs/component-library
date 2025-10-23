import { useState, useRef, useEffect } from 'react';
import { VaModal } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  resizeViewPorts,
} from './wc-helpers';

VaModal.displayName = 'VaModal';

const modalDocs = getWebComponentDocs('va-modal');

export default {
  title: 'Components/Modal USWDS',
  id: 'uswds/va-modal',
  parameters: {
    componentSubtitle: 'va-modal web component',
    docs: {
      page: () => {
        // Use effect to control scroll position
        useEffect(() => {
          // Function to scroll to top
          const scrollToTop = () => window.scrollTo(0, 0);

          // Immediate scroll
          scrollToTop();

          // Schedule multiple scroll attempts with increasing delays
          // This helps ensure scrolling works even if Storybook does additional rendering
          const timers = [50, 100, 300, 500, 1000].map(delay =>
            setTimeout(scrollToTop, delay)
          );

          // Clean up timers on unmount
          return () => timers.forEach(clearTimeout);
        }, []);

        return (
          <>
            <style>
              {`
                body {
                  overflow: auto !important;
                  position: static !important;
                }
                body.modal-open {
                  overflow: auto !important;
                  position: static !important;
                  height: auto !important;
                  padding-right: 0 !important;
                }
              `}
            </style>
            <StoryDocs storyDefault={Default} data={modalDocs} />
          </>
        );
      },
    },
    // This tells Storybook to scroll to the top when this story loads
    viewport: {
      scrollTop: 0
    }
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
  'visible': true,
  'primaryButtonClick': () => window.alert('Primary button clicked!'),
  'primary-button-text': 'Primary',
  'secondaryButtonClick': () => window.alert('Secondary button clicked!'),
  'secondary-button-text': 'Secondary',
  'forcedModal': false,
  'label': undefined,
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
  'label': label,
}) => {
  const [isVisible, setIsVisible] = useState(visible);
  const wrapRef = useRef(null);
  const onCloseEvent = () => {
    setIsVisible(!isVisible);
    resizeViewPorts(wrapRef?.current, false);
  };
  const openModal = () => {
    setIsVisible(true);
    resizeViewPorts(wrapRef?.current, true);
  };

  useEffect(() => {
    resizeViewPorts(wrapRef?.current, isVisible);
  }, [isVisible]);

  return (
    <div ref={wrapRef}>
      <h1>Testing h1 heading</h1>
      <va-button onClick={openModal} text="Click here to open modal" />
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
        label={label}
      >
        <p>This is a succinct, helpful {status} message</p>
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
  const wrapRef = useRef(null);
  const openModal = () => {
    setIsVisible(true);
    resizeViewPorts(wrapRef?.current, true);
  };
  const closeModal = () => {
    setIsVisible(false);
    resizeViewPorts(wrapRef?.current, false);
  };

  useEffect(() => {
    resizeViewPorts(wrapRef?.current, isVisible);
  }, [isVisible]);

  return (
    <div ref={wrapRef}>
      <h1>Testing h1 heading</h1>
      <va-button onClick={openModal} text="Click here to open modal" />
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
        <p>You have unsaved changes that will be lost.</p>
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
Info.args = { ...defaultArgs, 'modal-title': 'Info status', 'status': 'info' };
export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  'modal-title': 'Continue status',
  'status': 'continue',
};
export const Success = Template.bind(null);
Success.args = {
  ...defaultArgs,
  'modal-title': 'Success status',
  'status': 'success',
};
export const Warning = Template.bind(null);
Warning.args = {
  ...defaultArgs,
  'modal-title': 'Warning status',
  'status': 'warning',
};
export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  'modal-title': 'Error status',
  'status': 'error',
};

export const ClickOutsideToClose = Template.bind(null);
ClickOutsideToClose.args = {
  ...defaultArgs,
  'click-to-close': true,
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
ClickOutsideToClose.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithoutButtons = Template.bind(null);
WithoutButtons.args = {
  ...defaultArgs,
  'primaryButtonClick': undefined,
  'primary-button-text': undefined,
  'secondaryButtonClick': undefined,
  'secondary-button-text': undefined,
};

export const WithoutTitleOrLabel = Template.bind(null);
WithoutTitleOrLabel.args = {
  ...defaultArgs,
  'modal-title': undefined,
  'label': undefined
};

export const WithoutTitleAndWithLabel = Template.bind(null);
WithoutTitleAndWithLabel.args = {
  ...defaultArgs,
  'modal-title': undefined,
  'label': 'A test modal',
};
WithoutTitleAndWithLabel.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithInitialFocusSelector = Template.bind(null);
WithInitialFocusSelector.args = {
  ...defaultArgs,
  'initial-focus-selector': '.usa-modal__heading',
  'label': 'Title',
};

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
  const wrapRef = useRef(null);
  const onCloseEvent = () => {
    setIsVisible(!isVisible);
    resizeViewPorts(wrapRef?.current, false);
  };
  const openModal = () => {
    setIsVisible(true);
    resizeViewPorts(wrapRef?.current, true);
  };

  useEffect(() => {
    resizeViewPorts(wrapRef?.current, isVisible);
  }, [isVisible]);
  return (
    <div ref={wrapRef}>
      <h1>Testing h1 heading</h1>
      <va-button onClick={openModal} text="Click here to open modal" />
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
        <va-checkbox label="va-checkbox" />
      </VaModal>
      <input id="post-modal-input" type="checkbox" />
      <label htmlFor="post-modal-input">Checkbox after the modal</label>
    </div>
  );
};
WithNestedWebComponents.args = defaultArgs;

export const WithAriaHiddenNodeExceptions = ({
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
  const [ariaHiddenNodeExceptions, setAriaHiddenNodeExceptions] = useState([]);

  const wrapRef = useRef(null);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);

  const onCloseEvent = () => {
    setIsVisible(!isVisible);
    resizeViewPorts(wrapRef?.current, false);
  };

  const openModal = () => {
    setIsVisible(true);
    resizeViewPorts(wrapRef?.current, true);
  };

  useEffect(() => {
    resizeViewPorts(wrapRef?.current, isVisible);
  }, [isVisible]);

  useEffect(() => {
    setAriaHiddenNodeExceptions([firstInputRef.current, secondInputRef.current]);
  }, [firstInputRef.current, secondInputRef.current]);

  return (
    <div ref={wrapRef}>
      <h1>Testing h1 heading</h1>
      <va-button onClick={openModal} text="Click here to open modal" />
      <input id="pre-modal-input" type="checkbox" ref={firstInputRef} />
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
        ariaHiddenNodeExceptions={ariaHiddenNodeExceptions}
      >
        <p>
          A modal may pass any React nodes as children to be displayed within
          it.
        </p>
        <va-checkbox label="va-checkbox" />
      </VaModal>

      <input id="post-modal-input" type="checkbox" ref={secondInputRef} />
      <label htmlFor="post-modal-input">Checkbox after the modal</label>
    </div>
  );
};
WithAriaHiddenNodeExceptions.args = defaultArgs;