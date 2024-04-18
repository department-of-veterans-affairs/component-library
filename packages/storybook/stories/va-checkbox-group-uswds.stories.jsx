import React, { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
  applyFocus,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/Checkbox group USWDS',
  id: 'uswds/va-checkbox-group',
  subcomponents: componentStructure(checkbox),
  parameters: {
    componentSubtitle: 'va-checkbox-group web component',
    actions: {
      handles: ['component-library-analytics'],
    },
    docs: {
      page: () => <StoryDocs data={checkBoxGroupDocs} />,
    },
  },
};

const vaCheckboxGroup = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    required,
    hint,
    'label-header-level': labelHeaderLevel,
    ...rest
  } = args;
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      label-header-level={labelHeaderLevel}
    >
      <va-checkbox label="Sojourner Truth" name="example test" value="1" />
      <va-checkbox label="Frederick Douglass" name="example" value="2" />
      <va-checkbox
        label="Booker T. Washington"
        name="example"
        value="3"
      />
      <va-checkbox
        label="George Washington Carver"
        name="example"
        value="4"
        disabled
      />
    </va-checkbox-group>
  );
};

const Template = args => vaCheckboxGroup(args);

const USWDSTiled = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  hint,
}) => {
  return (
    <>
      <va-checkbox-group
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        hint={hint}
      >
        <va-checkbox
          id="soujourner-truth"
          label="Soujourner Truth"
          checkbox-description="This is optional text that can be used to describe the label in more detail."
          name="group1"
          value="1"
          tile
        />
        <va-checkbox
          id="frederick-douglass"
          label="Frederick Douglass"
          name="group1"
          value="2"
          tile
        />
        <va-checkbox
          id="booker-t-washington"
          label="Booker T. Washington"
          name="group1"
          value="3"
          tile
        />
        <va-checkbox
          id="george-washington-carver"
          label="George Washington Carver"
          name="group1"
          value="4"
          tile
          disabled
        />
      </va-checkbox-group>
    </>
  );
};

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button
        onClick={e => setLang('es')}
        style={{ fontSize: '16px' }}
        text="Español"
      />
      <va-button
        onClick={e => setLang('en')}
        style={{ fontSize: '16px' }}
        text="English"
      />
      <va-button
        onClick={e => setLang('tl')}
        style={{ fontSize: '16px' }}
        text="Tagalog"
      />
      <div style={{ marginTop: '20px' }}>{vaCheckboxGroup(args)}</div>
    </div>
  );
};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'Select any historical figure',
  'required': false,
  'error': null,
  'hint': null,
  'label-header-level': '',
  'use-forms-pattern': null,
  'form-heading-level': null,
  'form-heading': null,
  'form-description': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

export const LabelHeader = Template.bind(null);
LabelHeader.args = {
  ...defaultArgs,
  'label': 'This is a label containing an H3',
  'label-header-level': '3',
};

export const WithHintText = Template.bind(null);
WithHintText.args = {
  ...defaultArgs,
  hint: 'This is example hint text',
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

const SingleCheckboxTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox label="Option one" name="example" value="1" />
    </va-checkbox-group>
  );
};

const FormsPatternMultipleTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  tile,
  'message-aria-describedby': messageAriaDescribedBy,
}) => {
  const handleClick = () => {
    const header = document
      .getElementById('form-pattern-multiple-input')
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-checkbox-group
        enable-analytics={enableAnalytics}
        error="This is an error message"
        label={label}
        required={required}
        id="form-pattern-multiple-input"
        use-forms-pattern="multiple"
        form-heading-level={1}
        form-heading="Multiple Form Pattern"
        form-description="This is the additional form-description prop"
      >
        <va-checkbox
          id="soujourner-truth"
          label="Soujourner Truth"
          name="multiple"
          value="1"
        />
        <va-checkbox
          id="frederick-douglass"
          label="Frederick Douglass"
          name="multiple"
          value="2"
        />
        <va-checkbox
          id="booker-t-washington"
          label="Booker T. Washington"
          name="multiple"
          value="3"
        />
        <va-checkbox
          id="george-washington-carver"
          label="George Washington Carver"
          name="multiple"
          value="4"
        />
      </va-checkbox-group>

      <va-checkbox-group
        enable-analytics={enableAnalytics}
        error={error}
        label="What's your relationship to the Veteran?"
        required={required}
      >
        <va-checkbox
          label="I'm responsible for the care of the Veteran."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm appointed by the court to represent the Veteran."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm authorized to make decision for the Veteran under durable power of attorney, as an attorney-in-fact or agent."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm a manager or principle officer representing an institution that's responsible for the care of the Veteran."
          name="example"
          value="1"
        />
      </va-checkbox-group>
      <hr />
      <va-button text="click to focus header" onClick={handleClick} uswds={false}></va-button>
    </>
  );
};

const FormsPatternSingleTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  'message-aria-describedby': messageAriaDescribedBy,
}) => {
  const id = Math.floor(Math.random() * 10) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-input-${id}`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-checkbox-group
        enable-analytics={enableAnalytics}
        error={error}
        required={required}
        id={`form-pattern-single-input-${id}`}
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="What's your relationship to the Veteran?"
        form-description="This is the additional form-description prop"
      >
        <va-checkbox
          label="I'm responsible for the care of the Veteran."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm appointed by the court to represent the Veteran."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm authorized to make decision for the Veteran under durable power of attorney, as an attorney-in-fact or agent."
          name="example"
          value="1"
        />
        <va-checkbox
          label="I'm a manager or principle officer representing an institution that's responsible for the care of the Veteran."
          name="example"
          value="1"
        />
        <div slot="form-description">
          <p>HTML passed into the forms-pattern slot:</p>
          <ul>
            <li>Social security number</li>
            <li>VA file number</li>
            <li>Service number</li>
          </ul>
        </div>
      </va-checkbox-group>

      <hr />

      <va-button text="click to focus header" onClick={handleClick} uswds={false}></va-button>
    </>
  );
};

export const SingleCheckbox = SingleCheckboxTemplate.bind(null);
SingleCheckbox.args = {
  ...defaultArgs,
};

export const Tile = USWDSTiled.bind(null);
Tile.args = {
  ...defaultArgs,
  label: 'Select any historical figure',
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  error: 'This is a custom error message',
  required: true,
};

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = {
  ...defaultArgs,
};

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  error: 'This is an error message',
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = {
  ...defaultArgs,
};
