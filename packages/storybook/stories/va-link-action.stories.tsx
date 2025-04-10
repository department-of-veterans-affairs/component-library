import { Fragment } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const linkDocs = getWebComponentDocs('va-link-action');

export default {
  title: 'Components/Link - Action',
  id: 'components/va-link-action',
  parameters: {
    componentSubtitle: `va-link-action web component`,
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={linkDocs} />,
    },
  },
};

const defaultArgs = {
  'disable-analytics': undefined,
  'href': 'https://www.va.gov',
  'text': undefined,
  'type': 'primary',
  'label': undefined,
};

const Template = ({
  'disable-analytics': disableAnalytics,
  href,
  text,
  type, // Add the type parameter here
  'message-aria-describedby': messageAriaDescribedBy,
  label,
}) => {
  return (
    <va-link-action
      disable-analytics={disableAnalytics}
      href={href}
      text={text}
      type={type} // Add the type attribute here
      label={label}
      message-aria-describedby={messageAriaDescribedBy}
    />
  );
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
  'href': 'https://va.gov/vso/',
  'text': 'Call to action',
  'message-aria-describedby': 'Custom message',
  'label': 'This is an aria label for the Action Link',
};
Default.argTypes = propStructure(linkDocs);

const VariantTemplate = ({
  'disable-analytics': disableAnalytics,
  href,
  text,
  type,
  label,
}) => {
  return (
    <va-link-action
      disable-analytics={disableAnalytics}
      href={href}
      text={text}
      type={type}
      label={label}
    />
  );
};

export const Secondary = VariantTemplate.bind(null);
Secondary.args = {
  ...defaultArgs,
  href: 'https://va.gov/vso/',
  text: 'Call to action',
  type: 'secondary',
};

export const Reverse = VariantTemplate.bind(null);
Reverse.args = {
  ...defaultArgs,
  href: 'https://va.gov/vso/',
  text: 'Call to action',
  type: 'reverse',
};
Reverse.parameters = {
  backgrounds: { default: 'dark' },
};

// Add these new story exports for the primary-entry variation
export const PrimaryEntry = Template.bind({});
PrimaryEntry.args = {
  text: 'Access my health records',
  href: 'https://va.gov/records',
  type: 'primary-entry',
};
PrimaryEntry.parameters = {
  docs: {
    description: {
      story: 'The primary-entry variation provides a distinct entry point style with an arrow shape.',
    },
  },
};

export const PrimaryEntryLongText = Template.bind({});
PrimaryEntryLongText.args = {
  text: 'Access my health records with a much longer text that will wrap to multiple lines to demonstrate the arrow shape behavior',
  href: 'https://va.gov/records',
  type: 'primary-entry',
};
PrimaryEntryLongText.parameters = {
  docs: {
    description: {
      story: 'Primary-entry variation with longer text to demonstrate text wrapping behavior.',
    },
  },
};
