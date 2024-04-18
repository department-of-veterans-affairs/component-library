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
  title: `V1 Components/Radio button`,
  id: 'components/va-radio',
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
    'label-header-level': labelHeaderLevel,
    'header-aria-describedby': headerAriaDescribedby,
    uswds,
    ...rest
  } = args;
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      label-header-level={labelHeaderLevel}
      header-aria-describedby={headerAriaDescribedby}
      uswds={uswds}
    >
      <va-radio-option label="Option one" name="example" value="1" uswds={uswds}/>
      <va-radio-option label="Option two with an extra long label, so we can get it to wrap" name="example" value="2" uswds={uswds}/>
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
    <div id="test">
      <button onClick={e => setLang('es')}>Español</button>
      <button onClick={e => setLang('en')}>English</button>
      <button onClick={e => setLang('tl')}>Tagalog</button>
      <br /><br />
      {vaRadioConst(args)}
    </div>
)};

const ReactBindingExample = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  uswds,
}) => {
  return (
    <>
    <VaRadio
      enableAnalytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      uswds={uswds}
      onVaValueChange={e => console.log('Selected radio option:', e?.detail?.value)}>
      <VaRadioOption label="Option one" name="example" value="1" uswds={uswds}/>
      <VaRadioOption label="Option two" name="example" value="2" uswds={uswds}/>
    </VaRadio>
    </>
  );
};

const IdUsageTemplate = ({
  'enable-analytics': enableAnalytics,
  error,
  label,
  required,
  uswds
}) => {
  return (
    <>
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds={uswds}
      >
        <va-radio-option id="no1" label="No" name="group1" value="1" uswds={uswds}/>
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="group1"
          value="2"
          uswds={uswds}
        />
      </va-radio>
      <br />
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
        uswds={uswds}
      >
        <va-radio-option id="no2" label="No" name="group2" value="1" uswds={uswds}/>
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="group2"
          value="2"
          uswds={uswds}
        />
      </va-radio>
    </>
  );
};

const OptionDescriptionExample = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    hint,
    required,
    uswds,
    ...rest
  } = args;
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      uswds={uswds}
    >
      <va-radio-option
        label="Option one"
        name="example-description"
        value="1"
        uswds={uswds}
        description="This is optional text that can be used to describe the label in more detail." />
      <va-radio-option label="Option two" name="example-description" value="2" uswds={uswds}/>
    </va-radio>
  )
}

const OptionTileExample = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    hint,
    required,
    uswds,
    ...rest
  } = args;
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      uswds={uswds}
    >
      <va-radio-option
        label="Option one"
        name="example-tile"
        value="1"
        tile
        uswds={uswds}
        description="This is optional text that can be used to describe the label in more detail." />
      <va-radio-option label="Option two" name="example-tile" value="2" tile uswds={uswds}/>
    </va-radio>
  )
}

const defaultArgs = {
  'enable-analytics': false,
  'label': 'This is a label',
  'hint': '',
  'required': false,
  'error': null,
  'uswds': false,
  'hint': '',
  'label-header-level': '',
  'header-aria-describedby': '',
  'header-aria-describedby': null,
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};
Default.argTypes = propStructure(radioDocs);

export const WithHintText = Template.bind(null);
WithHintText.args = {
  ...defaultArgs,
  hint: "This is example hint text",
};

export const WithDescriptionText = OptionDescriptionExample.bind(null);
WithDescriptionText.args = {
  ...defaultArgs,
};

export const LabelHeader = Template.bind(null);
LabelHeader.args = {
  ...defaultArgs,
  'label-header-level': '3',
  'header-aria-describedby': 'Optional description text for screen readers',
};

export const Tile = OptionTileExample.bind(null);
Tile.args = {
  ...defaultArgs,
};

export const ReactWithCustomEvent = ReactBindingExample.bind(null);
ReactWithCustomEvent.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
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
  error: 'There has been a problem',
  required: true,
};