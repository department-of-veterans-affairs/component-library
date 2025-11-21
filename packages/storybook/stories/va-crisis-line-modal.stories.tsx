import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
const crisisLineModalDocs = getWebComponentDocs('va-crisis-line-modal');

export default {
  title: 'Components/Crisis Line Modal',
  id: 'components/va-crisis-line-modal',
  parameters: {
    componentSubtitle: 'va-crisis-line-modal web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={crisisLineModalDocs} />,
    },
  },
};

const defaultArgs = {
  'phone-number': undefined,
  'phone-extension': undefined,
  'text-number': undefined,
  'chat-url': undefined,
  'tty-number': '711',
  'tty-crisis-extension': '988',
  'trigger-only': false,
  'modal-only': false,
};

const Template = ({
  'phone-number': phoneNumber,
  'phone-extension': phoneExtension,
  'text-number': textNumber,
  'chat-url': chatUrl,
  'tty-number': ttyNumber,
  'tty-crisis-extension': ttyCrisisExtension,
  'trigger-only': triggerOnly,
  'modal-only': modalOnly,
}) => (
  <va-crisis-line-modal
    phone-number={phoneNumber}
    phone-extension={phoneExtension}
    text-number={textNumber}
    chat-url={chatUrl}
    tty-number={ttyNumber}
    tty-crisis-extension={ttyCrisisExtension}
    trigger-only={triggerOnly}
    modal-only={modalOnly}
  />
);

const ExternalOpenEventTemplate = ({
  'phone-number': phoneNumber,
  'phone-extension': phoneExtension,
  'text-number': textNumber,
  'chat-url': chatUrl,
  'tty-number': ttyNumber,
  'tty-crisis-extension': ttyCrisisExtension,
}) => (
  <div style={{ display: 'grid', gap: '1rem' }}>
    <va-button text="Open crisis line modal"
      onClick={() => document.dispatchEvent(new CustomEvent('va-crisis-line-modal:open'))}
    ></va-button>
    <va-crisis-line-modal
      modal-only
      phone-number={phoneNumber}
      phone-extension={phoneExtension}
      text-number={textNumber}
      chat-url={chatUrl}
      tty-number={ttyNumber}
      tty-crisis-extension={ttyCrisisExtension}
    />
  </div>
);

const baseArgTypes = propStructure(crisisLineModalDocs);
const overrideArgTypes = {
  ...baseArgTypes,
  'tty-number': {
    ...baseArgTypes['tty-number'],
    table: {
      ...baseArgTypes['tty-number']?.table,
      defaultValue: { summary: '711' },
    },
  },
  'tty-crisis-extension': {
    ...baseArgTypes['tty-crisis-extension'],
    table: {
      ...baseArgTypes['tty-crisis-extension']?.table,
      defaultValue: { summary: '988' },
    },
  },
  'va-crisis-line-modal:open': {
    control: { disable: true },
    description: 'Dispatch `document.dispatchEvent(new CustomEvent(\'va-crisis-line-modal:open\'))` to open a modal instance.',
    table: { category: 'Events' },
  },
};

export const Default = Template.bind(null);
Default.argTypes = overrideArgTypes;
Default.args = { ...defaultArgs };

export const CustomContacts = Template.bind(null);
CustomContacts.argTypes = overrideArgTypes;
CustomContacts.args = {
  ...defaultArgs,
  'phone-number': '123-456-7890',
  'phone-extension': '5',
  'text-number': '98765',
  'chat-url': 'https://customchat.example.com',
  'tty-number': '111-222-3333',
  'tty-crisis-extension': '123',
};

export const ExternalOpenEvent = ExternalOpenEventTemplate.bind(null);
ExternalOpenEvent.argTypes = overrideArgTypes;
ExternalOpenEvent.args = {
  ...defaultArgs,
  'modal-only': true,
};
ExternalOpenEvent.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates opening the modal by dispatching the document event `va-crisis-line-modal:open` from an external button while rendering only the modal instance.',
    },
  },
};