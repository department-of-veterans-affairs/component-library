import {
  getWebComponentDocs,
  propStructure, StoryDocs,
  useErrorToggle,
  errorToggleArgTypes,
 } from './wc-helpers';
 import { VaComboBox } from '@department-of-veterans-affairs/web-components/react-bindings';

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
  onVaSelect: e => {
    console.log('Selected value:', e.detail.value);
  },
  options: [
    <option key="apple" value="apple">Apple</option>,
    <option key="banana" value="banana">Banana</option>,
    <option key="blackberry" value="blackberry">Blackberry</option>,
    <option key="blueberry" value="blueberry">Blueberry</option>,
    <option key="boysenberry" value="boysenberry">Boysenberry</option>,
    <option key="cherry" value="cherry">Cherry</option>,
    <option key="crab-apple" value="crab apple">Crab Apple</option>,
    <option key="cranberry" value="cranberry">Cranberry</option>,
    <option key="custard-apple" value="custard apple">Custard apple</option>,
    <option key="date" value="date">Date</option>,
    <option key="elderberry" value="elderberry">Elderberry</option>,
    <option key="fig" value="fig">Fig</option>,
    <option key="gooseberry" value="gooseberry">Gooseberry</option>,
    <option key="mango" value="mango">Mango</option>,
    <option key="mangosteen" value="mangosteen">Mangosteen</option>,
    <option key="marionberry" value="marionberry">Marionberry</option>,
    <option key="pineapple" value="pineapple">Pineapple</option>,
    <option key="raspberry" value="raspberry">Raspberry</option>,
    <option key="rambutan" value="rambutan">Rambutan</option>,
    <option key="starfruit" value="starfruit">Starfruit</option>,
    <option key="strawberry" value="strawberry">Strawberry</option>,
  ],
};

const Template = args => {
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
    onVaSelect
  } = args;

  const { errorMsg, handleClick } = useErrorToggle(error, focusEl);

  return (
    <>
      <VaComboBox
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
        onVaSelect={onVaSelect}
      >
        {options}
      </VaComboBox>
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
WithMessageAriaDescribedBy.parameters = {
  chromatic: { disableSnapshot: true },
};


const optGroupArgs = {
  ...defaultArgs,
  label: 'Select produce',
  options: [
    <option key="basil" value="basil">Basil</option>,
    <option key="chives" value="chives">Chives</option>,
    <option key="parsley" value="parsley">Parsley</option>,
    <optgroup key="fruits" label="Fruits">
      <option key="apple" value="apple">Apple</option>
      <option key="apricot" value="apricot">Apricot</option>
      <option key="cantaloupe" value="cantaloupe">Cantaloupe</option>
      <option key="cherry" value="cherry">Cherry</option>
      <option key="peach" value="peach">Peach</option>
    </optgroup>,
    <optgroup key="vegetables" label="Vegetables">
      <option key="bok-choy" value="bok-choy">Bok Choy</option>
      <option key="cabbage" value="cabbage">Cabbage</option>
      <option key="chard" value="chard">Chard</option>
      <option key="potatoes" value="potatoes">Potatoes</option>
    </optgroup>
  ],
};

export const OptionGroups = Template.bind({});
OptionGroups.args = {
  ...optGroupArgs,
};
// Snapshots disabled because visual difference is only apparent after interaction.
// TODO: Enable snapshots after integrating Storybook play function
OptionGroups.parameters = {
  chromatic: { disableSnapshot: true },
};

