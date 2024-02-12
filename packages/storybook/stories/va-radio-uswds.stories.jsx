import React, { useState, useEffect } from 'react';
import {
  VaRadio,
  VaRadioOption,
} from '@department-of-veterans-affairs/web-components/react-bindings';
import { applyFocus } from './wc-helpers';

import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

VaRadio.displayName = 'VaRadio';
VaRadioOption.displayName = 'VaRadioOption';

const radioDocs = getWebComponentDocs('va-radio');
const radioItem = getWebComponentDocs('va-radio-option');

export default {
  title: `USWDS/Radio button USWDS`,
  id: 'uswds/va-radio',
  subcomponents: componentStructure(radioItem),
  parameters: {
    componentSubtitle: `va-radio web component`,
    docs: {
      page: () => <StoryDocs data={radioDocs} />,
    },
  },
};

const vaRadioConst = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    hint,
    name = 'group',
    required,
    uswds = true,
    'label-header-level': labelHeaderLevel,
    'header-aria-describedby': headerAriaDescribedby,
    ...rest
  } = args;

  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      uswds={uswds}
      hint={hint}
      label-header-level={labelHeaderLevel}
      header-aria-describedby={headerAriaDescribedby}
    >
      <va-radio-option
        label="Soujourner Truth"
        name={name}
        value="1"
        uswds={uswds}
      />
      <va-radio-option
        label="Frederick Douglass"
        name={name}
        value="2"
        uswds={uswds}
      />
      <va-radio-option
        label="Booker T. Washington"
        name={name}
        value="3"
        uswds={uswds}
      />
      <va-radio-option
        label="George Washington Carver"
        name={name}
        value="4"
        disabled
        uswds={uswds}
      />
    </va-radio>
  );
};

const Template = args => vaRadioConst(args);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button uswds onClick={e => setLang('es')} text="Español" />
      <va-button uswds onClick={e => setLang('en')} text="English" />
      <va-button uswds onClick={e => setLang('tl')} text="Tagalog" />
      <br />
      <br />
      {vaRadioConst(args)}
    </div>
  );
};

const ReactBindingExample = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <>
      <VaRadio
        uswds
        enableAnalytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        onVaValueChange={e =>
          console.log('Selected radio option:', e?.detail?.value)
        }
      >
        <VaRadioOption uswds label="Option one" name="example" value="1" />
        <VaRadioOption uswds label="Option two" name="example" value="2" />
      </VaRadio>
    </>
  );
};

const IdUsageTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds
      >
        <va-radio-option id="no1" label="No" name="group1" value="1" uswds />
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="group1"
          value="2"
          uswds
        />
      </va-radio>
      <br />
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds
      >
        <va-radio-option id="no2" label="No" name="group2" value="1" uswds />
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="group2"
          value="2"
          uswds
        />
      </va-radio>
    </>
  );
};

const USWDSTiled = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  uswds,
  hint,
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds={uswds}
        hint={hint}
      >
        <va-radio-option
          id="soujourner-truth1"
          label="Soujourner Truth"
          name="group3"
          value="1"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="frederick-douglass1"
          label="Frederick Douglass"
          name="group3"
          value="2"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="booker-t-washington1"
          label="Booker T. Washington"
          name="group3"
          value="3"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="george-washington-carver1"
          label="George Washington Carver"
          name="group3"
          value="4"
          description="This is optional text that can be used to describe the label in more detail."
          disabled={true}
          uswds={uswds}
          tile
        />
      </va-radio>
    </>
  );
};

const USWDSTiledError = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  uswds,
  hint,
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error="This is an error"
        label={label}
        required={required}
        uswds={uswds}
        hint={hint}
      >
        <va-radio-option
          id="soujourner-truth2"
          label="Soujourner Truth"
          name="group4"
          value="1"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="frederick-douglass2"
          label="Frederick Douglass"
          name="group4"
          value="2"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="booker-t-washington2"
          label="Booker T. Washington"
          name="group4"
          value="3"
          description="This is optional text that can be used to describe the label in more detail."
          uswds={uswds}
          tile
        />
      </va-radio>
    </>
  );
};

const FormsPatternMultipleTemplate = ({ uswds, label, required }) => {
  const handleClick = () => {
    const header = document
      .getElementById('form-pattern-multiple-input')
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-radio
        required={required}
        error="This is an error"
        id="form-pattern-multiple-input"
        uswds={uswds}
        label={label}
        use-forms-pattern="multiple"
        form-heading-level={1}
        form-heading="Multiple fields form pattern"
        form-description="This is the additional form-description prop"
        header-aria-describedby={label}
      >
        <va-radio-option
          label="Soujourner Truth"
          id="soujourner-truth6"
          name="group6"
          uswds
          value="1"
        />
        <va-radio-option
          label="Frederick Douglass"
          id="frederick-douglass6"
          name="group6"
          uswds
          value="2"
        />
        <va-radio-option
          label="Booker T. Washington"
          id="booker-t-washington6"
          name="group6"
          uswds
          value="3"
        />
        <va-radio-option
          label="George Washington Carver"
          id="george-washington-carver6"
          name="group6"
          uswds
          value="4"
        />
      </va-radio>

      <va-radio
        required="true"
        uswds={uswds}
        label="Burn pit S2.1, did you serve in any of there locations?"
      >
        <va-radio-option label="Yes" name="group7" id="yes7" uswds value="1" />
        <va-radio-option label="No" name="group7" id="no7" uswds value="2" />
        <va-radio-option
          label="Not sure"
          name="group7"
          id="not-sure7"
          uswds
          value="3"
        />
      </va-radio>

      <hr />
      <va-button text="click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

const FormsPatternSingleTemplate = ({
  uswds,
  required,
  error,
  label,
  name,
}) => {
  const id = Math.floor(Math.random() * 10) + 1;
  const handleClick = () => {
    const header = document
      .getElementById(`form-pattern-single-radio-${id}`)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-radio
        required={required}
        error={error}
        id={`form-pattern-single-radio-${id}`}
        uswds={uswds}
        label={label}
        use-forms-pattern="single"
        form-heading-level={1}
        form-heading="Burn pit S2.1, did you serve in any of there locations?"
        form-description="This is the additional form-description prop"
      >
        <va-radio-option label="Yes" name={name} uswds value="11" />
        <va-radio-option label="No" name={name} uswds value="22" />
        <va-radio-option label="Not sure" name={name} uswds value="33" />

        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul>
            <li>Bahrain</li>
            <li>Iraq</li>
            <li>Kuwait</li>
            <li>Oman</li>
            <li>Qatar</li>
            <li>Saudi Arabia</li>
            <li>Somalia</li>
            <li>The United Arab Emirates(UAE)</li>
            <li>The airspace above any of these locations</li>
          </ul>
        </div>
      </va-radio>

      <hr />

      <va-button text="click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'Select one historical figure',
  'hint': '',
  'required': false,
  'error': null,
  'uswds': true,
  'label-header-level': '',
  'header-aria-describedby': null,
  'use-forms-pattern': null,
  'form-heading-level': null,
  'form-heading': null,
  'form-description': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(radioDocs);

export const Tile = USWDSTiled.bind(null);
Tile.args = {
  ...defaultArgs,
  uswds: true,
  name: 'tile-example',
  label: 'Select one historical figure',
};

export const Hint = Template.bind(null);
Hint.args = {
  ...defaultArgs,
  name: 'hint-example',
  hint: "We're asking this because of XYZ",
};

export const LabelHeader = Template.bind(null);
LabelHeader.args = {
  ...defaultArgs,
  'label-header-level': '3',
  'name': 'header-example',
  'header-aria-describedby': 'Optional description text for screen readers',
};

export const OnBackground = props => (
  <div style={{ background: '#f1f1f1', padding: '30px 5px' }}>
    <va-radio label="This is a label" uswds>
      <va-radio-option id="no3" label="No" name="group5" value="1" uswds />
      <va-radio-option
        id="yes3"
        label="Yes - Any Veteran"
        name="group5"
        value="2"
        uswds
      />
    </va-radio>
  </div>
);
OnBackground.args = { ...defaultArgs };

export const ReactWithCustomEvent = ReactBindingExample.bind(null);
ReactWithCustomEvent.args = {
  ...defaultArgs,
};

export const Error = USWDSTiledError.bind(null);
Error.args = {
  ...defaultArgs,
  error: 'There has been an error',
};

export const IDUsage = IdUsageTemplate.bind(null);
IDUsage.args = {
  ...defaultArgs,
  required: true,
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  name: 'i18n-example',
  required: true,
};

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = {
  ...defaultArgs,
  name: 'single1',
};

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  error: 'This is an error message',
  name: 'single2',
  required: true
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = {
  ...defaultArgs,
};
