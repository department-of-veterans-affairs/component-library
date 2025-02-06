import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const comboBoxDocs = getWebComponentDocs('va-combo-box');

export default {
  title: 'Components/Combo Box USWDS',
  id: 'uswds/va-combo-box',
  parameters: {
    componentSubtitle: 'va-combo-box web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={comboBoxDocs} />,
    },
  },
};

const defaultArgs = {
  label: 'Select a fruit',
  name: 'fruit',
  value: '',
  required: false,
  error: undefined,
  messageAriaDescribedby: undefined,
  options: [
    <option value="apple">Apple</option>,
    <option value="banana">Banana</option>,
    <option value="blackberry">Blackberry</option>,
    <option value="blueberry">Blueberry</option>,
    <option value="boysenberry">Boysenberry</option>,
    <option value="cherry">Cherry</option>,
    <option value="crab apple">Crab Apple</option>,
    <option value="cranberry">Cranberry</option>,
    <option value="custard apple">Custard apple</option>,
    <option value="date">Date</option>,
    <option value="elderberry">Elderberry</option>,
    <option value="fig">Fig</option>,
    <option value="gooseberry">Gooseberry</option>,
    <option value="mango">Mango</option>,
    <option value="mangosteen">Mangosteen</option>,
    <option value="marionberry">Marionberry</option>,
    <option value="pineapple">Pineapple</option>,
    <option value="raspberry">Raspberry</option>,
    <option value="rambutan">Rambutan</option>,
    <option value="starfruit">Starfruit</option>,
    <option value="strawberry">Strawberry</option>
  ],
};

const optGroupArgs = {
  ...defaultArgs,
  label: 'Select a fruit or vegetable',
  options: [
    <>
      <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="apricot">Apricot</option>
        <option value="cantaloupe">Cantaloupe</option>
      </optgroup>
      <optgroup label="Vegetables">
        <option value="cabbage">Cabbage</option>
        <option value="Potatoes">Potatoes</option>
      </optgroup>
      <option value="sweet-potatoes">Sweet Potatoes</option>
      <option value="cherry">Cherry</option>
      <option value="clementine">Clementine</option>
    </>
  ],
};

const Template = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  options,
  placeholder,
  disabled,
  messageAriaDescribedby,
}) => {

  return (
    <va-combo-box
      label={label}
      name={name}
      value={value}
      required={required}
      error={error}
      hint={hint}
      placeholder={placeholder}
      disabled={disabled}
      message-aria-describedby={messageAriaDescribedby}
    >
      {options}
    </va-combo-box>
  );
};

export const Default = Template.bind({});
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(comboBoxDocs);

export const WithDefaultValue = Template.bind({});
WithDefaultValue.args = {
  ...defaultArgs,
  value: 'banana',
};

export const WithError = Template.bind({});
WithError.args = {
  ...defaultArgs,
  error: 'This field contains an error.',
};

export const Required = Template.bind({});
Required.args = {
  ...defaultArgs,
  required: true,
};

export const WithPlaceholderText = Template.bind({});
WithPlaceholderText.args = {
  ...defaultArgs,
  placeholder: '--Select--',
};

export const WithHintText = Template.bind({});
WithHintText.args = {
  ...defaultArgs,
  hint: 'This is example hint text',
};

export const WithMessageAriaDescribedBy = Template.bind({});
WithMessageAriaDescribedBy.args = {
  ...defaultArgs,
  messageAriaDescribedby: 'This is example aria message',
};

export const OptGroups = Template.bind({});
OptGroups.args = {
  ...optGroupArgs,
};