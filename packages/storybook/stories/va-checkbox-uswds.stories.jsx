/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import { VaCheckbox } from '@department-of-veterans-affairs/web-components/react-bindings';

VaCheckbox.displayName = 'VaCheckbox';

const checkboxDocs = getWebComponentDocs('va-checkbox');

export default {
  title: 'Components/Checkbox USWDS',
  id: 'uswds/va-checkbox',
  parameters: {
    componentSubtitle: 'va-checkbox web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={checkboxDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Sojourner Truth',
  'checked': false,
  'error': null,
  'required': false,
  'description': null,
  'enable-analytics': false,
  'hint': null,
  'tile': false,
  'message-aria-describedby': 'Optional description text for screen readers',
  'indeterminate': false,
};

const vaCheckbox = args => {
  const {
    checked,
    description,
    'enable-analytics': enableAnalytics,
    checkboxDescription,
    error,
    label,
    required,
    hint,
    tile,
    'message-aria-describedby': messageAriaDescribedBy,
    indeterminate,
    ...rest
  } = args;
  return (
    <va-checkbox
      checked={checked}
      description={description}
      enable-analytics={enableAnalytics}
      checkbox-description={checkboxDescription}
      error={error}
      label={label}
      hint={hint}
      required={required}
      tile={tile}
      onBlur={e => console.log(e)}
      message-aria-describedby={messageAriaDescribedBy}
      indeterminate={indeterminate}
    />
  );
};

const Template = args => vaCheckbox(args);

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
      <div style={{ marginTop: '20px' }}>{vaCheckbox(args)}</div>
    </div>
  );
};

const IndeterminateTemplate = (defaultArgs) => {
  const [checked, setChecked] = useState([false, false, false]);

  useEffect(() => {
    handleIndeterminate();
  }, [checked]);

  const handleIndeterminate = () => {
    const indeterminateCheckbox = document.querySelector('.indeterminate-checkbox');

    // If all of the checkbox states are true, set indeterminate checkbox to checked.
    if (checked.every(val => val === true)) {
      indeterminateCheckbox.checked = true;
      indeterminateCheckbox.indeterminate = false;
    // If any one of the checkbox states is true, set indeterminate checkbox to indeterminate.
    } else if (checked.some(val => val === true)) {
      indeterminateCheckbox.checked = false;
      indeterminateCheckbox.indeterminate = true;
    // Otherwise, reset the indeterminate checkbox to unchecked.
    } else {
      indeterminateCheckbox.checked = false;
      indeterminateCheckbox.indeterminate = false
    }
  };

  const handleCheckboxChange = (e) => {
    const index = parseInt(e.target.getAttribute('data-id'));
    const nextChecked= checked.map((value, i) => {
      if (i === index) {
        return e.detail.checked;
      } else {
        return value;
      }
    });
    setChecked(nextChecked);
  }

  const handleSelectAllToggle = e => {  
    const checkboxes = document.querySelectorAll('.example-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = e.target.checked;
    });

    // toggle state of all checkboxes to match the "select all" checkbox
    const nextChecked = checked.map(() => e.target.checked);
    setChecked(nextChecked)
  }

  return (
    <fieldset>
      <legend className="vads-u-font-size--md vads-u-margin-bottom--3">Indeterminate Checkbox Example</legend>
      <VaCheckbox
        class="indeterminate-checkbox"
        label="All Historical Figures"
        indeterminate={false}
        onVaChange={e => handleSelectAllToggle(e)}
      />

      <hr className="vads-u-margin-y--2" />

      <VaCheckbox
        class="example-checkbox"
        id="checkbox-1"
        data-id={0}
        label="Sojourner Truth"
        onVaChange={e => handleCheckboxChange(e)}
      />

      <VaCheckbox
        class="example-checkbox"
        id="checkbox-2"
        data-id={1}
        label="George Washington Carver"
        onVaChange={e => handleCheckboxChange(e)}
      />
  
      <VaCheckbox
        class="example-checkbox"
        id="checkbox-3"
        data-id={2}
        label="Frederick Douglass"
        onVaChange={e => handleCheckboxChange(e)}
      />
    </fieldset>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(checkboxDocs);

export const Tile = Template.bind(null);
Tile.args = {
  ...defaultArgs,
  tile: true,
  checkboxDescription:
    'This is optional text that can be used to describe the label in more detail.',
};

export const Checked = Template.bind(null);
Checked.args = { ...defaultArgs, checked: true };

export const WithHintText = Template.bind(null);
WithHintText.args = {
  ...defaultArgs,
  description: 'Adding some descriptive text above the checkbox.',
  hint: 'This is example hint text',
};

export const WithDescriptionString = Template.bind(null);
WithDescriptionString.args = {
  ...defaultArgs,
  description: 'Adding some descriptive text above the checkbox.',
};

export const WithDescriptionJSX = props => (
  <va-checkbox {...props} onBlur={e => console.log(e)}>
    <p slot="description">
      I'm a paragraph tag with <code>slot="description"</code>
    </p>
    <p slot="description">
      I'm another paragraph tag with <code>slot="description"</code>
    </p>
  </va-checkbox>
);
WithDescriptionJSX.args = { ...defaultArgs };

export const OnBackground = props => (
  <div style={{ background: '#f0f0f0', padding: '30px 5px' }}>
    <va-checkbox {...props} onBlur={e => console.log(e)}></va-checkbox>
  </div>
);
OnBackground.args = { ...defaultArgs };

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  description:
    'Notice how the red line to the left also covers this description.',
  error: 'There has been a problem',
};

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithAnalytics = Template.bind(null);
WithAnalytics.args = { ...defaultArgs, 'enable-analytics': true };

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = {
  ...defaultArgs,
  description:
    'Notice how the red line to the left also covers this description.',
  error: 'There has been a problem',
  required: true,
};

export const Indeterminate = IndeterminateTemplate.bind(null);
Indeterminate.args = { ...defaultArgs };
