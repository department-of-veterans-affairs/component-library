import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const buttonDocs = getWebComponentDocs('va-button');

export default {
  title: 'Components/Button USWDS',
  id: 'uswds/va-button',
  parameters: {
    componentSubtitle: `va-button web component`,
    docs: {
      page: () => <StoryDocs data={buttonDocs} />,
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
  'text': 'Default',
  'dont-send-form': undefined,
  'message-aria-describedby': 'Optional description text for screen readers',
  'dontSendForm':undefined,
};

const Template = ({
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
  dontSendForm,
  messageAriaDescribedby,
}) => {
  return (
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
      dont-send-form={dontSendForm}
      text={text}
      onClick={e => console.log(e)}
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
  disabled: true,
  text: "Disabled",
};


const Template2 = ({
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
  dontSendForm ,
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
        dont-send-form = {dontSendForm }
        message-aria-describedby={messageAriaDescribedby}
      />
      <button type='submit' onClick={e=>onclk(e)}>native button {dontSendForm.toString()}1</button>
    </form>
  );
}

export const Submitted = Template2.bind(null);
Submitted.args = {
  ...defaultArgs,
  onsub : (e)=>{ 
    // e.preventDefault();
    console.log(e.target, "I am submitted!!");
    alert ("form onsubmit method fired!!--on form");
  },
  onclk : (e)=>{ 
    console.log("called the on click method-on button", e.target);
    alert( "onclick happened on button"); 
    // const theForm = e.target.closest('form');
    // const submitEvent = new CustomEvent('submit', {
    //   bubbles: true,
    //   cancelable: true,
    //   composed: true,
    // });
    // theForm.dispatchEvent(submitEvent);
    // theForm.submit(); 
},
  submit: true,
  text: "Submit me",
  dontSendForm: false
};
