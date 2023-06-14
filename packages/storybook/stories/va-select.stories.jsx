/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/Select',
  id: 'components/va-select',
  parameters: {
    componentSubtitle: 'va-select web component',
    docs: {
      page: () => <StoryDocs data={selectDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Branch of Service',
  'name': 'branch',
  'value': 'army',
  'required': false,
  'error': undefined,
  'hint': null,
  'aria-live-region-text': 'You selected',
  'options': [
    <option key="1" value="navy">
      Navy
    </option>,
    <option key="2" value="army">
      Army
    </option>,
    <option key="3" value="marines">
      Marines
    </option>,
    <option key="4" value="air-force">
      Air Force
    </option>,
    <option key="5" value="coastguard">
      Coastguard
    </option>,
  ],
  'use-add-button': false,
};

const Template = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  'aria-live-region-text': ariaLiveRegionText,
  options,
  'use-add-button': useAddButton,
}) => {
  const [modifiedOptions, setModifiedOptions] = useState(options);

  return (
    <>
      {useAddButton && (
        <button
          onClick={() => {
            setModifiedOptions([
              ...modifiedOptions,
              <option key="6" value="new">
                Something new
              </option>,
            ]);
          }}
        >
          Add &quot;Something new&quot;
        </button>
      )}
      <va-select
        label={label}
        name={name}
        value={value}
        required={required}
        error={error}
        hint={hint}
        aria-live-region-text={ariaLiveRegionText}
        use-add-button={useAddButton}
      >
        {modifiedOptions}
      </va-select>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: 'This is example hint text' };

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = { ...defaultArgs, error: 'There was a problem' };

export const DynamicOptions = Template.bind(null);
DynamicOptions.args = { ...defaultArgs, 'use-add-button': true };

export const ReadOnly = Template.bind(null);
ReadOnly.args = { ...defaultArgs, uswds: true, inert: true };

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');
  const { options, ...rest } = args;

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <va-select {...rest}>{options}</va-select>
    </div>
  );
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = { ...defaultArgs, required: true };
