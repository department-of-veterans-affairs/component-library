import React, { useEffect, useState, setState } from 'react';

import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

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
  const [value, setValue] = useState('');
  const [radioOptionSelected, setRadioOptionSelected] = useState('');

  useEffect(() => {
    const radio = document.querySelector('va-radio');
    radio.addEventListener('vaValueChange', e => {
      setValue(e?.detail?.value);
    });
    radio.addEventListener('radioOptionSelected', e => {
      setRadioOptionSelected(e?.detail?.value);
    });
  }, [])
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option label="Option one" name="example" value="1" />
        <va-radio-option label="Option two" name="example" value="2" />
      </va-radio>
    <p>vaValueChange Selected value: {value}</p>
    <p>radioOptionSelected Selected value: {radioOptionSelected}</p>
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
        <va-radio-option id="no1" label="No" name="no" value="1" />
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="yes"
          value="2"
        />
      </va-radio>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no2" label="No" name="no" value="1" />
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="yes"
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

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const IdUsage = IdUsageTemplate.bind(null);
IdUsage.args = {
  ...defaultArgs,
  required: true,
};
