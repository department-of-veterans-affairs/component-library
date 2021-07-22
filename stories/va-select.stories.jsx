/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { getWebComponentDocs, StoryDocs, propStructure } from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/va-select',
  parameters: {
    docs: {
      /* eslint-disable-next-line react/display-name */
      page: () => <StoryDocs docs={selectDocs.docs} />,
    },
  },
};

const defaultArgs = {
  label: 'Branch of Service',
  name: 'branch',
  value: 'army',
  required: false,
  error: null,
  ariaLiveRegionText: 'You selected',
  options: [
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
  useAddButton: false,
};

const Template = ({
  label,
  name,
  value,
  required,
  error,
  ariaLiveRegionText,
  options,
  useAddButton,
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
DynamicOptions.args = { ...defaultArgs, useAddButton: true };
