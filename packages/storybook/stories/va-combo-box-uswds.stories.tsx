import {
  getWebComponentDocs,
  propStructure, StoryDocs,
  useErrorToggle,
  errorToggleArgTypes,
 } from './wc-helpers';

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
  argTypes: {
    ...propStructure(comboBoxDocs),
    ...errorToggleArgTypes(['#error-demo-wrapper','#input-error-message']),
  }
};

const defaultArgs = {
  label: 'Select a fruit',
  name: 'fruit',
  value: '',
  required: false,
  error: undefined,
  messageAriaDescribedby: undefined,
  showToggleFocusButton: false,
  focusEl: null,
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
    <option value="strawberry">Strawberry</option>,
  ],
};

const ComboBoxComponent = (args) => {
  const {
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
    showToggleFocusButton,
    focusEl,
  } = args;

  const { errorMsg, handleClick } = useErrorToggle(error, focusEl);

  return (
    <>
      <va-combo-box
        label={label}
        name={name}
        value={value}
        required={required}
        error={errorMsg}
        hint={hint}
        placeholder={placeholder}
        disabled={disabled}
        message-aria-describedby={messageAriaDescribedby}
        id={showToggleFocusButton ? 'error-demo-wrapper' : undefined}
      >
        {options}
      </va-combo-box>
      {showToggleFocusButton && (
        <va-button
          text="Toggle error state"
          onClick={handleClick}
          class="vads-u-margin-top--2"
        ></va-button>
      )}
    </>
  );
};

const Template = (args) => <ComboBoxComponent {...args} />;

export const Default = Template.bind({});
Default.args = { ...defaultArgs };

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

const optGroupArgs = {
  ...defaultArgs,
  label: 'Select produce',
  options: [
    <>
      <option value="basil">Basil</option>
      <option value="chives">Chives</option>
      <option value="parsley">Parsley</option>
      <optgroup label="Fruits">
        <option value="apple">Apple</option>
        <option value="apricot">Apricot</option>
        <option value="cantaloupe">Cantaloupe</option>
        <option value="cherry">Cherry</option>
        <option value="peach">Peach</option>
      </optgroup>
      <optgroup label="Vegetables">
        <option value="bok-choy">Bok Choy</option>
        <option value="cabbage">Cabbage</option>
        <option value="chard">Chard</option>
        <option value="Potatoes">Potatoes</option>
      </optgroup>
    </>,
  ],
};

export const OptionGroups = Template.bind({});
OptionGroups.args = {
  ...optGroupArgs,
};
