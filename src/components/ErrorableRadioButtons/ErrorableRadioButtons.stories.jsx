import React, { useState } from 'react';
import ErrorableRadioButtons from './ErrorableRadioButtons';

export default {
  title: 'Components/ErrorableRadioButtons',
  component: ErrorableRadioButtons,
};

const Template = args => {
  const [value, setValue] = useState(args.value);
  const onChange = newVal => setValue(newVal);
  const errorMessage =
    value?.value === 'Invalid option' ? 'Invalid option selected' : '';

  return (
    <div style={{ paddingLeft: '1em' }}>
      <ErrorableRadioButtons
        {...args}
        value={value}
        onValueChange={onChange}
        errorMessage={errorMessage}
      />
    </div>
  );
};

const defaultArgs = {
  options: [
    'First option',
    {
      label: 'Second option with expanded content',
      value: 'option-two',
      additional:
        'This is the expanded content. It may be plain text or a React node.',
    },
    'Third option',
  ],
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  options: defaultArgs.options.concat(['Invalid option']),
  value: {
    value: 'Invalid option',
  },
};
