import React from 'react';
import { VaAlert, VaButtonPair } from '@department-of-veterans-affairs/web-components/react-bindings';
import { getWebComponentDocs, propStructure, StoryDocs } from './wc-helpers';

const textInputDocs = getWebComponentDocs('va-text-input');

export default {
  title: 'Patterns/Single field form',
  id: 'patterns/va-single-field-form',
  parameters: {
    componentSubtitle: 'va single field form pattern',
  },
};

const Template = ({
    slim,
    status,
    'disable-analytics': disableAnalytics,
    visible,
    'close-btn-aria-label': closeBtnAriaLabel,
    closeable,
    'full-width': fullWidth,
    headline,
    onCloseEvent,
    children,
}) => {
  return (
    <div className="vads-u-padding--2">

        <VaAlert
        slim={slim}
        status={status}
        disableAnalytics={disableAnalytics}
        visible={visible}
        closeBtnAriaLabel={closeBtnAriaLabel}
        closeable={closeable}
        fullWidth={fullWidth}
        onCloseEvent={onCloseEvent}
        >
            {headline}
            {children}
        </VaAlert>
        <va-text-input
        name='e-mail'
        label='e-mail address'
        autocomplete='email'
        required='true'
        maxlength='255'
        value='example@email.com'
        inputmode='email'
        type='email'
        onBlur={e => console.log('blur event', e)}
        onInput={e => console.log('input event value', e.target.value)}
        />
            <VaButtonPair
        // primaryLabel='Update'
        // secondaryLabel='Cancel'
        onPrimaryClick={e => console.log(e)}
        onSecondaryClick={e => console.log(e)}
        update='true'
      />
      </div>
  );
};

const defaultArgs = {
    'slim': true,
    'status': 'success',
    'disable-analytics': false,
    'visible': true,
    'close-btn-aria-label': 'Close notification',
    'closeable': false,
    'full-width': false,
  'children': (
    <p className="vads-u-margin-y--0">
      Your information has been saved successfully.
    </p>
  ),
};

export const Default = Template.bind(null);
Default.args = {
  ...defaultArgs,
};

export const Error = Template.bind(null);
Error.args = {
  ...defaultArgs,
  'status': 'error',
  'children': (
    <p className="vads-u-margin-y--0">
      There was an error saving your information. Please try again.
    </p>
  ),
};
