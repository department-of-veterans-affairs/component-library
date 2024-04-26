/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/Select USWDS',
  id: 'uswds/va-select',
  parameters: {
    componentSubtitle: 'va-select web component',
    docs: {
      page: () => <StoryDocs data={selectDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Branch of Service',
  'name': 'options',
  'value': '',
  'required': false,
  'error': undefined,
  'hint': null,
  'aria-live-region-text': 'You selected',
  'aria-describedby-message': 'Optional description text for screen readers',
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
  'disabled': false,
};

const Template = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  'aria-live-region-text': ariaLiveRegionText,
  'aria-describedby-message': ariaDescribedbyMessage,
  options,
  'use-add-button': useAddButton,
  disabled,
}) => {
  const [modifiedOptions, setModifiedOptions] = useState(options);

  return (
    <>
      {useAddButton && (
        <va-button
          onClick={() => {
            setModifiedOptions([
              ...modifiedOptions,
              <option key="6" value="new">
                Something new
              </option>,
            ]);
          }}
          text="Add &quot;Something new&quot;"
        />
      )}
      <va-select
        label={label}
        name={name}
        value={value}
        required={required}
        error={error}
        hint={hint}
        aria-live-region-text={ariaLiveRegionText}
        message-aria-describedby={ariaDescribedbyMessage}
        use-add-button={useAddButton}
        disabled={disabled}
      >
        {modifiedOptions}
      </va-select>
    </>
  );
};

const InertTemplate = ({
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
      <p>
        This is an example of applying <code>inert</code> property for read only
        purposes.
      </p>
      {useAddButton && (
        <va-button
          onClick={() => {
            setModifiedOptions([
              ...modifiedOptions,
              <option key="6" value="new">
                Something new
              </option>,
            ]);
          }}
          text="Add &quot;Something new&quot;"
        />
      )}
      <va-select
        label={label}
        name={name}
        value={'navy'}
        required={required}
        error={error}
        hint={hint}
        inert
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

export const ReadOnly = InertTemplate.bind(null);
ReadOnly.args = { ...defaultArgs };

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');
  const { options, ...rest } = args;

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button onClick={e => setLang('es')} text="Español"/>
      <va-button onClick={e => setLang('en')} text="English"/>
      <va-select {...rest}>{options}</va-select>
    </div>
  );
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = { ...defaultArgs, required: true };
