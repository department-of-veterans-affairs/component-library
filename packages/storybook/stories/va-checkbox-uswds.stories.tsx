import { useState, useEffect } from 'react';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';
import {
  VaCheckbox,
  VaModal,
} from '@department-of-veterans-affairs/web-components/react-bindings';

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
  'value': 'Test',
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
      value={rest.value}
    />
  );
};

const Template = args => vaCheckbox(args);

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');

  useEffect(() => {
    document.querySelector('main')?.setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button
        onClick={_ => setLang('es')}
        style={{ fontSize: '16px' }}
        text="Español"
      />
      <va-button
        onClick={_ => setLang('en')}
        style={{ fontSize: '16px' }}
        text="English"
      />
      <va-button
        onClick={_ => setLang('tl')}
        style={{ fontSize: '16px' }}
        text="Tagalog"
      />
      <div style={{ marginTop: '20px' }}>{vaCheckbox(args)}</div>
    </div>
  );
};

const IndeterminateTemplate = ({}) => {
  const [checked, setChecked] = useState([true, true, false]);

  useEffect(() => {
    handleIndeterminate();
  }, [checked]);

  const handleIndeterminate = () => {
    const indeterminateCheckbox = document.querySelector(
      '.indeterminate-checkbox',
    ) as HTMLInputElement;

    // If all of the checkbox states are true, set indeterminate checkbox to checked.
    if (indeterminateCheckbox && checked.every(val => val === true)) {
      indeterminateCheckbox.checked = true;
      indeterminateCheckbox.indeterminate = false;
      // If any one of the checkbox states is true, set indeterminate checkbox to indeterminate.
    } else if (checked.some(val => val === true)) {
      indeterminateCheckbox.checked = false;
      indeterminateCheckbox.indeterminate = true;
      // Otherwise, reset the indeterminate checkbox to unchecked.
    } else {
      indeterminateCheckbox.checked = false;
      indeterminateCheckbox.indeterminate = false;
    }
  };

  const handleCheckboxChange = event => {
    const index = parseInt(event.target.getAttribute('data-index'));
    const nextChecked = checked.map((value, i) => {
      if (i === index) {
        return event.detail.checked;
      } else {
        return value;
      }
    });
    setChecked(nextChecked);
  };

  const handleSelectAllToggle = event => {
    const checkboxes =
      document.querySelectorAll<HTMLInputElement>('.example-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
    });

    // toggle state of all checkboxes to match the "select all" checkbox
    const nextChecked = checked.map(() => event.target.checked);
    setChecked(nextChecked);
  };

  return (
    <>
      <fieldset className="vads-u-margin-bottom--3">
        <legend className="vads-u-font-size--md vads-u-margin-bottom--3">
          Indeterminate Checkbox Example
        </legend>
        <VaCheckbox
          class="indeterminate-checkbox"
          label="Select all historical figures"
          indeterminate
          onVaChange={e => handleSelectAllToggle(e)}
        />

        <hr className="vads-u-margin-y--2" />

        <VaCheckbox
          class="example-checkbox"
          id="checkbox-1"
          checked={checked[0]}
          data-index={0}
          label="Sojourner Truth"
          onVaChange={e => handleCheckboxChange(e)}
        />

        <VaCheckbox
          class="example-checkbox"
          id="checkbox-2"
          checked={checked[1]}
          data-index={1}
          label="George Washington Carver"
          onVaChange={e => handleCheckboxChange(e)}
        />

        <VaCheckbox
          class="example-checkbox"
          id="checkbox-3"
          checked={checked[2]}
          data-index={2}
          label="Frederick Douglass"
          onVaChange={e => handleCheckboxChange(e)}
        />
      </fieldset>
      <va-link
        external
        href="https://github.com/department-of-veterans-affairs/component-library/blob/df914c5d452b5e9aa3507bb8e9ccf9a739be763c/packages/storybook/stories/va-checkbox-uswds.stories.jsx#L99-L189"
        text="View this indeterminate code example in our repo"
      />
    </>
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

export const TileWithCustomContent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onCloseEvent = () => {
    setIsVisible(false);
    // Make sure to move focus back to the remove button on cancel; when
    // removing, focus should go to the button or link to add a new entry
    document
      .querySelector('va-checkbox va-button')
      .shadowRoot.querySelector('button')
      .focus();
  };
  const openModal = e => {
    // Stop checkbox from toggling when clicking the button
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(true);
  };
  return (
    <>
      <VaModal
        clickToClose
        visible={isVisible}
        onCloseEvent={onCloseEvent}
        onPrimaryButtonClick={onCloseEvent}
        onSecondaryButtonClick={onCloseEvent}
        modalTitle="Remove entry"
        primaryButtonText="Pretend"
        secondaryButtonText="Cancel"
      >
        <p>This is supposed to remove the entry</p>
      </VaModal>
      <va-checkbox label="Issue 1" tile>
        <div slot="internal-description">
          <div className="vads-u-margin-top--0p5">
            <strong>Detail</strong>: Internal description slot for issue 1
          </div>
          <div className="vads-u-margin-top--1">
            <strong>Date</strong> Jan 2, 2025
          </div>
        </div>
      </va-checkbox>
      <va-checkbox label="Issue 2" tile>
        <div slot="internal-description">
          <div className="vads-u-margin-top--0p5">
            <strong>Detail</strong>: Internal description slot for issue 2
          </div>
          <div className="vads-u-margin-top--1">
            <strong>Date</strong> Jan 4, 2025
          </div>
          <div className="vads-u-margin-top--1">
            <va-link href="#title-with-custom-content" text="Edit" />
            <va-button
              onClick={openModal}
              secondary
              text="Remove"
              class="vads-u-margin-left--2"
            />
          </div>
        </div>
      </va-checkbox>
    </>
  );
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
  <>
    <p>
      <strong>Note:</strong> Adding a <code>description</code> prop will block
      rendering of the <code>slot="description"</code> content.
    </p>
    <hr />
    <va-checkbox {...props} onBlur={e => console.log(e)}>
      <p slot="description">
        I'm a paragraph tag with <code>slot="description"</code>
      </p>
      <p slot="description">
        I'm another paragraph tag with <code>slot="description"</code>
      </p>
    </va-checkbox>
  </>
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
