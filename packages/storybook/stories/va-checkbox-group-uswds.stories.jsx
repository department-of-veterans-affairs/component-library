import React, { useState, useEffect } from 'react';
import {
  getWebComponentDocs,
  componentStructure,
  propStructure,
  StoryDocs,
} from './wc-helpers';

const checkBoxGroupDocs = getWebComponentDocs('va-checkbox-group');
const checkbox = getWebComponentDocs('va-checkbox');

export default {
  title: 'USWDS/Checkbox group USWDS',
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
    uswds,
    ...rest
  } = args;
  return (
    <va-checkbox-group
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      uswds={uswds}
    >
      <va-checkbox uswds label="Sojourner Truth" name="example" value="1" />
      <va-checkbox uswds label="Frederick Douglass" name="example" value="2" />
      <va-checkbox uswds label="Booker T. Washington" name="example" value="3" />
      <va-checkbox uswds label="George Washington Carver" name="example" value="4" disabled />
    </va-checkbox-group>
  )
}

const Template = args => vaCheckboxGroup(args);


const USWDSTiled = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  hint,
  uswds,
}) => {
  return (
    <>
      <va-checkbox-group
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds={uswds}
        hint={hint}
      >
        <va-checkbox
          id="soujourner-truth"
          label="Soujourner Truth"
          checkbox-description="This is optional text that can be used to describe the label in more detail."
          name="group1"
          value="1"
          uswds={uswds}
          tile
        />
        <va-checkbox
          id="frederick-douglass"
          label="Frederick Douglass"
          name="group1"
          value="2"
          uswds={uswds}
          tile
        />
        <va-checkbox
          id="booker-t-washington"
          label="Booker T. Washington"
          name="group1"
          value="3"
          uswds={uswds}
          tile
        />
        <va-checkbox
          id="george-washington-carver"
          label="George Washington Carver"
          name="group1"
          value="4"
          uswds={uswds}
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
      <button onClick={e => setLang('es')} style={{fontSize: '16px'}}>Español</button>
      <button onClick={e => setLang('en')} style={{fontSize: '16px'}}>English</button>
      <button onClick={e => setLang('tl')} style={{fontSize: '16px'}}>Tagalog</button>
      <div style={{marginTop: '20px'}}>
        {vaCheckboxGroup(args)}
      </div>
    </div>
)};

const defaultArgs = {
  'enable-analytics': false,
  'label': 'Select any historical figure',
  'required': false,
  'error': null,
  'hint': null,
  'uswds': true,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(checkBoxGroupDocs);

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
  uswds,
}) => {
  return (
    <va-checkbox-group
      uswds={uswds}
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
    >
      <va-checkbox uswds label="Option one" name="example" value="1" />
    </va-checkbox-group>
  );
};

export const SingleCheckbox = SingleCheckboxTemplate.bind(null);
SingleCheckbox.args = {
  ...defaultArgs,
};

export const Tile = USWDSTiled.bind(null);
Tile.args = {
  ...defaultArgs,
  uswds: true,
  label: 'Select any historical figure',
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  error: 'This is a custom error message',
  required: true,
};
