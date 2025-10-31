import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaCrisisLineModal } from '@department-of-veterans-affairs/web-components/react-bindings';
const crisisLineModalDocs = getWebComponentDocs('va-crisis-line-modal');

export default {
  title: 'Components/Crisis Line Modal',
  id: 'components/va-crisis-line-modal',
  parameters: {
    componentSubtitle: 'va-crisis-line-modal web component',
    docs: {
      page: () => (
        <StoryDocs storyDefault={Default} data={crisisLineModalDocs} />
      ),
    },
  },
};

const defaultArgs = {
  phoneNumber: undefined,
  textNumber: undefined,
  chatUrl: undefined,
  ttyNumber: undefined,
  // Added for external trigger story
  triggerRef: undefined,
};

const Template = ({
  phoneNumber,
  textNumber,
  chatUrl,
  ttyNumber,
}) => {
  return (
    <VaCrisisLineModal
      phoneNumber={phoneNumber}
      textNumber={textNumber}
      chatUrl={chatUrl}
      ttyNumber={ttyNumber}
    />
  );
};

// External trigger template
const ExternalTriggerTemplate = ({
  phoneNumber,
  textNumber,
  chatUrl,
  ttyNumber,
  triggerRef,
}) => {
  const resolvedTrigger = triggerRef || '#external-clm-trigger';
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <button id="external-clm-trigger" type="button">
        Open Crisis Line Modal
      </button>
      <VaCrisisLineModal
        triggerRef={resolvedTrigger}
        phoneNumber={phoneNumber}
        textNumber={textNumber}
        chatUrl={chatUrl}
        ttyNumber={ttyNumber}
      />
    </div>
  );
};

export const Default = Template.bind(null);
Default.argTypes = propStructure(crisisLineModalDocs);
Default.args = { ...defaultArgs };

export const CustomContacts = Template.bind(null);
CustomContacts.argTypes = propStructure(crisisLineModalDocs);
CustomContacts.args = {
  phoneNumber: '123-456-7890',
  textNumber: '98765',
  chatUrl: 'https://customchat.example.com',
  ttyNumber: '111-222-3333',
};

export const ExternalTrigger = ExternalTriggerTemplate.bind(null);
ExternalTrigger.argTypes = propStructure(crisisLineModalDocs);
ExternalTrigger.args = {
  ...defaultArgs,
  triggerRef: '#external-clm-trigger',
  phoneNumber: '123-456-7890',
  textNumber: '77777',
  chatUrl: 'https://external-trigger-chat.example.com',
  ttyNumber: '999-888-7777',
};
ExternalTrigger.parameters = {
  docs: {
    description: {
      story:
        'Demonstrates opening the modal from an existing external button using the triggerRef prop. The internal trigger button is not rendered.',
    },
  },
};

