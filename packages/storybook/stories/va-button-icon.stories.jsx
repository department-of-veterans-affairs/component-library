import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonIconDocs = getWebComponentDocs('va-button-icon');

export default {
  title: 'Components/Button - Icon',
  id: 'components/va-button-icon',
  parameters: {
    componentSubtitle: `va-button-icon web component`,
    docs: {
      page: () => <StoryDocs data={buttonIconDocs} />,
    },
  },
};

const defaultArgs = {
  'disable-analytics': undefined,
  'disabled': undefined,
  'label': undefined,
  'button-type': 'change-file',
};

const Template = ({
  'disable-analytics': disableAnalytics,
  disabled,
  label,
  'button-type': buttonType,
}) => {
  return (
    <va-button-icon
      disable-analytics={disableAnalytics}
      disabled={disabled}
      label={label}
      onClick={e => console.log(e)}
      button-type={buttonType}
    />
  );
};

export const ChangeFile = Template.bind(null);
ChangeFile.args = {
  ...defaultArgs,
};
ChangeFile.argTypes = propStructure(buttonIconDocs);

export const Delete = Template.bind(null);
Delete.args = {
  ...defaultArgs,
  'button-type': 'delete',
};

export const Cancel = Template.bind(null);
Cancel.args = {
  ...defaultArgs,
  'button-type': 'cancel',
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  'disabled': true,
  'button-type': 'change-file',
};
