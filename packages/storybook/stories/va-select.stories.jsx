/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getWebComponentDocs, propStructure } from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/va-select',
};

const defaultArgs = {
  'label': 'Branch of Service',
  'name': 'branch',
  'value': 'army',
  'required': false,
  'error': null,
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
        aria-live-region-text={ariaLiveRegionText}
        use-add-button={useAddButton}
      >
        {modifiedOptions}
      </va-select>
    </>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);

export const Required = Template.bind({});
Required.args = { ...defaultArgs, required: true };

export const ErrorMessage = Template.bind({});
ErrorMessage.args = { ...defaultArgs, error: 'There was a problem' };

export const DynamicOptions = Template.bind({});
DynamicOptions.args = { ...defaultArgs, 'use-add-button': true };
