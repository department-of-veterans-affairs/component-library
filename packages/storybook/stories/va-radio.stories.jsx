import React from 'react';
import { VaRadio, VaRadioOption} from '@department-of-veterans-affairs/web-components/react-bindings';

import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

VaRadio.displayName = 'VaRadio';
VaRadioOption.displayName = 'VaRadioOption';

const radioDocs = getWebComponentDocs('va-radio');
const radioItem = getWebComponentDocs('va-radio-option');

export default {
  title: `Components/Radio button`,
  id: 'components/va-radio',
  subcomponents: componentStructure(radioItem),
  parameters: {
    componentSubtitle: `va-radio web component`,
    docs: {
      page: () => <StoryDocs data={radioDocs} />,
    },
  },
};

const Template = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-radio-option label="Option one" name="example" value="1" />
      <va-radio-option label="Option two" name="example" value="2" />
    </va-radio>
  );
};

const ReactBindingExample = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <>
    <VaRadio 
      enableAnalytics={enableAnalytics}
      error={error}
      label={label}
      required={required} 
      onVaValueChange={e => console.log('Selected radio option:', e?.detail?.value)}>
      <VaRadioOption label="Option one" name="example" value="1" />
      <VaRadioOption label="Option two" name="example" value="2" />
    </VaRadio>
    </>
  );
};

const IdUsageTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no1" label="No" name="example" value="1" />
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="example"
          value="2"
        />
      </va-radio>
      <br />
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no2" label="No" name="example" value="1" />
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="example"
          value="2"
        />
      </va-radio>
    </>
  );
};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'This is a label',
  'required': false,
  'error': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(radioDocs);

export const ReactBindingWithCustomEvent = ReactBindingExample.bind(null);
ReactBindingWithCustomEvent.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const IDUsage = IdUsageTemplate.bind(null);
IDUsage.args = {
  ...defaultArgs,
  required: true,
};