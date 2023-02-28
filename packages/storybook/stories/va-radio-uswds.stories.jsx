import React, { useState, useEffect } from 'react';
import { VaRadio, VaRadioOption} from '@department-of-veterans-affairs/web-components/react-bindings';

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
    required,
    uswds,
    'label-header-level': labelHeaderLevel,
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
    >
    <va-radio-option
      id="soujourner-truth"
      label="Soujourner Truth"
      name="group1"
      value="1"
      uswds={uswds}
    />
    <va-radio-option
      id="frederick-douglass"
      label="Frederick Douglass"
      name="group1"
      value="2"
      uswds={uswds}
    />
    <va-radio-option
      id="booker-t-washington"
      label="Booker T. Washington"
      name="group1"
      value="3"
      uswds={uswds}
    />
    <va-radio-option
      id="george-washington-carver"
      label="George Washington Carver"
      name="group1"
      value="4"
      disabled
      uswds={uswds}
    />
  </va-radio>
  )
}

const Template = args => vaRadioConst(args);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main').setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <button style={{fontSize: '1rem'}} onClick={e => setLang('es')}>Español</button>
      <button style={{fontSize: '1rem'}} onClick={e => setLang('en')}>English</button>
      <button style={{fontSize: '1rem'}} onClick={e => setLang('tl')}>Tagalog</button>
      <br /><br />
      {vaRadioConst(args)}
    </div>
)};

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
      onVaValueChange={e => console.log('Selected radio option:', e?.detail?.value)}>
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
          id="soujourner-truth"
          label="Soujourner Truth"
          name="group1"
          value="1"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="frederick-douglass"
          label="Frederick Douglass"
          name="group1"
          value="2"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="booker-t-washington"
          label="Booker T. Washington"
          name="group1"
          value="3"
          uswds={uswds}
          tile
        />
        <va-radio-option
          id="george-washington-carver"
          label="George Washington Carver"
          name="group1"
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
            error='This is an error'
            label={label}
            required={required}
            uswds={uswds}
            hint={hint}
            >
            <va-radio-option
                id="soujourner-truth"
                label="Soujourner Truth"
                name="group1"
                value="1"
                uswds={uswds}
                tile
            />
            <va-radio-option
            id="frederick-douglass"
            label="Frederick Douglass"
            name="group1"
            value="2"
            uswds={uswds}
            tile
            />
            <va-radio-option
            id="booker-t-washington"
            label="Booker T. Washington"
            name="group1"
            value="3"
            description="This is optional text that can be used to describe the label in more detail."
            uswds={uswds}
            tile
            />
            </va-radio>
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
  label: 'Select one historical figure',
};

export const Hint = Template.bind(null);
Hint.args = {
  ...defaultArgs,
  hint: "We're asking this because of XYZ",
};

export const LabelHeader = Template.bind(null);
LabelHeader.args = {
  ...defaultArgs,
  'label-header-level': '3',
};

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
  required: true,
};