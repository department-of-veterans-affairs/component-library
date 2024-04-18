/* eslint-disable react/prop-types */
import React from 'react';
import { getWebComponentDocs, propStructure, StoryDocs, applyFocus } from './wc-helpers';

const textareaDocs = getWebComponentDocs('va-textarea');

export default {
  title: `Components/Textarea USWDS`,
  id: 'uswds/va-textarea',
  parameters: {
    componentSubtitle: `va-textarea web component`,
    docs: {
      page: () => <StoryDocs data={textareaDocs} />,
    },
  },
};

const defaultArgs = {
  'name': 'my-input',
  'label': 'Describe your situation',
  'enable-analytics': false,
  'required': false,
  'error': undefined,
  'maxlength': undefined,
  'value': undefined,
  'placeholder': '',
  'hint': null,
  'charcount': false,
  'message-aria-describedby': 'Optional description text for screen readers',
  'use-forms-pattern': null,
  'form-heading-level': null,
  'form-heading': null,
  'form-description': null,
};

const Template = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
  hint,
  charcount,
  'message-aria-describedby': messageAriaDescribedby,
}) => {
  return (
    <va-textarea id="test"
      name={name}
      label={label}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      hint={hint}
      maxlength={maxlength}
      value={value}
      placeholder={placeholder}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
      charcount={charcount}
      message-aria-describedby={messageAriaDescribedby}
    />
  );
};

const ResizableTemplate = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
  uswds,
  hint,
}) => {
  return (
    <va-textarea
      class="resize-y"
      name={name}
      label={label}
      enable-analytics={enableAnalytics}
      required={required}
      error={error}
      hint={hint}
      maxlength={maxlength}
      value={value}
      placeholder={placeholder}
      onBlur={e => console.log('blur event', e)}
      onInput={e => console.log('input event value', e.target.value)}
    />
  );
};

const FormsPatternSingleTemplate = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
  hint,
}) => {
  const id = (Math.floor(Math.random() * 100) + 1);
  const handleClick = () => {
    const header = document.getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-textarea
        id={`form-pattern-single-input-${id}`}
        class="resize-y"
        name={name}
        label={label}
        enable-analytics={enableAnalytics}
        required={required}
        error={error}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e => console.log('input event value', e.target.value)}
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="Enter additional information">

        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul>
            <li>Sojourner Truth</li>
            <li>Frederick Douglass</li>
            <li>Booker T. Washington</li>
            <li>George Washington Carver</li>
          </ul>
        </div>
      </va-textarea>
      <hr />

      <va-button 
        text="click to focus header" 
        onClick={handleClick}
        uswds={false}>
      </va-button>
    </>
  );
};


const FormsPatternMultipleTemplate = ({
  name,
  label,
  'enable-analytics': enableAnalytics,
  required,
  error,
  maxlength,
  value,
  placeholder,
  hint,
}) => {
  const id = (Math.floor(Math.random() * 100) + 1);
  const handleClick = () => {
    const header = document.getElementById(`form-pattern-multiple-input`)
      ?.shadowRoot
      ?.getElementById('form-question');

    applyFocus(header);
  }
  return (
    <>
      <va-textarea
        id={`form-pattern-multiple-input`}
        class="resize-y"
        name={name}
        label={label}
        enable-analytics={enableAnalytics}
        required={required}
        error={error}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e => console.log('input event value', e.target.value)}
        use-forms-pattern="multiple"
        form-heading-level={1}
        form-heading="Enter additional information"
      />
      <va-textarea
        class="resize-y"
        name={name}
        label={"Describe your hopes"}
        enable-analytics={enableAnalytics}
        required={required}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e => console.log('input event value', e.target.value)}
      />
      <va-textarea
        class="resize-y"
        name={name}
        label={"Describe your dreams"}
        enable-analytics={enableAnalytics}
        required={required}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e => console.log('input event value', e.target.value)}
      />
      <hr />

      <va-button 
        text="click to focus header"
        onClick={handleClick}
        uswds={false}>
      </va-button>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(textareaDocs);

export const Error = Template.bind(null);
Error.args = { ...defaultArgs, error: 'This is an error message' };

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const MaxLength = Template.bind(null);
MaxLength.args = {
  ...defaultArgs,
  maxlength: '16',
  placeholder: 'No more than 16 characters',
};

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: "This is example hint text" };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const ResizableControl = ResizableTemplate.bind(null);
ResizableControl.args = { ...defaultArgs };

export const WithCharacterCount = Template.bind(null);
WithCharacterCount.args = { ...defaultArgs, charcount: true, maxlength: '100'}

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = { ...defaultArgs }

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = { 
  ...defaultArgs,
   error:'This is an error message',
}

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = { ...defaultArgs }


export const FormsPatternMultipleError = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultipleError.args = { 
  ...defaultArgs,
   error:'This is an error message',
}