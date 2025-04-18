import { useEffect, useState } from 'react';
import {
  getWebComponentDocs,
  propStructure,
  StoryDocs,
  applyFocus,
} from './wc-helpers';

const selectDocs = getWebComponentDocs('va-select');

export default {
  title: 'Components/Select USWDS',
  id: 'uswds/va-select',
  parameters: {
    componentSubtitle: 'va-select web component',
    docs: {
      page: () => <StoryDocs storyDefault={Default} data={selectDocs} />,
    },
  },
};

const defaultArgs = {
  'label': 'Branch of Service',
  'name': 'options',
  'value': '',
  'required': false,
  'error': undefined,
  'hint': null,
  'aria-live-region-text': 'You selected',
  'aria-describedby-message': 'Optional description text for screen readers',
  'options': [
    <option key="1" value="navy">
      Navy
    </option>,
    <option key="2" value="army">
      Army
    </option>,
    <option key="3" value="marines">
      Marines
    </option>,
    <option key="4" value="air-force">
      Air Force
    </option>,
    <option key="5" value="coastguard">
      Coastguard
    </option>,
  ],
  'use-add-button': false,
  'full-width': false,
};

const Template = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  'aria-live-region-text': ariaLiveRegionText,
  'aria-describedby-message': ariaDescribedbyMessage,
  options,
  'use-add-button': useAddButton,
  'full-width': fullWidth,
}) => {
  const [modifiedOptions, setModifiedOptions] = useState(options);

  return (
    <>
      {useAddButton && (
        <va-button
          onClick={() => {
            setModifiedOptions([
              ...modifiedOptions,
              <option key="6" value="new">
                Something new
              </option>,
            ]);
          }}
          text='Add "Something new"'
        />
      )}
      <va-select
        label={label}
        name={name}
        value={value}
        required={required}
        error={error}
        hint={hint}
        aria-live-region-text={ariaLiveRegionText}
        message-aria-describedby={ariaDescribedbyMessage}
        use-add-button={useAddButton}
        full-width={fullWidth}
      >
        {modifiedOptions}
      </va-select>
    </>
  );
};

const InertTemplate = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  'aria-live-region-text': ariaLiveRegionText,
  options,
  'use-add-button': useAddButton,
}) => {
  const [modifiedOptions, setModifiedOptions] = useState(options);

  return (
    <>
      <p>
        This is an example of applying <code>inert</code> property for read only
        purposes.
      </p>
      {useAddButton && (
        <va-button
          onClick={() => {
            setModifiedOptions([
              ...modifiedOptions,
              <option key="6" value="new">
                Something new
              </option>,
            ]);
          }}
          text='Add "Something new"'
        />
      )}
      <va-select
        label={label}
        name={name}
        value={'navy'}
        required={required}
        error={error}
        hint={hint}
        inert
        aria-live-region-text={ariaLiveRegionText}
        use-add-button={useAddButton}
      >
        {modifiedOptions}
      </va-select>
    </>
  );
};

export const Default = Template.bind(null);
Default.args = { ...defaultArgs };
Default.argTypes = propStructure(selectDocs);

export const Required = Template.bind(null);
Required.args = { ...defaultArgs, required: true };

export const WithHintText = Template.bind(null);
WithHintText.args = { ...defaultArgs, hint: 'This is example hint text' };

export const ErrorMessage = Template.bind(null);
ErrorMessage.args = { ...defaultArgs, error: 'There was a problem' };

export const DynamicOptions = Template.bind(null);
DynamicOptions.args = { ...defaultArgs, 'use-add-button': true };

export const OptGroups = Template.bind(null);
OptGroups.args = {
  ...defaultArgs,
  options: [
    <optgroup key="1" label="Branches of Service">
      <option value="navy">Navy</option>
      <option value="army">Army</option>
      <option value="marines">Marines</option>
      <option value="air-force">Air Force</option>
      <option value="coastguard">Coastguard</option>
    </optgroup>,
    <optgroup key="2" label="Other">
      <option value="other">Other</option>
    </optgroup>,
  ],
};

export const OptGroupsWithOptions = Template.bind(null);
OptGroupsWithOptions.args = {
  ...defaultArgs,
  options: [
    <optgroup key="1" label="Branches of Service">
      <option value="navy">Navy</option>
      <option value="army">Army</option>
      <option value="marines">Marines</option>
      <option value="air-force">Air Force</option>
      <option value="coastguard">Coastguard</option>
    </optgroup>,
    <option key="2" value="other">
      Other
    </option>,
  ],
};

export const ReadOnly = InertTemplate.bind(null);
ReadOnly.args = { ...defaultArgs };

const I18nTemplate = args => {
  const [lang, setLang] = useState('en');
  const { options, ...rest } = args;

  useEffect(() => {
    document.querySelector('main')?.setAttribute('lang', lang);
  }, [lang]);

  return (
    <div>
      <va-button onClick={e => setLang('es')} text="Español" />
      <va-button onClick={e => setLang('en')} text="English" />
      <va-select {...rest}>{options}</va-select>
    </div>
  );
};

export const Internationalization = I18nTemplate.bind(null);
Internationalization.args = { ...defaultArgs, required: true };

const WidthsTemplate = ({
  label,
  name,
  value,
  required,
  error,
  hint,
  'aria-live-region-text': ariaLiveRegionText,
  'aria-describedby-message': ariaDescribedbyMessage,
  options,
}) => {
  function getSelect(width) {
    return (
      <va-select
        label={`${label} - (${width})`}
        name={name}
        value={value}
        required={required}
        error={error}
        hint={hint}
        aria-live-region-text={ariaLiveRegionText}
        message-aria-describedby={ariaDescribedbyMessage}
        width={width}
      >
        {options}
      </va-select>
    );
  }
  const widths = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  return (
    <>
      {widths.map(width => (
        <div key={width}>{getSelect(width)}</div>
      ))}
    </>
  );
};

export const Widths = WidthsTemplate.bind(null);
Widths.args = { ...defaultArgs };

export const FullWidth = Template.bind(null);
FullWidth.args = { ...defaultArgs, 'full-width': true };

const FormsPatternSingleTemplate = args => {
  const { options, error, ...rest } = args;
  const _id = Math.floor(Math.random() * 10) + 1;
  const id = `form-pattern-single-input-${error}-${_id}`;

  const handleClick = () => {
    const header = document
      .getElementById(id)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-select id={id} error={error} {...rest}>
        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul className="vads-u-margin-bottom--2">
            <li>Navy</li>
            <li>Army</li>
            <li>Marines</li>
            <li>Air Force</li>
            <li>Coast Guard</li>
          </ul>
        </div>
        {options}
      </va-select>

      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

export const FormsPatternSingle = FormsPatternSingleTemplate.bind(null);
FormsPatternSingle.args = {
  ...defaultArgs,
  'use-forms-pattern': 'single',
  'form-heading-level': 1,
  'form-heading': 'Select a branch of the armed forces',
};

export const FormsPatternSingleError = FormsPatternSingleTemplate.bind(null);
FormsPatternSingleError.args = {
  ...defaultArgs,
  'error': 'This is an error',
  'use-forms-pattern': 'single',
  'form-heading-level': 1,
  'form-heading': 'Select a branch of the armed forces',
};

const FormsPatternMultipleTemplate = args => {
  const { options, ...rest } = args;
  const _id = Math.floor(Math.random() * 10) + 1;
  const id = `form-pattern-multiple-input-${_id}`;

  const handleClick = () => {
    const header = document
      .getElementById(id)
      ?.shadowRoot?.getElementById('form-question');

    applyFocus(header);
  };
  return (
    <>
      <va-select id={id} {...rest}>
        <div slot="form-description">
          <p>HTML passed into the form-description slot:</p>
          <ul>
            <li>Navy</li>
            <li>Army</li>
            <li>Marines</li>
            <li>Air Force</li>
            <li>Coast Guard</li>
          </ul>
        </div>
        {options}
      </va-select>

      <va-select label="Branch of Service II" name="options2">
        {options}
      </va-select>

      <va-select label="Branch of Service III" name="options3">
        {options}
      </va-select>

      <hr />

      <va-button text="Click to focus header" onClick={handleClick}></va-button>
    </>
  );
};

export const FormsPatternMultiple = FormsPatternMultipleTemplate.bind(null);
FormsPatternMultiple.args = {
  ...defaultArgs,
  'use-forms-pattern': 'multiple',
  'form-heading-level': 1,
  'form-heading': 'Select a branch of the armed forces',
};
