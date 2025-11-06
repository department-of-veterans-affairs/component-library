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
  'trigger-ref': undefined,
};

const Template = ({
  'phone-number': phoneNumber,
  'phone-extension': phoneExtension,
  'text-number': textNumber,
  'chat-url': chatUrl,
  'tty-number': ttyNumber,
  'tty-crisis-extension': ttyCrisisExtension,
}) => {
  return (
    <va-crisis-line-modal
      phone-number={phoneNumber}
      phone-extension={phoneExtension}
      text-number={textNumber}
      chat-url={chatUrl}
      tty-number={ttyNumber}
      tty-crisis-extension={ttyCrisisExtension}
    />
  );
};

const ExternalTriggerTemplate = ({
  'phone-number': phoneNumber,
  'phone-extension': phoneExtension,
  'text-number': textNumber,
  'chat-url': chatUrl,
  'tty-number': ttyNumber,
  'tty-crisis-extension': ttyCrisisExtension,
  'trigger-ref': triggerRef,
}) => {
  const resolvedTrigger = triggerRef || '#external-clm-trigger';
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <button id="external-clm-trigger" type="button">
        Open crisis line modal
      </button>
      <va-crisis-line-modal
        trigger-ref={resolvedTrigger}
        phone-number={phoneNumber}
        phone-extension={phoneExtension}
        text-number={textNumber}
        chat-url={chatUrl}
        tty-number={ttyNumber}
        tty-crisis-extension={ttyCrisisExtension}
      />
    </div>
  );
};

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
  'trigger-ref': {
    control: 'text',
    description:
      'CSS selector or HTMLElement reference of an external trigger element that opens the modal.',
    table: { category: 'accessibility' },
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

export const ExternalTrigger = ExternalTriggerTemplate.bind(null);
ExternalTrigger.argTypes = overrideArgTypes;
ExternalTrigger.args = {
  ...defaultArgs,
  'trigger-ref': '#external-clm-trigger',
  'phone-number': '123-456-7890',
  'phone-extension': '7',
  'text-number': '77777',
  'chat-url': 'https://external-trigger-chat.example.com',
  'tty-number': '999-888-7777',
  'tty-crisis-extension': '321',
};
ExternalTrigger.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates opening the modal from an existing external button using the trigger-ref attribute. Internal trigger is omitted. Shows explicit TTY defaults.',
    },
  },
};