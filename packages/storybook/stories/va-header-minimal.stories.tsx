import { VaHeaderMinimal } from '@department-of-veterans-affairs/web-components/react-bindings';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const minimalHeaderDocs = getWebComponentDocs('va-header-minimal');

export default {
  title: 'Components/Header - Minimal',
  id: 'components/va-header-minimal',
  parameters: {
    componentSubtitle: 'va-header-minimal web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={minimalHeaderDocs} />,
    },
  },
};

const defaultArgs = {
  'header': 'Authorization To Disclose Personal Information To A Third Party',
  'subheader': '',
  'enable-headings': false,
  'crisis-line-modal-prop-overrides': {},
};

const Template = ({
  header,
  subheader,
  enableHeadings,
  crisisLineModalPropOverrides,
}) => {

  return (
    <VaHeaderMinimal
      header={header}
      subheader={subheader}
      enableHeadings={enableHeadings}
      crisisLineModalPropOverrides={crisisLineModalPropOverrides}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(minimalHeaderDocs);

export const withSubheader = Template.bind(null);
withSubheader.args = {
  ...defaultArgs,
  subheader: '(VA Form 21-0845)',
};

export const WithHeadingsEnabled = Template.bind(null);
WithHeadingsEnabled.args = {
  ...defaultArgs,
  enableHeadings: true,
};

export const withCrisisLineModalOverrides = Template.bind(null);
withCrisisLineModalOverrides.args = {
  ...defaultArgs,
  crisisLineModalPropOverrides: {
    phoneNumber: '123',
    smsNumber: '456789',
  },
};