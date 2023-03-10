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
  title: `Components/Radio button`,
  id: 'components/va-radio',
  subcomponents: componentStructure(radioItem),
  parameters: {
    componentSubtitle: `va-radio web component`,
    docs: {
      page: () => <StoryDocs data={radioDocs} />,
    },
  },
};

const defaultFocusSelector = '.nav-header > h2';

/**
 * Web components may not have their shadow DOM rendered right away, so we need
 * to wait & check before setting focus on the selector; if not found after max
 * iterations, then fall back to the default selector (step _ of _ h2)
 * Discussion: https://dsva.slack.com/archives/CBU0KDSB1/p1676479946812439
 * @param {String} selector - focus target selector
 * @param {Element} root - starting element of the querySelector; may be a
 *  shadowRoot
 * @example waitForRenderThenFocus('h3', document.querySelector('va-radio').shadowRoot);
 */
function waitForRenderThenFocus(
  selector,
  root = document,
  timeInterval = 250,
) {
  const maxIterations = 6; // 1.5 seconds
  let count = 0;
  const interval = setInterval(() => {
    if ((root || document).querySelector(selector)) {
      clearInterval(interval);
      focusElement(selector, {}, root);
    } else if (count >= maxIterations) {
      clearInterval(interval);
      focusElement(defaultFocusSelector); // fallback to breadcrumbs
    }
    count += 1;
  }, timeInterval);
}

function focusElement(selectorOrElement, options, root) {
  const el =
    typeof selectorOrElement === 'string'
      ? (root || document).querySelector(selectorOrElement)
      : selectorOrElement;

  if (el) {
    // Use getAttribute to grab the "tabindex" attribute (returns string), not
    // the "tabIndex" property (returns number). Focusable elements will
    // automatically have a tabIndex of zero, otherwise it's -1.
    const tabindex = el.getAttribute('tabindex');
    // No need to add, or remove a tabindex="0"
    if (el.tabIndex !== 0) {
      el.setAttribute('tabindex', '-1');
      if (typeof tabindex === 'undefined' || tabindex === null) {
        // Remove tabindex on blur. If a web-component is focused using a -1
        // tabindex and is not removed on blur, the shadow elements inside will
        // not be focusable
        el.addEventListener(
          'blur',
          () => {
            el.removeAttribute('tabindex');
          },
          { once: true },
        );
      }
    }
    el.focus(options);
  }
}

const vaRadioConst = args => {
  const {
    'enable-analytics': enableAnalytics,
    error,
    label,
    hint,
    required,
    'label-header-level': labelHeaderLevel,
    ...rest
  } = args;

  setTimeout(() => {
    waitForRenderThenFocus('h3', document.querySelector('va-radio')?.shadowRoot)
  }, 1000);


  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
      label-header-level={labelHeaderLevel}
    >
      <va-radio-option label="Option one" name="example" value="1" />
      <va-radio-option label="Option two with an extra long label, so we can get it to wrap" name="example" value="2" />
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
}) => {
  return (
    <>
    <VaRadio
      enableAnalytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      onVaValueChange={e => console.log('Selected radio option:', e?.detail?.value)}>
      <VaRadioOption label="Option one" name="example" value="1" />
      <VaRadioOption label="Option two" name="example" value="2" />
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
      >
        <va-radio-option id="no1" label="No" name="group1" value="1" />
        <va-radio-option
          id="yes1"
          label="Yes - Any Veteran"
          name="group1"
          value="2"
        />
      </va-radio>
      <br />
      <va-radio
        enable-analytics={enableAnalytics}
        error={error}
        label={label}
        required={required}
      >
        <va-radio-option id="no2" label="No" name="group2" value="1" />
        <va-radio-option
          id="yes2"
          label="Yes - Any Veteran"
          name="group2"
          value="2"
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
    ...rest
  } = args;
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
    >
      <va-radio-option
        label="Option one"
        name="example"
        value="1"
        description="This is optional text that can be used to describe the label in more detail." />
      <va-radio-option label="Option two" name="example" value="2" />
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
    ...rest
  } = args;
  return (
    <va-radio
      enable-analytics={enableAnalytics}
      error={error}
      label={label}
      required={required}
      hint={hint}
    >
      <va-radio-option
        label="Option one"
        name="example"
        value="1"
        tile
        description="This is optional text that can be used to describe the label in more detail." />
      <va-radio-option label="Option two" name="example" value="2" tile />
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
  'label-header-level': '3',
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