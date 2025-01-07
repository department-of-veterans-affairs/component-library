import React from 'react';
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
  'label': undefined,
  'secondary': undefined,
  'primary-alternate': undefined,
  'submit': undefined,
  'message-aria-describedby': 'Optional description text for screen readers',
  onClick: (e) => console.log(e)
};

const Template = ({
  back,
  big,
   _continue,
  disableAnalytics,
  disabled,
  loading,
  label,
  secondary,
  primaryAlternate,
  submit,
  text,
  messageAriaDescribedby,
  onClick
}) => {
  return (
    <va-button
      back={back}
      big={big}
      continue={_continue}
      disable-analytics={disableAnalytics}
      disabled={disabled}
      loading={loading}
      label={label}
      secondary={secondary}
      primary-alternate={primaryAlternate}
      submit={submit}
      text={!loading && !text ? 'Default' : text}
      onClick= {onClick}
      message-aria-describedby={messageAriaDescribedby}
    />
  );
};

export const Primary = Template.bind(null);
Primary.args = {
  ...defaultArgs,
};
Primary.argTypes = propStructure(buttonDocs);

export const PrimaryAlternate = Template.bind(null);
PrimaryAlternate.args = {
  ...defaultArgs,
  primaryAlternate: true,
  text: "Primary Alternate"
};

export const Secondary = Template.bind(null);
Secondary.args = {
  ...defaultArgs,
  secondary: true,
  text: "Secondary"
};

export const Big = Template.bind(null);
Big.args = {
  ...defaultArgs,
  big: true,
  text: "Big button",
};

export const Continue = Template.bind(null);
Continue.args = {
  ...defaultArgs,
  _continue: true,
  text: undefined,
};

export const Back = Template.bind(null);
Back.args = {
  ...defaultArgs,
  back: true,
  text: undefined,
};

export const Disabled = Template.bind(null);
Disabled.args = {
  ...defaultArgs,
  disabled: true
};

export const Loading = Template.bind(null);
Loading.args = {
  ...defaultArgs,
  text: 'Click to load',
  onClick: (e) => {
    e.target.setAttribute('text', '');
    e.target.setAttribute('loading', 'true');
    setTimeout(() => {
      e.target.setAttribute('text', 'Click to load');
      e.target.setAttribute('loading', 'false');
    }, 5000)
  }
  
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
  onsub,
  onclk,
}) => {
  return (
    <form onSubmit={onsub}>
      <p>This is inside a form, which has an onsubmit() that displays an alert when the form is submitted</p>
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
        onClick={e => onclk(e) }
        message-aria-describedby={messageAriaDescribedby}
      />
    </form>
  );
}

export const Submitted = TemplateWithForm.bind(null);
Submitted.args = {
  ...defaultArgs,
  onsub : (e)=>{ 
    console.log(e.target, "I am submitted!");
    alert ("form onsubmit method fired!--on form");
  },
  onclk : (e)=>{ 
    console.log("called the on click method-on button", e.target);
    alert( "onclick happened on button"); 

},
  submit: 'prevent',
  text: "Submit me",
};
