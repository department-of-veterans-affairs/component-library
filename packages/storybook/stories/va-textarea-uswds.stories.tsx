import { useState } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  applyFocus,
  useErrorToggle,
  errorToggleArgTypes,
} from './wc-helpers';

const textareaDocs = getWebComponentDocs('va-textarea');

export default {
  title: 'Components/Textarea USWDS',
  id: 'uswds/va-textarea',
  parameters: {
    componentSubtitle: 'va-textarea web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={textareaDocs} />,
    },
  },
  argTypes: {
    ...propStructure(textareaDocs),
    ...errorToggleArgTypes(['#error-demo-wrapper','#input-error-message','.input-wrap']),
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
  'label-header-level': null,
  'header-aria-describedby': null,
  'showToggleFocusButton': false,
  'focusEl': null,
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
  'label-header-level': labelHeaderLevel,
  'header-aria-describedby': headerAriaDescribedby,
  showToggleFocusButton,
  focusEl
}) => {

  const { errorMsg, handleClick } = useErrorToggle(error, focusEl);

  return (
    <>
      <va-textarea
        name={name}
        label={label}
        enable-analytics={enableAnalytics}
        required={required}
        error={errorMsg}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e =>
          console.log('input event value', (e.target as HTMLInputElement).value)
        }
        charcount={charcount}
        message-aria-describedby={messageAriaDescribedby}
        label-header-level={labelHeaderLevel}
        header-aria-describedby={headerAriaDescribedby}
        id={showToggleFocusButton ? 'error-demo-wrapper' : undefined}
      />
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
      className="resize-y"
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
      onInput={e =>
        console.log('input event value', (e.target as HTMLInputElement).value)
      }
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
  const id = Math.floor(Math.random() * 100) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-textarea
        id={`form-pattern-single-input-${id}`}
        className="resize-y"
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
        onInput={e =>
          console.log('input event value', (e.target as HTMLInputElement).value)
        }
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="Enter additional information"
      >
        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul className="vads-u-margin-bottom--2">
            <li>Sojourner Truth</li>
            <li>Frederick Douglass</li>
            <li>Booker T. Washington</li>
            <li>George Washington Carver</li>
          </ul>
        </div>
      </va-textarea>
      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
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
  const id = Math.floor(Math.random() * 100) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-multiple-input`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-textarea
        id={`form-pattern-multiple-input`}
        className="resize-y"
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
        onInput={e =>
          console.log('input event value', (e.target as HTMLInputElement).value)
        }
        use-forms-pattern="multiple"
        form-heading-level={1}
        form-heading="Enter additional information"
      />
      <va-textarea
        className="resize-y"
        name={name}
        label={'Describe your hopes'}
        enable-analytics={enableAnalytics}
        required={required}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e =>
          console.log('input event value', (e.target as HTMLInputElement).value)
        }
      />
      <va-textarea
        className="resize-y"
        name={name}
        label={'Describe your dreams'}
        enable-analytics={enableAnalytics}
        required={required}
        hint={hint}
        maxlength={maxlength}
        value={value}
        placeholder={placeholder}
        onBlur={e => console.log('blur event', e)}
        onInput={e =>
          console.log('input event value', (e.target as HTMLInputElement).value)
        }
      />
      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
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

export const LabelHeader = Template.bind(null);
LabelHeader.args = {
  ...defaultArgs,
  'label-header-level': '3',
  'name': 'header-example',
  'header-aria-describedby': 'Optional description text for screen readers',
  'required': true,
};

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: 'This is example hint text' };

export const WithHintTextAndHeaderLevel = Template.bind(null);
WithHintTextAndHeaderLevel.args = {
  ...defaultArgs,
  hint: 'This is example hint text',
  'label-header-level': '3',
};

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };
WithAnalytics.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ResizableControl = ResizableTemplate.bind(null);
ResizableControl.args = { ...defaultArgs };

export const WithCharacterCount = Template.bind(null);
WithCharacterCount.args = { ...defaultArgs, charcount: true, maxlength: '100' };

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = { ...defaultArgs };

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  error: 'This is an error message',
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = { ...defaultArgs };

export const FormsPatternMultipleError =
  FormsPatternMultipleTemplate.bind(null);
FormsPatternMultipleError.args = {
  ...defaultArgs,
  error: 'This is an error message',
};
