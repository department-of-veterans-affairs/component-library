import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonDocs = getWebComponentDocs('va-button');

export default {
  title: 'Components/Button USWDS',
  id: 'uswds/va-button',
  parameters: {
    componentSubtitle: 'va-button web component',
    docs: {
      page: () => <StoryDocs storyDefault={Primary} data={buttonDocs} />,
    },
  },
};

const defaultArgs = {
  'back': undefined,
  'big': undefined,
  'continue': undefined,
  'disable-analytics': undefined,
  'disabled': undefined,
  'full-width': false,
  'label': undefined,
  'secondary': undefined,
  'primary-alternate': undefined,
  'submit': undefined,
  'message-aria-describedby': 'Optional description text for screen readers',
  'onClick': e => console.log(e),
};

const Template = ({
  back,
  big,
  _continue, // "continue" is a reserved word and it doesn't seem to work here as-is.
  disableAnalytics,
  disabled,
  'full-width': fullWidth,
  loading,
  label,
  secondary,
  primaryAlternate,
  submit,
  text,
  messageAriaDescribedby,
  onClick,
}) => {
  return (
    <va-button
      back={back}
      big={big}
      continue={_continue}
      disable-analytics={disableAnalytics}
      disabled={disabled}
      full-width={fullWidth}
      loading={loading}
      label={label}
      secondary={secondary}
      primary-alternate={primaryAlternate}
      submit={submit}
      text={!loading && !text ? null : text}
      onClick={onClick}
      message-aria-describedby={messageAriaDescribedby}
    />
  );
};

export const Primary = Template.bind(null);
Primary.args = {
  ...defaultArgs,
  text: 'Default',
};
Primary.argTypes = propStructure(buttonDocs);

export const PrimaryAlternate = Template.bind(null);
PrimaryAlternate.args = {
  ...defaultArgs,
  primaryAlternate: true,
  text: 'Primary Alternate',
};

export const Secondary = Template.bind(null);
Secondary.args = {
  ...defaultArgs,
  secondary: true,
  text: 'Secondary',
};

export const Big = Template.bind(null);
Big.args = {
  ...defaultArgs,
  big: true,
  text: 'Big button',
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  _continue: true,
};

export const ContinueCustomText = Template.bind(null);
ContinueCustomText.args = {
  ...defaultArgs,
  _continue: true,
  text: 'Save and continue',
};

export const Back = Template.bind(null);
Back.args = {
  ...defaultArgs,
  back: true,
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  disabled: true,
  text: 'Default',
};

export const Loading = Template.bind(null);
Loading.args = {
  ...defaultArgs,
  text: 'Click to load',
  onClick: e => {
    e.target.setAttribute('text', '');
    e.target.setAttribute('loading', 'true');
    setTimeout(() => {
      e.target.setAttribute('text', 'Click to load');
      e.target.setAttribute('loading', 'false');
    }, 5000);
  },
};

export const FullWidth = Template.bind(null);
FullWidth.args = {
  ...defaultArgs,
  'full-width': true,
  'text': 'Default',
};

const TemplateWithForm = ({
  back,
  big,
  _continue,
  disableAnalytics,
  disabled,
  label,
  secondary,
  primaryAlternate,
  submit,
  text,
  messageAriaDescribedby,
  handleSubmit,
  handleClick,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <p>
        This is inside a form element, which has a callback for onSubmit() and
        onClick() that displays an alert when the form is submitted
      </p>
      <va-button
        back={back}
        big={big}
        continue={_continue}
        disable-analytics={disableAnalytics}
        disabled={disabled}
        label={label}
        secondary={secondary}
        primary-alternate={primaryAlternate}
        submit={submit}
        text={text}
        onClick={e => handleClick(e)}
        message-aria-describedby={messageAriaDescribedby}
      />
    </form>
  );
};

export const Submitted = TemplateWithForm.bind(null);
Submitted.args = {
  ...defaultArgs,
  handleSubmit: event => {
    console.log('Form onSubmit callback fired!', event);
    alert('Form onSubmit callback fired!');
  },
  handleClick: event => {
    console.log('Form onClick callback fired!', event);
    alert('Button onClick callback fired!');
  },
  submit: 'prevent',
  text: 'Submit',
};
